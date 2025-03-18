import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowDropdown } from 'react-icons/io';
import {
    useDeleteArticleMutation,
    useGetArticleByIdQuery,
    useUpdateArticleMutation,
} from '../slices/article/articleApiSlice';
import { TRANSLATIONS, LANGUAGES } from '../constants';

const EditArticleScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const language = useSelector((state) => state.language.language);
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const { id } = useParams();

    const { data: article, isLoading, isError } = useGetArticleByIdQuery(id);
    const [updateArticle, { isLoading: isUpdating }] =
        useUpdateArticleMutation();

    const [deleteArticle, { isLoading: isDeleting }] =
        useDeleteArticleMutation();

    const [formData, setFormData] = useState({
        title: '',
        date: '',
        content: '',
    });

    const [selectedPrimaryLanguage, setSelectedPrimaryLanguage] =
        useState(language);
    const [isPrimaryLangDropdownOpen, setIsPrimaryLangDropdownOpen] =
        useState(false);
    const [selectedSecondaryLanguage, setSelectedSecondaryLanguage] = useState(
        'Select Secondary Language'
    );
    const [isSecondaryLangDropdownOpen, setIsSecondaryLangDropdownOpen] =
        useState(false);

    const translations =
        TRANSLATIONS[selectedPrimaryLanguage] || TRANSLATIONS.en;

    useEffect(() => {
        if (article && article.languages[selectedPrimaryLanguage]) {
            const langData = article.languages[selectedPrimaryLanguage];
            setFormData({
                title: langData.title || '',
                date: langData.date
                    ? new Date(langData.date).toISOString().split('T')[0]
                    : '',
                content: langData.content || '',
            });
        }
    }, [article, selectedPrimaryLanguage]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateArticle({
                id,
                languages: { [selectedPrimaryLanguage]: formData },
            }).unwrap();
            console.log('Updated!');
        } catch (error) {
            console.error('Update failed', error);
        }
    };

    const primaryLangDropdownRef = useRef(null);
    const secondaryLangDropdownRef = useRef(null);

    const handleClickOutsidePrimaryLang = (event) => {
        if (
            primaryLangDropdownRef.current &&
            !primaryLangDropdownRef.current.contains(event.target)
        ) {
            setIsPrimaryLangDropdownOpen(false);
        }
    };

    const handleClickOutsideSecondaryLang = (event) => {
        if (
            secondaryLangDropdownRef.current &&
            !secondaryLangDropdownRef.current.contains(event.target)
        ) {
            setIsSecondaryLangDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsidePrimaryLang);
        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutsidePrimaryLang
            );
        };
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideSecondaryLang);
        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutsideSecondaryLang
            );
        };
    }, []);

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

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading article.</p>;

    return (
        <div>
            <div className='flex my-4 justify-between'>
                <div>
                    <h2
                        className={`text-3xl font-bold transition-all duration-200 ${
                            isDarkMode ? 'text-white' : 'text-darkExpansion'
                        }`}
                    >
                        {translations.editArticle || 'Edit'} {formData.title}
                    </h2>
                </div>

                <div className='flex space-x-2'>
                    <button
                        type='button'
                        className='bg-green-700 text-white px-3 py-2 rounded-[8px] font-semibold hover:bg-green-800 transition-all duration-100'
                        disabled={isUpdating}
                    >
                        {translations.saveChanges || 'Save Changes'}
                    </button>

                    <button
                        type='button'
                        className='bg-green-700 text-white px-3 py-2 rounded-[8px] font-semibold hover:bg-green-800 transition-all duration-100'
                        disabled={isUpdating}
                    >
                        {translations.publish || 'Publish'}
                    </button>
                </div>
            </div>

            <div className='flex gap-4 mb-4'>
                {/* Primary Language Dropdown */}
                <div className='relative w-1/2' ref={primaryLangDropdownRef}>
                    <div
                        className={`flex items-center justify-center py-2 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-all duration-200 ${
                            isDarkMode
                                ? 'bg-_303030 hover:bg-_252825'
                                : 'bg-white'
                        }`}
                        onClick={() =>
                            setIsPrimaryLangDropdownOpen(
                                !isPrimaryLangDropdownOpen
                            )
                        }
                    >
                        <span
                            className={`transition-all duration-200 ${
                                isDarkMode ? 'text-white' : 'text-darkExpansion'
                            } text-lg`}
                        >
                            {LANGUAGES[selectedPrimaryLanguage]?.name}
                        </span>
                        <IoIosArrowDropdown
                            className={`ml-2 text-2xl transition-all duraiton-200 ${
                                isDarkMode ? 'text-white' : 'text-darkExpansion'
                            }`}
                        />
                    </div>
                    {isPrimaryLangDropdownOpen && (
                        <ul className='absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10'>
                            {Object.keys(LANGUAGES).map((lang) => (
                                <li
                                    key={lang}
                                    className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
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

                {/* Secondary Language Dropdown */}
                <div className='relative w-1/2' ref={secondaryLangDropdownRef}>
                    <div
                        className={`flex items-center justify-center py-2 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-all duration-200 ${
                            isDarkMode
                                ? 'bg-_303030 hover:bg-_252825'
                                : 'bg-white'
                        }`}
                        onClick={() =>
                            setIsSecondaryLangDropdownOpen(
                                !isSecondaryLangDropdownOpen
                            )
                        }
                    >
                        <span
                            className={`transition-all duration-200 ${
                                isDarkMode ? 'text-white' : 'text-darkExpansion'
                            } text-lg`}
                        >
                            {selectedSecondaryLanguage}
                        </span>
                        <IoIosArrowDropdown
                            className={`ml-2 text-2xl transition-all duraiton-200 ${
                                isDarkMode ? 'text-white' : 'text-darkExpansion'
                            }`}
                        />
                    </div>
                    {isSecondaryLangDropdownOpen && (
                        <ul className='absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10'>
                            {Object.keys(LANGUAGES).map((lang) => (
                                <li
                                    key={lang}
                                    className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                    onClick={() => {
                                        setSelectedSecondaryLanguage(
                                            LANGUAGES[lang]?.name
                                        );
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

            <div>
                <div className='mb-4'>
                    <label
                        className={`block text-lg mb-1 transition-all duration-200 ${
                            isDarkMode ? 'text-white' : 'text-darkExpansion'
                        }`}
                    >
                        {translations.title || 'Title'}
                    </label>
                    <input
                        type='text'
                        className={`w-full px-4 py-2 border rounded-lg transition-all duration-200 ${
                            isDarkMode
                                ? 'border-white text-white bg-_303030'
                                : 'border-gray-300 text-darkExpansion bg-white'
                        }`}
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label
                        className={`block text-lg mb-1 transition-all duration-200 ${
                            isDarkMode ? 'text-white' : 'text-darkExpansion'
                        }`}
                    >
                        {translations.date || 'Date'}
                    </label>
                    <input
                        type='date'
                        className={`w-full px-4 py-2 border rounded-lg transition-all duration-200 ${
                            isDarkMode
                                ? 'border-white text-white bg-_303030'
                                : 'border-gray-300 text-darkExpansion bg-white'
                        }`}
                        value={formData.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label
                        className={`block text-lg mb-1 transition-all duration-200 ${
                            isDarkMode ? 'text-white' : 'text-darkExpansion'
                        }`}
                    >
                        {translations.content || 'Content'}
                    </label>
                    <textarea
                        className={`w-full px-4 py-2 border rounded-lg transition-all duration-200 ${
                            isDarkMode
                                ? 'border-white text-white bg-_303030'
                                : 'border-gray-300 text-darkExpansion bg-white'
                        }`}
                        value={formData.content}
                        onChange={(e) =>
                            handleChange('content', e.target.value)
                        }
                        rows={5}
                        required
                    />
                </div>
                <button
                    type='button'
                    onClick={() => handleDeleteArticle()}
                    className='w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition-all duration-100'
                >
                    {translations.deleteArticle || 'Delete Article'}
                </button>
            </div>
        </div>
    );
};

export default EditArticleScreen;
