import { useState, useEffect, useRef } from "react";
import { FaBookAtlas } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosSearch, IoIosArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage, changeSecondaryLanguage } from "../slices/language/languageSlice";
import { toggleDarkMode } from "../slices/theme/themeSlice";
import { LANGUAGES, TRANSLATIONS } from "../constants";
import { useCreateArticleMutation } from "../slices/article/articleApiSlice";
import { BsBookmarkHeart } from "react-icons/bs";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const { userInfo } = useSelector((state) => state.auth);
    const language = useSelector((state) => state.language.language);
    const secondaryLanguage = useSelector((state) => state.language.secondaryLanguage);
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const isArticleLoading = useSelector((state) => state.article.isLoading);

    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isPrimaryLangDropdownOpen, setIsPrimaryLangDropdownOpen] = useState(false);
    const [selectedPrimaryLanguage, setSelectedPrimaryLanguage] = useState("");
    const [isPrimaryLanguageLoading, setIsPrimaryLanguageLoading] = useState(false);
    const [isSecondaryLangVisible, setisSecondaryLangVisible] = useState(false);
    const [isSecondaryLangDropdownOpen, setIsSecondaryLangDropdownOpen] = useState(false);
    const [selectedSecondaryLanguage, setSelectedSecondaryLanguage] = useState("Dual Language");

    const translations = TRANSLATIONS[language] || TRANSLATIONS.en;
    const primaryLangDropdownRef = useRef(null);
    const secondaryLangDropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const languages = Object.keys(LANGUAGES);
    const secondaryLanguages = languages.filter((lang) => lang !== selectedPrimaryLanguage);

    useEffect(() => {
        if (!location.pathname.endsWith("/edit") && location.pathname.startsWith("/article/") && !isArticleLoading) {
            setisSecondaryLangVisible(true);
            setSelectedSecondaryLanguage("Dual Language");
        } else {
            setisSecondaryLangVisible(false);
        }
    }, [location, isArticleLoading]);

    useEffect(() => {
        setIsPrimaryLanguageLoading(true);
        if (language) setSelectedPrimaryLanguage(language);
        setIsPrimaryLanguageLoading(false);
    }, [language]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (primaryLangDropdownRef.current && !primaryLangDropdownRef.current.contains(e.target)) {
                setIsPrimaryLangDropdownOpen(false);
            }
            if (secondaryLangDropdownRef.current && !secondaryLangDropdownRef.current.contains(e.target)) {
                setIsSecondaryLangDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target) && !e.target.closest("button")) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        dispatch(changeSecondaryLanguage("Dual Language"));
    }, [location]);

    useEffect(() => {
        if (selectedPrimaryLanguage === selectedSecondaryLanguage) {
            setSelectedSecondaryLanguage("Dual Language");
            dispatch(changeSecondaryLanguage("Dual Language"));
        }
    }, [selectedPrimaryLanguage]);

    useEffect(() => {
        setSelectedSecondaryLanguage(secondaryLanguage);
    }, [secondaryLanguage]);

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

    const [createArticle] = useCreateArticleMutation();

    const handleWriteNewArticle = async () => {
        if (userInfo) {
            try {
                const res = await createArticle();
                navigate(`/article/${res.data._id}/edit`);
            } catch (error) {
                console.log(error);
            }
        } else {
            navigate("/login");
        }
    };

    const handleSearch = (query) => {
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
            setSearchQuery("");
        }
    };

    return (
        <>
            {/* Primary Navbar */}
            <nav className="top-0 w-full bg-darkGreen">
                <div className="w-full max-w-[1450px] mx-auto flex justify-between items-center px-4 py-3 md:py-4">
                    {/* Logo */}
                    <div className="flex items-center space-x-3 hover:cursor-pointer" onClick={() => navigate("/")}>
                        <FaBookAtlas size={40} color="white" />
                        <h1 className="font-poppins font-bold tracking-wide text-white flex items-center text-2xl sm:text-3xl">{translations.siteTitle || "The International Articles"}</h1>
                    </div>

                    {/* Hamburger - Mobile */}
                    <div className="md:hidden" ref={mobileMenuRef}>
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="focus:outline-none">
                            <div className="space-y-1">
                                <span className="block w-6 h-0.5 bg-white"></span>
                                <span className="block w-6 h-0.5 bg-white"></span>
                                <span className="block w-6 h-0.5 bg-white"></span>
                            </div>
                        </button>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex font-opensans space-x-5 text-white items-center">
                        <div
                            className={`relative w-14 h-7 rounded-full flex items-center cursor-pointer transition-all duration-300 ${isDarkMode ? "bg-_252825" : "bg-gray-100"}`}
                            onClick={() => dispatch(toggleDarkMode())}
                        >
                            <div className={`absolute w-5 h-5 rounded-full transition-all duration-300 ${isDarkMode ? "bg-white translate-x-[30px]" : "bg-_252825 translate-x-[5px]"}`}></div>
                        </div>

                        {userInfo && (
                            <h1 onClick={() => navigate("/my-articles")} className="hover:cursor-pointer border-b-2 pb-1 border-b-transparent hover:border-b-mainWhite transition-all duration-100">
                                {translations.myArticles || "My Articles"}
                            </h1>
                        )}

                        <BsBookmarkHeart size={35} onClick={() => (userInfo ? navigate("/favorites") : navigate("/login"))} className="hover:scale-[1.08] hover:cursor-pointer text-white" />

                        <h1 onClick={handleWriteNewArticle} className="bg-white text-darkGreen font-semibold px-4 py-2 rounded-[8px] hover:bg-gray-200 transition-all duration-100 cursor-pointer">
                            {translations.writeArticle || "Write Article"}
                        </h1>

                        {userInfo ? (
                            <h1 onClick={() => navigate("/account")} className="hover:cursor-pointer border-b-2 pb-1 border-b-transparent hover:border-b-mainWhite transition-all duration-100">
                                {translations.hi || "Hi"}, {userInfo.name}
                            </h1>
                        ) : (
                            <Link to="/login" className="bg-white text-darkGreen font-semibold px-4 py-2 rounded-[8px] hover:bg-gray-200 transition-all duration-100">
                                {translations.signIn || "Sign In"}
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Dropdown */}
                <div ref={mobileMenuRef} className={`md:hidden w-full bg-darkGreen transition-all duration-150 ease-in-out overflow-hidden ${isMobileMenuOpen ? "max-h-[800px]" : "max-h-0"}`}>
                    <div className="max-w-[1450px] mx-auto flex justify-end flex-col space-y-4 text-white font-opensans px-4 pb-4">
                        <div className="flex justify-end">
                            <div className="flex space-x-3 items-center">
                                <h1 className="text-lg">Dark Mode</h1>
                                <div
                                    className={`relative w-14 h-7 rounded-full flex items-center cursor-pointer transition-all duration-300 ${isDarkMode ? "bg-_252825" : "bg-gray-100"}`}
                                    onClick={() => dispatch(toggleDarkMode())}
                                >
                                    <div className={`absolute w-5 h-5 rounded-full transition-all duration-300 ${isDarkMode ? "bg-white translate-x-[30px]" : "bg-_252825 translate-x-[5px]"}`}></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <div className="flex space-x-3 items-center">
                                <h1 className="text-lg">Favorites</h1>
                                <BsBookmarkHeart size={45} onClick={() => (userInfo ? navigate("/favorites") : navigate("/login"))} className="hover:scale-[1.08] hover:cursor-pointer text-white" />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            {userInfo && (
                                <h1 onClick={() => navigate("/my-articles")} className="bg-white cursor-pointer text-darkGreen font-semibold text-center px-4 py-2 rounded-[8px] hover:bg-gray-200">
                                    {translations.myArticles || "My Articles"}
                                </h1>
                            )}
                        </div>

                        {userInfo ? (
                            <h1 className="bg-white cursor-pointer text-darkGreen font-semibold text-center px-4 py-2 rounded-[8px] hover:bg-gray-200" onClick={() => navigate("/account")}>
                                {translations.hi || "Hi"}, {userInfo.name}
                            </h1>
                        ) : (
                            <Link to="/login" className="bg-white text-darkGreen font-semibold text-center px-4 py-2 rounded-[8px] hover:bg-gray-200">
                                {translations.signIn || "Sign In"}
                            </Link>
                        )}

                        <h1 onClick={handleWriteNewArticle} className="bg-white cursor-pointer text-darkGreen text-center font-semibold px-4 py-2 rounded-[8px] hover:bg-gray-200">
                            {translations.writeArticle || "Write Article"}
                        </h1>
                    </div>
                </div>
            </nav>

            {/* Secondary Navbar */}
            <nav className="w-full px-4 py-4 border-b-[1px] border-gray-300 font-opensans">
                <div className="flex flex-col lg:flex-row lg:mx-auto max-w-[1450px] justify-between space-y-4 lg:space-y-0">
                    <div className="flex space-x-8 items-center">
                        <div className="flex space-x-8">
                            <div>
                                <Link to="/" className={`text-lg hover:underline transition-all duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}`}>
                                    {translations.dashboard || "Dashboard"}
                                </Link>
                            </div>
                            <div>
                                <Link to="/articles" className={`text-lg hover:underline transition-all duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}`}>
                                    {translations.articles || "Articles"}
                                </Link>
                            </div>
                        </div>

                        {/* Primary Language Dropdown */}
                        <div className="relative" ref={primaryLangDropdownRef}>
                            <div
                                className={`flex items-center py-1 px-4 border border-gray-300 rounded-[8px] cursor-pointer transition-all duration-200 ${
                                    isDarkMode ? "bg-_303030 hover:bg-_252825" : "bg-white"
                                }`}
                                onClick={() => setIsPrimaryLangDropdownOpen(!isPrimaryLangDropdownOpen)}
                            >
                                <h1 className={`${isDarkMode ? "text-white" : "text-darkExpansion"} transition-all duration-200 text-lg ${isPrimaryLanguageLoading ? "opacity-0" : "opacity-100"}`}>
                                    {LANGUAGES[selectedPrimaryLanguage]?.name || "English"}
                                </h1>
                                <IoIosArrowDropdown className={`ml-2 text-2xl transition-all duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}`} />
                            </div>
                            {isPrimaryLangDropdownOpen && (
                                <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-[8px] shadow-lg z-[100]">
                                    {languages.map((lang) => (
                                        <li key={lang} className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => selectPrimaryLanguage(lang)}>
                                            {LANGUAGES[lang]?.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Secondary Language Dropdown */}
                        {isSecondaryLangVisible && (
                            <div className="relative" ref={secondaryLangDropdownRef}>
                                <div
                                    className={`flex items-center py-1 px-4 border border-gray-300 rounded-[8px] cursor-pointer transition-all duration-200 ${
                                        isDarkMode ? "bg-_303030 hover:bg-_252825" : "bg-white"
                                    }`}
                                    onClick={() => setIsSecondaryLangDropdownOpen(!isSecondaryLangDropdownOpen)}
                                >
                                    <h1 className={`${isDarkMode ? "text-white" : "text-darkExpansion"} transition-all duration-200 text-lg`}>
                                        {LANGUAGES[secondaryLanguage]?.name || secondaryLanguage}
                                    </h1>
                                    <IoIosArrowDropdown className={`ml-2 text-2xl transition-all duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}`} />
                                </div>
                                {isSecondaryLangDropdownOpen && (
                                    <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-[8px] shadow-lg z-[100]">
                                        {secondaryLanguages.map((lang) => (
                                            <li key={lang} className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => selectSecondaryLanguage(lang)}>
                                                {LANGUAGES[lang]?.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <IoIosSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
                            placeholder={translations.searchPlaceholder || "Search..."}
                            className={`border transition-colors duration-200 ${isDarkMode ? "border-white text-white bg-_303030" : "border-gray-300 text-darkExpansion bg-white"} 
                                outline-none font-opensans rounded-[8px] py-2 pl-12 pr-4 w-full lg:w-[600px] placeholder:italic`}
                        />
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
