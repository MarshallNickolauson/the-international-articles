import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowDropdown } from 'react-icons/io';
import { useDeleteArticleMutation, useGetArticleByIdQuery, useToggleArticlePublishedMutation, useUpdateArticleMutation } from '../slices/article/articleApiSlice';
import { TRANSLATIONS, LANGUAGES } from '../constants';
import SimpleEditor from './SimpleEditor';

const EditArticleScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const language = useSelector((state) => state.language.language);
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const location = useLocation();
    const { id } = useParams();

    const { data: article, isLoading, isError, refetch, isFetching } = useGetArticleByIdQuery(id, { refetchOnMountOrArgChange: true });

    useEffect(() => {
        refetch();
    }, [location, id, refetch]);

    const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation();
    const [deleteArticle, { isLoading: isDeleting }] = useDeleteArticleMutation();

    const [referenceArticleData, setReferenceArticleData] = useState({});
    const [formData, setFormData] = useState({});
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

    useEffect(() => {
        if (formData === referenceArticleData) setIsSaved(true);
        else setIsSaved(false);
    }, [referenceArticleData, formData]);

    const [toggleArticleUpdate, { isLoading: isPublishing, isError: isPublishingError }] = useToggleArticlePublishedMutation();

    const handlePublishToggle = async (e) => {
        try {
            const res = await toggleArticleUpdate({ id }).unwrap();
            setIsPublished(res.isPublished);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await updateArticle({
                id,
                languages: formData,
            }).unwrap();
            console.log('Updated successfully!');
            setReferenceArticleData(formData);
        } catch (error) {
            console.error('Update failed', error);
        }
    };

    const handleDeleteArticle = async () => {
        if (window.confirm('Are you sure you want to delete this article?')) {
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

    if (isLoading || isFetching) return <p>Loading...</p>;
    if (isError) return <p>Error loading article.</p>;

    const translations = TRANSLATIONS[selectedPrimaryLanguage] || TRANSLATIONS.en;

    return (
        <div className='py-4'>
            {/* Header */}
            <div className='flex justify-between items-center mb-6'>
                <h2 className={`font-poppins font-bold text-4xl ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>
                    {translations.edit || 'Edit'} {formData[selectedPrimaryLanguage]?.title}
                </h2>
                <div className='flex gap-4'>
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
                        {translations.deleteArticle || 'Delete'}
                    </button>
                </div>
            </div>

            {/* Language Selectors */}
            <div className='grid grid-cols-2 gap-4 mb-8'>
                <div className='relative' ref={primaryLangDropdownRef}>
                    <div className={`flex items-center py-3 justify-center space-x-2 px-4 border-[1px] border-gray-300 rounded-[8px] hover:cursor-pointer hover:border-gray-400 transition-all duration-200 ${isDarkMode ? 'bg-_303030 hover:bg-_252825' : 'bg-white'}`} onClick={() => setIsPrimaryLangDropdownOpen((prev) => !prev)}>
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
                <div className='relative' ref={secondaryLangDropdownRef}>
                    <div className={`flex items-center py-3 justify-center space-x-2 px-4 border-[1px] border-gray-300 rounded-[8px] hover:cursor-pointer hover:border-gray-400 transition-all duration-200 ${isDarkMode ? 'bg-_303030 hover:bg-_252825' : 'bg-white'}`} onClick={() => setIsSecondaryLangDropdownOpen((prev) => !prev)}>
                        <span className={`${isDarkMode ? 'text-white' : 'text-darkExpansion'} text-xl transition-all duration-200`}>{selectedSecondaryLanguage === 'none' ? 'Select Other Language' : LANGUAGES[selectedSecondaryLanguage]?.name}</span>
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
                                None
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
                            <div key={lang} className={`flex flex-col transition-all duration-700 ${selectedSecondaryLanguage === 'none' ? 'w-full' : 'w-1/2'}`}>
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
                                <label className={`text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>{translations.content || 'Content'}</label>
                                <SimpleEditor
                                    key={formData[lang]?.content}
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
