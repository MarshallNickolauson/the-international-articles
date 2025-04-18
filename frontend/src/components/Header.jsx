import { useState, useEffect, useRef } from 'react';
import { FaBookAtlas } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosSearch, IoIosArrowDropdown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage, changeSecondaryLanguage } from '../slices/language/languageSlice';
import { toggleDarkMode } from '../slices/theme/themeSlice';
import { LANGUAGES, TRANSLATIONS } from '../constants';
import { useCreateArticleMutation, useLazySearchArticleQuery } from '../slices/article/articleApiSlice';
import { BsBookmarkHeart } from 'react-icons/bs';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const { userInfo } = useSelector((state) => state.auth);

    const language = useSelector((state) => state.language.language);
    const secondaryLanguage = useSelector((state) => state.language.secondaryLanguage);
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const isArticleLoading = useSelector((state) => state.article.isLoading);

    const [searchQuery, setSearchQuery] = useState('');

    const [isPrimaryLangDropdownOpen, setIsPrimaryLangDropdownOpen] = useState(false);
    const [selectedPrimaryLanguage, setSelectedPrimaryLanguage] = useState('');
    const [isPrimaryLanguageLoading, setIsPrimaryLanguageLoading] = useState(false);

    const [isSecondaryLangVisible, setisSecondaryLangVisible] = useState(false);
    const [isSecondaryLangDropdownOpen, setIsSecondaryLangDropdownOpen] = useState(false);
    const [selectedSecondaryLanguage, setSelectedSecondaryLanguage] = useState('Dual Language');

    const translations = TRANSLATIONS[language] || TRANSLATIONS.en;

    useEffect(() => {
        if (!location.pathname.endsWith('/edit') && location.pathname.startsWith('/article/') && !isArticleLoading) {
            setisSecondaryLangVisible(true);
            setSelectedSecondaryLanguage('Dual Language');
        } else setisSecondaryLangVisible(false);
    }, [location, isArticleLoading]);

    const primaryLangDropdownRef = useRef(null);
    const secondaryLangDropdownRef = useRef(null);

    const languages = Object.keys(LANGUAGES);

    const secondaryLanguages = languages.filter((lang) => lang !== selectedPrimaryLanguage);

    useEffect(() => {
        setIsPrimaryLanguageLoading(true);
        if (language) {
            setSelectedPrimaryLanguage(language);
        }
        setIsPrimaryLanguageLoading(false);
    }, [language, dispatch]);

    const handleClickOutsidePrimaryLang = (event) => {
        if (primaryLangDropdownRef.current && !primaryLangDropdownRef.current.contains(event.target)) {
            setIsPrimaryLangDropdownOpen(false);
        }
    };

    const handleClickOutsideSecondaryLang = (event) => {
        if (secondaryLangDropdownRef.current && !secondaryLangDropdownRef.current.contains(event.target)) {
            setIsSecondaryLangDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsidePrimaryLang);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsidePrimaryLang);
        };
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideSecondaryLang);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideSecondaryLang);
        };
    }, []);

    const selectPrimaryLanguage = (lang) => {
        dispatch(changeLanguage(lang));
        setSelectedPrimaryLanguage(lang);
        setIsPrimaryLangDropdownOpen(false);
    };

    const selectSecondaryLanguage = (lang) => {
        dispatch(changeSecondaryLanguage(lang));
        setSelectedSecondaryLanguage(lang);
        setIsSecondaryLangDropdownOpen(false);
    };

    useEffect(() => {
        if (selectedPrimaryLanguage === selectedSecondaryLanguage) {
            setSelectedSecondaryLanguage('Dual Language');
            dispatch(changeSecondaryLanguage('Dual Language'));
        }
    }, [selectedPrimaryLanguage, dispatch]);

    useEffect(() => {
        dispatch(changeSecondaryLanguage('Dual Language'));
    }, [location, dispatch]);

    useEffect(() => {
        setSelectedSecondaryLanguage(secondaryLanguage);
    }, [secondaryLanguage]);

    const [createArticle, { isLoading, isError, error }] = useCreateArticleMutation();

    const handleWriteNewArticle = async () => {
        if (userInfo) {
            // Loader here...
            try {
                const res = await createArticle();
                navigate(`/article/${res.data._id}/edit`);
            } catch (error) {
                console.log(error);
            }
        } else navigate('/login');
    };

    const handleSearch = async (query) => {
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
            setSearchQuery('');
        }
    };

    return (
        <>
            <nav className='top-0 w-full bg-darkGreen py-3 px-4 flex justify-center'>
                <div className='flex justify-between w-full max-w-[1450px]'>
                    <div className='flex space-x-3 hover:cursor-pointer' onClick={() => navigate('/')}>
                        <FaBookAtlas size={40} color='white' />
                        <h1 className='font-poppins font-bold tracking-wide text-white flex items-center text-3xl'>{translations.siteTitle || 'The International Articles'}</h1>
                    </div>
                    <div className='font-opensans flex space-x-5 text-white items-center'>
                        {/* Dark/Light Theme Toggle */}
                        <div
                            className={`relative w-14 h-7 rounded-full flex items-center cursor-pointer transition-all duration-300 ${isDarkMode ? 'bg-_252825' : 'bg-gray-100'}`}
                            onClick={() => dispatch(toggleDarkMode())}
                        >
                            <div className={`absolute w-5 h-5 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-white translate-x-[30px]' : 'bg-_252825 translate-x-[5px]'}`}></div>
                        </div>

                        {userInfo && (
                            <h1 onClick={() => navigate('/my-articles')} className='hover:cursor-pointer border-b-2 pb-1 border-b-transparent hover:border-b-mainWhite transition-all duration-100'>
                                {translations.myArticles || 'My Articles'}
                            </h1>
                        )}

                        <BsBookmarkHeart size={35} onClick={() => (userInfo ? navigate('/favorites') : navigate('/login'))} className={`hover:scale-[1.08] hover:cursor-pointer text-white}`} />

                        <h1 onClick={handleWriteNewArticle} className='bg-white text-darkGreen font-semibold px-4 py-2 rounded-[8px] hover:bg-gray-200 transition-all duration-100 cursor-pointer'>
                            {translations.writeArticle || 'Write Article'}
                        </h1>

                        {userInfo ? (
                            <h1 onClick={() => navigate('/account')} className='hover:cursor-pointer border-b-2 pb-1 border-b-transparent hover:border-b-mainWhite transition-all duration-100'>
                                {translations.hi || 'Hi'}, {userInfo.name}
                            </h1>
                        ) : (
                            <Link to='/login' className='bg-white text-darkGreen font-semibold px-4 py-2 rounded-[8px] hover:bg-gray-200 transition-all duration-100'>
                                {translations.signIn || 'Sign In'}
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Secondary Navbar */}
            <nav className={`w-full px-4 py-4 border-b-[1px] border-gray-300 font-opensans`}>
                <div className='flex mx-auto max-w-[1450px] justify-between items-center'>
                    <div className='flex space-x-10 items-center'>
                        <Link to='/' className={`text-lg hover:underline transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>
                            {translations.dashboard || 'Dashboard'}
                        </Link>
                        <Link to='/articles' className={`text-lg hover:underline transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>
                            {translations.articles || 'Articles'}
                        </Link>

                        {/* Primary Language */}
                        <div className='relative' ref={primaryLangDropdownRef}>
                            <div
                                className={`flex items-center py-1 px-4 border-[1px] border-gray-300 rounded-[8px] hover:cursor-pointer hover:border-gray-400 transition-all duration-200 ${
                                    isDarkMode ? 'bg-_303030 hover:bg-_252825' : 'bg-white'
                                }`}
                                onClick={() => setIsPrimaryLangDropdownOpen(!isPrimaryLangDropdownOpen)}
                            >
                                <h1 className={`${isDarkMode ? 'text-white' : 'text-darkExpansion'} text-lg transition-all duration-200 ${isPrimaryLanguageLoading ? 'opacity-0' : 'opacity-100'}`}>
                                    {LANGUAGES[selectedPrimaryLanguage]?.name || 'English'}
                                </h1>
                                <IoIosArrowDropdown className={`ml-2 text-2xl transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`} />
                            </div>
                            <div className='relative'>
                                {isPrimaryLangDropdownOpen && (
                                    <ul className='absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-[8px] shadow-lg opacity-100 transition-all duration-200 z-[100]'>
                                        {languages.map((lang, index) => (
                                            <li key={index} className='px-4 py-2 hover:bg-gray-200 cursor-pointer' onClick={() => selectPrimaryLanguage(lang)}>
                                                {LANGUAGES[lang]?.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Secondary Language */}
                        {isSecondaryLangVisible && (
                            <div className={`relative`} ref={secondaryLangDropdownRef}>
                                <div
                                    className={`flex items-center py-1 px-4 border-[1px] border-gray-300 rounded-[8px] hover:cursor-pointer hover:border-gray-400 transition-all duration-200 ${
                                        isDarkMode ? 'bg-_303030 hover:bg-_252825' : 'bg-white'
                                    }`}
                                    onClick={() => setIsSecondaryLangDropdownOpen(!isSecondaryLangDropdownOpen)}
                                >
                                    <h1 className={`${isDarkMode ? 'text-white' : 'text-darkExpansion'} text-lg transition-all duration-200`}>
                                        {LANGUAGES[secondaryLanguage]?.name || secondaryLanguage}
                                    </h1>
                                    <IoIosArrowDropdown className={`ml-2 text-2xl transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`} />
                                </div>
                                {isSecondaryLangDropdownOpen && (
                                    <ul className='absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-[8px] shadow-lg transition-all duration-200 z-[100]'>
                                        {secondaryLanguages.map((lang, index) => (
                                            <li key={index} className='px-4 py-2 hover:bg-gray-200 cursor-pointer' onClick={() => selectSecondaryLanguage(lang)}>
                                                {LANGUAGES[lang]?.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Search Bar */}
                    <div className='relative'>
                        <IoIosSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
                        <input
                            type='text'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSearch(searchQuery);
                            }}
                            placeholder={translations.searchPlaceholder || 'Search...'}
                            className={`border-[1px] transition-all duration-200 ${isDarkMode ? 'border-white text-white bg-_303030' : 'border-gray-300 text-darkExpansion bg-white'}
                            outline-none ring-0 focus:border-gray-500
                            font-opensans rounded-[8px] py-2 pl-12 pr-4
                            w-[600px] placeholder:italic`}
                        />
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
