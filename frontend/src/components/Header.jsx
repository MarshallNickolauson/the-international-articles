import { useState, useEffect, useRef } from "react";
import { FaBookAtlas } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosSearch, IoIosArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
    changeLanguage,
    changeSecondaryLanguage,
} from "../slices/language/languageSlice";
import { toggleDarkMode } from "../slices/theme/themeSlice";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const language = useSelector((state) => state.language.language);
    const secondaryLanguage = useSelector((state) => state.language.secondaryLanguage);
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const isArticleLoading = useSelector((state) => state.article.isLoading);

    const [searchQuery, setSearchQuery] = useState("");

    const [isPrimaryLangDropdownOpen, setIsPrimaryLangDropdownOpen] = useState(false);
    const [selectedPrimaryLanguage, setSelectedPrimaryLanguage] = useState("");
    const [isPrimaryLanguageLoading, setIsPrimaryLanguageLoading] = useState(false);

    const [isSecondaryLangVisible, setisSecondaryLangVisible] = useState(false);
    const [isSecondaryLangDropdownOpen, setIsSecondaryLangDropdownOpen] = useState(false);
    const [selectedSecondaryLanguage, setSelectedSecondaryLanguage] = useState("Dual Language");

    useEffect(() => {
        if ((location.pathname === "/article" || location.pathname.startsWith("/article/")) && !isArticleLoading) {
            setisSecondaryLangVisible(true);
            setSelectedSecondaryLanguage("Dual Language");
        } else setisSecondaryLangVisible(false);
    }, [location, isArticleLoading]);

    const primaryLangDropdownRef = useRef(null);
    const secondaryLangDropdownRef = useRef(null);

    const languages = [
        "English",
        "Español",
        "Français",
        "Deutsch",
        "Português",
    ];

    const secondaryLanguages = languages.filter(
        (lang) => lang !== selectedPrimaryLanguage
    );

    const translations = {
        English: {
            siteTitle: "The International Articles",
            dashboard: "Dashboard",
            articles: "Articles",
            menu: "Menu",
            signIn: "Sign In",
            searchPlaceholder: "Search...",
        },
        Español: {
            siteTitle: "Los Artículos Internacionales",
            dashboard: "Tablero",
            articles: "Artículos",
            menu: "Menú",
            signIn: "Iniciar sesión",
            searchPlaceholder: "Buscar...",
        },
        Français: {
            siteTitle: "Les Articles Internationaux",
            dashboard: "Tableau de bord",
            articles: "Articles",
            menu: "Menu",
            signIn: "Se connecter",
            searchPlaceholder: "Rechercher...",
        },
        Deutsch: {
            siteTitle: "Die Internationalen Artikel",
            dashboard: "Armaturenbrett",
            articles: "Artikel",
            menu: "Menü",
            signIn: "Anmelden",
            searchPlaceholder: "Suchen...",
        },
        Português: {
            siteTitle: "Os Artigos Internacionais",
            dashboard: "Painel",
            articles: "Artigos",
            menu: "Menu",
            signIn: "Entrar",
            searchPlaceholder: "Pesquisar...",
        },
    };

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
        setIsPrimaryLanguageLoading(true);
        if (language) {
            setSelectedPrimaryLanguage(language);
        }
        setIsPrimaryLanguageLoading(false);
    }, [language, dispatch]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsidePrimaryLang);
        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutsidePrimaryLang
            );
        };
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideSecondaryLang);
        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutsideSecondaryLang
            );
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
            setSelectedSecondaryLanguage("Dual Language");
            dispatch(changeSecondaryLanguage("Dual Language"));
        }
    }, [selectedPrimaryLanguage, dispatch]);

    useEffect(() => {
        dispatch(changeSecondaryLanguage('Dual Language'));
    }, [location, dispatch]);

    useEffect(() => {
        setSelectedSecondaryLanguage(secondaryLanguage);
    }, [secondaryLanguage]);

    return (
        <>
            <nav className="top-0 w-full bg-darkGreen py-3 px-4 flex justify-center">
                <div className="flex justify-between w-full max-w-[1450px]">
                    <div
                        className="flex space-x-3 hover:cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <FaBookAtlas size={40} color="white" />
                        <h1 className="font-poppins font-bold tracking-wide text-white flex items-center text-3xl">
                            {translations[selectedPrimaryLanguage]?.siteTitle ||
                                "The International Articles"}
                        </h1>
                    </div>
                    <div className="font-opensans flex space-x-5 text-white items-center">
                        {/* Dark/Light Theme Toggle */}
                        <div
                            className={`relative w-14 h-7 rounded-full flex items-center cursor-pointer transition-all duration-300 ${
                                isDarkMode ? "bg-gray-800" : "bg-gray-100"
                            }`}
                            onClick={() => dispatch(toggleDarkMode())}
                        >
                            <div
                                className={`absolute w-5 h-5 rounded-full transition-all duration-300 ${
                                    isDarkMode
                                        ? "bg-white translate-x-[30px]"
                                        : "bg-gray-800 translate-x-[5px]"
                                }`}
                            ></div>
                        </div>

                        <Link
                            to="/login"
                            className="bg-white text-darkGreen font-semibold px-4 py-2 rounded-[8px] hover:bg-gray-200 transition-all duration-100"
                        >
                            {translations[selectedPrimaryLanguage]?.signIn ||
                                "Sign In"}
                        </Link>

                        <h1 className="hover:cursor-pointer border-b-2 pb-1 border-b-transparent hover:border-b-mainWhite transition-all duration-100">
                            {translations[selectedPrimaryLanguage]?.menu ||
                                "Menu"}
                        </h1>
                    </div>
                </div>
            </nav>

            {/* Secondary Navbar */}
            <nav
                className={`w-full px-4 py-4 border-b-[1px] border-gray-300`}
            >
                <div className="flex mx-auto max-w-[1450px] justify-between items-center">
                    <div className="flex space-x-10 items-center">
                        <Link
                            to="/"
                            className={`text-lg hover:underline transition-all duration-200 ${
                                isDarkMode ? "text-white" : "text-darkExpansion"
                            }`}
                        >
                            {translations[selectedPrimaryLanguage]?.dashboard ||
                                "Dashboard"}
                        </Link>
                        <Link
                            to="/articles"
                            className={`text-lg hover:underline transition-all duration-200 ${
                                isDarkMode ? "text-white" : "text-darkExpansion"
                            }`}
                        >
                            {translations[selectedPrimaryLanguage]?.articles ||
                                "Articles"}
                        </Link>

                        {/* Primary Language */}
                        <div className="relative" ref={primaryLangDropdownRef}>
                            <div
                                className="flex items-center py-1 px-4 border-[1px] border-gray-300 rounded-[8px] hover:cursor-pointer hover:border-gray-400"
                                onClick={() =>
                                    setIsPrimaryLangDropdownOpen(
                                        !isPrimaryLangDropdownOpen
                                    )
                                }
                            >
                                <h1
                                    className={`${
                                        isDarkMode
                                            ? "text-white"
                                            : "text-darkExpansion"
                                    } text-lg transition-all duration-200 ${
                                        isPrimaryLanguageLoading
                                            ? "opacity-0"
                                            : "opacity-100"
                                    }`}
                                >
                                    {selectedPrimaryLanguage}
                                </h1>
                                <IoIosArrowDropdown
                                    className={`ml-2 text-2xl transition-all duration-200 ${
                                        isDarkMode
                                            ? "text-white"
                                            : "text-darkExpansion"
                                    }`}
                                />
                            </div>
                            {isPrimaryLangDropdownOpen && (
                                <ul
                                    className={`absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-[8px] shadow-lg opacity-100 transition-all duration-200`}
                                >
                                    {languages.map((lang, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() =>
                                                selectPrimaryLanguage(lang)
                                            }
                                        >
                                            {lang}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Secondary Language */}
                        <div
                            className={`relative ${
                                !isSecondaryLangVisible ? "hidden" : ""
                            }`}
                            ref={secondaryLangDropdownRef}
                        >
                            <div
                                className="flex items-center py-1 px-4 border-[1px] border-gray-300 rounded-[8px] hover:cursor-pointer hover:border-gray-400"
                                onClick={() =>
                                    setIsSecondaryLangDropdownOpen(
                                        !isSecondaryLangDropdownOpen
                                    )
                                }
                            >
                                <h1
                                    className={`${
                                        isDarkMode
                                            ? "text-white"
                                            : "text-darkExpansion"
                                    } text-lg transition-all duration-200`}
                                >
                                    {selectedSecondaryLanguage}
                                </h1>
                                <IoIosArrowDropdown
                                    className={`ml-2 text-2xl transition-all duration-200 ${
                                        isDarkMode
                                            ? "text-white"
                                            : "text-darkExpansion"
                                    }`}
                                />
                            </div>
                            {isSecondaryLangDropdownOpen && (
                                <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-[8px] shadow-lg transition-all duration-200">
                                    {secondaryLanguages.map((lang, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() =>
                                                selectSecondaryLanguage(lang)
                                            }
                                        >
                                            {lang}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="relative">
                        <IoIosSearch
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={
                                translations[selectedPrimaryLanguage]
                                    ?.searchPlaceholder || "Search..."
                            }
                            className={`border transition-all duration-200 ${
                                isDarkMode
                                    ? "border-white text-white bg-_303030"
                                    : "border-gray-300 text-darkExpansion bg-white"
                            }
                            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500
                            font-opensans rounded-[8px] py-2 pl-12 pr-4 transition-all duration-200 
                            w-[600px] placeholder:italic`}
                        />
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
