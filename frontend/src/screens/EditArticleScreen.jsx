import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowDropdown } from 'react-icons/io';
import { useDeleteArticleMutation, useGetArticleByIdQuery, useToggleArticlePublishedMutation, useUpdateArticleMutation } from '../slices/article/articleApiSlice';
import { TRANSLATIONS, LANGUAGES } from '../constants';
import SimpleEditor from './SimpleEditor';
import { useUploadImageMutation, useDeleteImageMutation } from '../slices/image/imageApiSlice.js';
import { ClipLoader } from 'react-spinners';
import { IoClose } from 'react-icons/io5';
import { BsStars } from 'react-icons/bs';

const EditArticleScreen = () => {
    const navigate = useNavigate();

    const language = useSelector((state) => state.language.language);
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const location = useLocation();
    const { id } = useParams();

    const translations = TRANSLATIONS[language] || TRANSLATIONS.en;

    const { data: article, isLoading, isError, refetch, isFetching } = useGetArticleByIdQuery(id, { refetchOnMountOrArgChange: true });

    useEffect(() => {
        refetch();
    }, [location, id, refetch]);

    const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation();
    const [deleteArticle, { isLoading: isDeleting }] = useDeleteArticleMutation();

    const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
    const [deleteImage, { isLoading: isImageDeleting }] = useDeleteImageMutation();

    const [isTranslating, setIsTranslating] = useState(false);
    const [abortController, setAbortController] = useState(null);
    const [requestId, setRequestId] = useState('');

    const [referenceArticleData, setReferenceArticleData] = useState({});
    const [formData, setFormData] = useState({});
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [isSaved, setIsSaved] = useState(true);
    const [isPublished, setIsPublished] = useState(null);
    const [selectedPrimaryLanguage, setSelectedPrimaryLanguage] = useState(language);
    const [selectedSecondaryLanguage, setSelectedSecondaryLanguage] = useState('none');

    const [isPrimaryLangDropdownOpen, setIsPrimaryLangDropdownOpen] = useState(false);
    const [isSecondaryLangDropdownOpen, setIsSecondaryLangDropdownOpen] = useState(false);

    const primaryLangDropdownRef = useRef(null);
    const secondaryLangDropdownRef = useRef(null);

    useEffect(() => {
        if (article) {
            const initialData = {};
            Object.keys(article.languages).forEach((lang) => {
                initialData[lang] = {
                    title: article.languages[lang]?.title || '',
                    date: article.languages[lang]?.date ? new Date(article.languages[lang]?.date).toISOString().split('T')[0] : '',
                    content: article.languages[lang]?.content || '',
                };
            });
            setReferenceArticleData(initialData);
            setFormData(initialData);
            setIsPublished(article.isPublished);

            if (article.imageUrl) {
                const fullImageUrl = `http://localhost:8080/images/${String(article.imageUrl).replace('/data', '')}`;
                setImageUrl(fullImageUrl);
            } else {
                setImageUrl('');
            }
        }
    }, [article]);

    const handleChange = (lang, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [lang]: {
                ...prev[lang],
                [field]: value,
            },
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    useEffect(() => {
        if (formData === referenceArticleData) setIsSaved(true);
        else setIsSaved(false);
    }, [referenceArticleData, formData]);

    const [toggleArticlePublishUpdate, { isLoading: isPublishingToggle }] = useToggleArticlePublishedMutation();

    const handlePublishToggle = async (e) => {
        try {
            const res = await toggleArticlePublishUpdate({ id }).unwrap();
            setIsPublished(res.isPublished);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = '';

            if (imageFile) {
                if (article.imageUrl) await deleteImage(String(article.imageUrl).replace('/data/', '')).unwrap();

                const formDataForImage = new FormData();
                formDataForImage.append('image', imageFile);

                const uploadedImage = await uploadImage(formDataForImage).unwrap();
                imageUrl = uploadedImage.file.path;
            }

            await updateArticle({ id, languages: formData, imageUrl }).unwrap();
            console.log('Updated successfully!');
            setReferenceArticleData(formData);
        } catch (error) {
            console.error('Update failed', error);
        }
    };

    const handleDeleteImage = async () => {
        try {
            setImageFile(null);
            setImageUrl('');
            if (article.imageUrl) await deleteImage(String(article.imageUrl).replace('/data/', '')).unwrap();
            refetch();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteArticle = async () => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            try {
                if (article.imageUrl) await deleteImage(String(article.imageUrl).replace('/data/', '')).unwrap();
            } catch (error) {
                
            } 
            
            try {
                await deleteArticle({ id });
                navigate('/my-articles');
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleClickOutside = (ref, setDropdown) => (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside(primaryLangDropdownRef, setIsPrimaryLangDropdownOpen));
        document.addEventListener('mousedown', handleClickOutside(secondaryLangDropdownRef, setIsSecondaryLangDropdownOpen));
        return () => {
            document.removeEventListener('mousedown', handleClickOutside(primaryLangDropdownRef, setIsPrimaryLangDropdownOpen));
            document.removeEventListener('mousedown', handleClickOutside(secondaryLangDropdownRef, setIsSecondaryLangDropdownOpen));
        };
    }, []);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (!isSaved) {
                const message = 'You have unsaved changes. Are you sure you want to leave?';
                event.returnValue = message;
                return message;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isSaved]);

    const handleTranslate = async () => {
        if (!selectedSecondaryLanguage || selectedSecondaryLanguage === 'none') {
            alert('Please select a secondary language for translation.');
            return;
        }

        setTimeout(() => setIsTranslating(true), 0);

        const controller = new AbortController();
        setAbortController(controller);

        const randomUUid = crypto.randomUUID();
        setRequestId(randomUUid);

        try {
            const response = await fetch('http://localhost:9000/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sourceLang: selectedPrimaryLanguage,
                    targetLang: selectedSecondaryLanguage,
                    text: formData[selectedPrimaryLanguage]?.content || '',
                    requestId: randomUUid,
                }),
                signal: controller.signal,
            });

            const data = await response.json();
            setIsTranslating(false);

            if (response.ok) {
                const translatedText = data.translatedText || '';

                // Typing effect
                let index = 0;
                const interval = setInterval(() => {
                    handleChange(selectedSecondaryLanguage, 'content', translatedText.slice(0, index));
                    index += 10;

                    if (index > translatedText.length) {
                        clearInterval(interval);
                    }
                }, 5);
            } else {
                alert('Translation failed: ' + data.error);
            }
        } catch (error) {
            setIsTranslating(false);

            if (error.name === 'AbortError' || error.message.includes('abort')) return;

            console.error('Error translating:', error);
            alert('Error connecting to translation service.');
        }
    };

    const handleCancelTranslation = async () => {
        if (abortController) {
            abortController.abort();
            setAbortController(null);
            setIsTranslating(false);

            try {
                const response = await fetch('http://localhost:9000/translate/abort', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        requestId,
                    }),
                });

                const data = await response.json();
            } catch (error) {
                console.log(error);
            }
        }
    };

    if (isLoading || isFetching) return <p>Loading...</p>;
    if (isError) return <p>Error loading article.</p>;

    return (
        <div className='py-4'>
            {/* Header */}
            <div className='flex justify-between items-center mb-6'>
                <h2 className={`font-poppins font-bold text-4xl ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>
                    {translations.edit || 'Edit'} {formData[selectedPrimaryLanguage]?.title}
                </h2>
                <div className='flex gap-4 font-opensans'>
                    {(isUpdating || isDeleting || isUploading || isImageDeleting || isPublishingToggle) && <ClipLoader color='#36d7b7' size={40} />}
                    <button
                        onClick={handlePublishToggle}
                        className={` text-white px-5 py-2 rounded-lg shadow-md font-medium transition-all duration-100 
                        ${!isSaved ? 'cursor-not-allowed bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'}`}
                        disabled={!isSaved}
                    >
                        {!isPublished ? translations.publish || 'Publish' : translations.unpublish || 'Unpublish'}
                    </button>
                    <button onClick={handleSave} className='bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md font-medium transition-all duration-100' disabled={isUpdating}>
                        {translations.saveChanges || 'Save Changes'}
                    </button>
                    <button onClick={handleDeleteArticle} className='bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-md font-medium transition-all duration-100'>
                        {translations.delete || 'Delete'}
                    </button>
                </div>
            </div>

            {/* File input for image upload */}
            <div className='flex items-center justify-between w-full text-lg'>
                <div className='flex space-x-2'>
                    <label htmlFor='imageFile' className='text-darkExpansion'>
                        Upload Image:
                    </label>
                    <input id='imageFile' type='file' onChange={handleImageChange} accept='image/*' className='cursor-pointer' />
                </div>
                <div className='ml-auto relative'>
                    <div className='absolute right-3 translate-x-2 -translate-y-2 text-2xl'>
                        <IoClose size={30} className={`hover:cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`} onClick={handleDeleteImage} />
                    </div>
                </div>
            </div>

            {/* Image preview */}
            <div className='mt-4'>
                {imageFile ? (
                    <img src={URL.createObjectURL(imageFile)} alt='Preview' className='w-full max-h-[300px] image-shadow object-cover rounded-[16px] mb-5' />
                ) : imageUrl ? (
                    <img src={imageUrl} alt='Current' className='w-full max-h-[300px] image-shadow object-cover rounded-[16px] mb-5' />
                ) : null}
            </div>

            {/* Language Selectors */}
            <div className='flex justify-between space-x-6 mb-8 font-opensans'>
                {/* Primary Language */}
                <div className='w-1/2 relative' ref={primaryLangDropdownRef}>
                    <div
                        className={`flex items-center py-3 justify-center space-x-2 px-4 border-[1px] border-gray-300 rounded-[8px] hover:cursor-pointer hover:border-gray-400 transition-all duration-200 ${
                            isDarkMode ? 'bg-_303030 hover:bg-_252825' : 'bg-white'
                        }`}
                        onClick={() => setIsPrimaryLangDropdownOpen((prev) => !prev)}
                    >
                        <span className={`${isDarkMode ? 'text-white' : 'text-darkExpansion'} text-xl transition-all duration-200`}>{LANGUAGES[selectedPrimaryLanguage]?.name}</span>
                        <IoIosArrowDropdown className={`${isDarkMode ? 'text-white' : 'text-darkExpansion'} text-2xl transition-all duration-200`} />
                    </div>
                    {isPrimaryLangDropdownOpen && (
                        <ul className='absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-[8px] shadow-lg opacity-100 transition-all duration-200 z-[100]'>
                            {Object.keys(LANGUAGES).map((lang) => (
                                <li
                                    key={lang}
                                    className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                                    onClick={() => {
                                        setSelectedPrimaryLanguage(lang);
                                        setIsPrimaryLangDropdownOpen(false);
                                    }}
                                >
                                    {LANGUAGES[lang]?.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Secondary Language */}
                <div className='w-1/2 relative' ref={secondaryLangDropdownRef}>
                    <div
                        className={`flex font-opensans items-center py-3 justify-center space-x-2 px-4 border-[1px] border-gray-300 rounded-[8px] hover:cursor-pointer hover:border-gray-400 transition-all duration-200 ${
                            isDarkMode ? 'bg-_303030 hover:bg-_252825' : 'bg-white'
                        }`}
                        onClick={() => setIsSecondaryLangDropdownOpen((prev) => !prev)}
                    >
                        <span className={`${isDarkMode ? 'text-white' : 'text-darkExpansion'} text-xl transition-all duration-200`}>
                            {selectedSecondaryLanguage === 'none' ? translations.selectOtherLanguage || 'Select Other Language' : LANGUAGES[selectedSecondaryLanguage]?.name}
                        </span>
                        <IoIosArrowDropdown className={`${isDarkMode ? 'text-white' : 'text-darkExpansion'} text-2xl transition-all duration-200`} />
                    </div>
                    {isSecondaryLangDropdownOpen && (
                        <ul className='absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-[8px] shadow-lg opacity-100 transition-all duration-200 z-[100]'>
                            <li
                                className='px-4 py-3 hover:bg-gray-200 cursor-pointer'
                                onClick={() => {
                                    setSelectedSecondaryLanguage('none');
                                    setIsSecondaryLangDropdownOpen(false);
                                }}
                            >
                                {translations.none || 'None'}
                            </li>
                            {Object.keys(LANGUAGES).map((lang) => (
                                <li
                                    key={lang}
                                    className='px-4 py-3 hover:bg-gray-100 cursor-pointer'
                                    onClick={() => {
                                        setSelectedSecondaryLanguage(lang);
                                        setIsSecondaryLangDropdownOpen(false);
                                    }}
                                >
                                    {LANGUAGES[lang]?.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Form Fields */}
            <div className={`flex gap-6 ${selectedSecondaryLanguage === 'none' ? '' : ''}`}>
                {[selectedPrimaryLanguage, selectedSecondaryLanguage].map(
                    (lang) =>
                        lang !== 'none' && (
                            <div key={lang} className={`flex font-opensans flex-col transition-all duration-700 ${selectedSecondaryLanguage === 'none' ? 'w-full' : 'w-1/2'}`}>
                                <label className={`text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>{translations.title || 'Title'}</label>
                                <input
                                    className={`w-full mb-3 px-4 py-2 border-[1px] ${isDarkMode ? 'border-white text-white bg-_303030' : 'border-gray-300 text-darkExpansion bg-white'}
                                            focus:outline-none outline-none ring-0 focus:border-gray-500
                                            font-opensans rounded-[8px] py-2 pr-4 transition-all duration-200 
                                            placeholder:italic`}
                                    type='text'
                                    placeholder='Title'
                                    value={formData[lang]?.title || ''}
                                    onChange={(e) => handleChange(lang, 'title', e.target.value)}
                                />
                                <label className={`text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>{translations.date || 'Date'}</label>
                                <input
                                    className={`w-full mb-3 px-4 py-2 border-[1px] ${isDarkMode ? 'border-white text-white bg-_303030' : 'border-gray-300 text-darkExpansion bg-white'}
                                                focus:outline-none outline-none ring-0 focus:border-gray-500
                                                font-opensans rounded-[8px] py-2 pr-4 transition-all duration-200 
                                                placeholder:italic`}
                                    type='date'
                                    value={formData[lang]?.date || ''}
                                    onChange={(e) => handleChange(lang, 'date', e.target.value)}
                                />
                                <div className='flex justify-between items-center relative pb-3'>
                                    <label className={`text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>{translations.content || 'Content'}</label>
                                    {lang === selectedSecondaryLanguage && (
                                        <div className='absolute right-0'>
                                            <div className='flex space-x-3'>
                                                {isTranslating && <ClipLoader color='#36d7b7' size={40} />}
                                                {isTranslating && (
                                                    <button
                                                        onClick={handleCancelTranslation}
                                                        className='flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-md font-medium transition-all duration-300'
                                                    >
                                                        <IoClose className='text-xl' />
                                                        <h1 className='mr-1'>Cancel</h1>
                                                    </button>
                                                )}
                                                <button
                                                    onClick={handleTranslate}
                                                    className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md font-medium transition-all duration-300 ${
                                                        isTranslating
                                                            ? 'bg-gradient-to-r from-blue-300 to-purple-300'
                                                            : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                                                    }`}
                                                    disabled={isTranslating}
                                                >
                                                    <BsStars className='text-xl' />
                                                    <h1 className='mr-1'>Generate</h1>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <SimpleEditor
                                    key={lang}
                                    initialContent={formData[lang]?.content}
                                    onChange={(content) => {
                                        handleChange(lang, 'content', content);
                                    }}
                                />
                            </div>
                        )
                )}
            </div>
        </div>
    );
};

export default EditArticleScreen;
