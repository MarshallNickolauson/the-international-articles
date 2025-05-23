import dock from "../assets/dock.png";
import { FiPrinter } from "react-icons/fi";
import { CiShare1 } from "react-icons/ci";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { changeSecondaryLanguage } from "../slices/language/languageSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useGetArticleByIdQuery } from "../slices/article/articleApiSlice";
import ArticleScreenLoader from "../components/loaders/ArticleScreenLoader";
import { LANGUAGES, TRANSLATIONS } from "../constants";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useToggleFavoriteArticleMutation } from "../slices/auth/userApiSlice";
import { toggleArticleLoading } from "../slices/article/articleSlice.js";
import { toggleFavorite } from "../slices/auth/authSlice.js";

const ArticleScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    const socialIconSize = 45;
    const socialIconClass = "hover:cursor-pointer transform transition-all duration-150 hover:scale-[1.08]";

    const language = useSelector((state) => state.language.language);
    const [isSecondaryLangVisible, setisSecondaryLangVisible] = useState(false);
    const secondaryLanguage = useSelector((state) => state.language.secondaryLanguage);
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const { userInfo } = useSelector((state) => state.auth);

    const [isFavorited, setIsFavorited] = useState(false);
    const [isPrinterModalOpen, setIsPrinterModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        if (secondaryLanguage) setisSecondaryLangVisible(secondaryLanguage !== "Dual Language");
    }, [secondaryLanguage]);

    const articleFromCache = useSelector((state) => state.article.currentArticle);

    const {
        data: article,
        isLoading,
        isError,
        error,
        refetch,
        isFetching,
    } = useGetArticleByIdQuery(id, {
        skip: !!articleFromCache,
    });

    const [toggleFavoriteArticle] = useToggleFavoriteArticleMutation();

    useEffect(() => {
        if (userInfo) {
            const isFavorited = userInfo.favorites.some((fav) => fav.articleId === id);
            setIsFavorited(isFavorited);
        }
    }, [userInfo, id]);

    useEffect(() => {
        if (!articleFromCache) {
            refetch();
        }
    }, [refetch, articleFromCache]);

    useEffect(() => {
        dispatch(toggleArticleLoading(isLoading));
    }, [isLoading, dispatch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsPrinterModalOpen(false);
                setIsShareModalOpen(false);
            }
        };

        if (isPrinterModalOpen || isShareModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "auto";
        };
    }, [isPrinterModalOpen, isShareModalOpen]);

    if (isLoading || isFetching) {
        return (
            <div className="mt-6 transition-all duration-300 ease-in-out">
                <div className="flex w-full space-x-5 items-center">
                    <div className={`flex justify-between transition-all duration-300 ease-in-out ${isSecondaryLangVisible ? "w-1/2" : "w-11/12"}`}>
                        <div className={`animate-pulseh-6 w-[350px] rounded transition-all duration-200 ${isDarkMode ? "bg-[#303030]" : "bg-gray-300 "}`}></div>
                        <FiPrinter size={28} className={`hover:cursor-pointer transition-all duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}`} />
                    </div>
                    <div className={`flex items-center justify-end space-x-2 cursor-pointer hover:underline transition-all duration-300 ease-in-out ${isSecondaryLangVisible ? "w-1/2" : "w-1/12"}`}>
                        <h1 className={`font-opensans text-xl transition-all duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}`}>Share</h1>
                        <CiShare1 size={25} className={`transition-all duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}`} />
                    </div>
                </div>

                <div className="flex w-full space-x-5 mt-4">
                    <ArticleScreenLoader />
                    <div className={`flex flex-col items-end transition-all duration-200 ease-in-out ${isSecondaryLangVisible ? "w-1/2 space-y-[320px]" : "w-1/12"}`}>
                        <div
                            className={`card-shadow-static rounded-[16px] p-1 flex justify-center items-center transition-all duration-200 ease-in-out ${
                                isDarkMode ? "text-white bg-_303030" : "text-darkExpansion bg-white"
                            } ${isSecondaryLangVisible ? "flex-row h-[80px] w-[400px] space-x-4" : "flex-col w-[100px] h-[400px] space-y-4"}`}
                        >
                            <FaSquareXTwitter size={socialIconSize} className={socialIconClass} onClick={() => window.open("https://www.x.com", "_blank")} />
                            <FaYoutube size={socialIconSize} className={socialIconClass} onClick={() => window.open("https://www.youtube.com", "_blank")} />
                            <FaInstagram size={socialIconSize} className={socialIconClass} onClick={() => window.open("https://www.instagram.com", "_blank")} />
                            <FaFacebookSquare size={socialIconSize} className={socialIconClass} onClick={() => window.open("https://www.facebook.com", "_blank")} />
                            <FaLinkedin size={socialIconSize} className={socialIconClass} onClick={() => window.open("https://www.linkedin.com", "_blank")} />
                            <FaPinterest size={socialIconSize} className={socialIconClass} onClick={() => window.open("https://www.pinterest.com", "_blank")} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <section className="flex justify-center items-center mt-20">
                <div className="bg-red-100 text-red-800 p-6 rounded-2xl shadow-lg text-center max-w-md">
                    <h1 className="text-2xl font-bold">Error {error?.status || "Unknown"}</h1>
                    <p className="mt-2">{error?.data?.message || "Something went wrong"}</p>
                    <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg" onClick={() => navigate("/")}>
                        Go to Dashboard
                    </button>
                </div>
            </section>
        );
    }

    const articleData = articleFromCache?.languages[language.toLowerCase()] || article?.languages[language.toLowerCase()];

    if (!articleData) return null;

    const localeMap = {
        en: "en-US",
        es: "es-ES",
        fr: "fr-FR",
        de: "de-DE",
        pt: "pt-PT",
    };

    const articleDate = new Date(articleData.date).toLocaleDateString(localeMap[language.toLowerCase()] || "en-US", { month: "long", day: "numeric", year: "numeric" });

    const secondaryLangArticleData = article?.languages[secondaryLanguage.toLowerCase()] || articleFromCache?.languages[secondaryLanguage.toLowerCase()];

    const secondaryLangArticleDate = secondaryLangArticleData
        ? new Date(secondaryLangArticleData.date).toLocaleDateString(localeMap[secondaryLanguage.toLowerCase()] || "en-US", { month: "long", day: "numeric", year: "numeric" })
        : "null date";

    const convertPtoNewline = (htmlContent) => {
        return htmlContent.replace(/<p><\/p>/g, "\n");
    };

    const handleToggleFavoriteArticle = async () => {
        if (!userInfo) navigate("/login");
        else {
            try {
                await toggleFavoriteArticle({ articleId: id }).unwrap();
                setIsFavorited(!isFavorited);
                dispatch(toggleFavorite(id));
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="mt-6 transition-all duration-300 ease-in-out">
            <div className="flex w-full space-x-5 items-center">
                <div className={`flex flex-col space-y-2 sm:flex-row justify-between transition-all duration-300 ease-in-out ${isSecondaryLangVisible ? "w-full sm:w-1/2" : "w-full sm:w-11/12"}`}>
                    <h1 className={`will-change-opacity animate-fadeInSlideUp font-opensans italic transition-all duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}`}>
                        {"> "}
                        {TRANSLATIONS[language]?.articles || "Articles"}
                        {"> "}
                        {LANGUAGES[language]?.name || "LANG"}
                        {"> "}
                        {articleData.title}
                    </h1>
                    <div className="flex space-x-3 mr-4 items-center will-change-opacity animate-fadeInSlideUp">
                        {isFavorited ? (
                            <FaHeart
                                onClick={() => handleToggleFavoriteArticle()}
                                size={28}
                                className={`hover:scale-[1.08] cursor-pointer transition-colors duration-200 ${isDarkMode ? "text-red-500" : "text-red-500"}`}
                            />
                        ) : (
                            <FaRegHeart
                                onClick={() => handleToggleFavoriteArticle()}
                                size={28}
                                className={`hover:scale-[1.08] cursor-pointer transition-colors duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}`}
                            />
                        )}
                        <FiPrinter
                            size={28}
                            className={`hover:scale-[1.08] hover:cursor-pointer transition-colors duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}`}
                            onClick={() => window.print()}
                        />
                        <CiShare1
                            size={30}
                            className={`hover:scale-[1.08] hover:cursor-pointer transition-colors duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}`}
                            onClick={() => setIsShareModalOpen(true)}
                        />
                    </div>
                </div>
            </div>

            {isShareModalOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 h-full min-h-[1000dvh]">
                    <div className="flex items-center justify-center mt-[230px]">
                        <div
                            ref={modalRef}
                            className={`rounded-[16px] p-6 w-[90%] max-w-md max-h-[90vh] overflow-y-auto transition-all duration-300 ease-in-out ${
                                isDarkMode ? "bg-[#303030] text-white" : "bg-white text-darkExpansion"
                            }`}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">{isPrinterModalOpen ? "Print Article" : "Share Article"}</h2>
                                <IoClose
                                    size={28}
                                    className="cursor-pointer hover:scale-110 transition"
                                    onClick={() => {
                                        setIsShareModalOpen(false);
                                    }}
                                />
                            </div>

                            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg flex items-center justify-between">
                                <input type="text" readOnly value={window.location.href} className="bg-transparent w-full text-sm text-gray-700 dark:text-white focus:outline-none" />
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                    }}
                                    className="ml-2 text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    Copy
                                </button>
                            </div>

                            <div className="flex justify-center space-x-4 mt-4">
                                <FaSquareXTwitter size={30} className={socialIconClass} onClick={() => window.open("https://www.x.com", "_blank")} />
                                <FaFacebookSquare size={30} className={socialIconClass} onClick={() => window.open("https://www.facebook.com", "_blank")} />
                                <FaInstagram size={30} className={socialIconClass} onClick={() => window.open("https://www.instagram.com", "_blank")} />
                                <FaLinkedin size={30} className={socialIconClass} onClick={() => window.open("https://www.linkedin.com", "_blank")} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex w-full space-x-0 sm:space-x-5 mt-4">
                {/* Main Language Article */}
                <div
                    className={`will-change-transform will-change-opacity card-shadow-static rounded-[16px] transition-all duration-200 ease-in-out ${isDarkMode ? "bg-_303030" : "bg-white"} ${
                        isSecondaryLangVisible ? "w-1/2" : "w-full sm:w-11/12"
                    } animate-fadeInSlideUp`}
                >
                    <img
                        src={`/images/${String(article?.imageUrl || articleFromCache?.imageUrl).replace(/^\/?data\/?/, "")}`}
                        alt=""
                        className={`rounded-t-[16px] image-shadow w-full max-h-[300px] object-cover animate-fadeIn`}
                    />
                    <div className="p-5">
                        <h1 className={`text-2xl sm:text-3xl font-bold font-poppins mb-2 transition-all duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}`}>{articleData.title}</h1>
                        <div className="flex space-x-2">
                            <h1 className={`text-sm italic font-opensans mb-6 transition-all duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}`}>{articleDate}</h1>
                            <HiOutlineSpeakerWave size={20} className={`pt-[1px] hover:cursor-pointer transition-all duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}`} />
                        </div>

                        <div
                            className={`text-md sm:text-lg font-opensans tracking-wider leading-[1.75] transition-all duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}`}
                            style={{
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                                overflowWrap: "break-word",
                            }}
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: convertPtoNewline(articleData.content),
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className={`flex flex-col items-end transition-all duration-200 ease-in-out ${isSecondaryLangVisible ? "w-1/2 space-y-[225px]" : "w-0 sm:w-1/12"}`}>
                    {/* Connect Section */}
                    <div className="hidden sm:block">
                        <div
                            className={`will-change-transform will-change-opacity card-shadow-static rounded-[16px] p-1 flex justify-center items-center transition-all duration-200 ease-in-out ${
                                isDarkMode ? "text-white bg-_303030" : "text-darkExpansion bg-white"
                            } ${isSecondaryLangVisible ? "flex-row h-[80px] w-[400px] space-x-4" : "flex-col w-[70px] md:w-[100px] h-[400px] space-y-4"}
                        animate-fadeInSlideLeft`}
                        >
                            <FaSquareXTwitter size={socialIconSize} className={socialIconClass} onClick={() => window.open("https://www.x.com", "_blank")} />
                            <FaYoutube size={socialIconSize} className={socialIconClass} onClick={() => window.open("https://www.youtube.com", "_blank")} />
                            <FaInstagram size={socialIconSize} className={socialIconClass} onClick={() => window.open("https://www.instagram.com", "_blank")} />
                            <FaFacebookSquare size={socialIconSize} className={socialIconClass} onClick={() => window.open("https://www.facebook.com", "_blank")} />
                            <FaLinkedin size={socialIconSize} className={socialIconClass} onClick={() => window.open("https://www.linkedin.com", "_blank")} />
                            <FaPinterest size={socialIconSize} className={socialIconClass} onClick={() => window.open("https://www.pinterest.com", "_blank")} />
                        </div>
                    </div>

                    {/* Secondary Language Article */}
                    <div
                        className={`transition-all duration-200 ease-in-out ${isDarkMode ? "bg-_303030" : "bg-white"} ${
                            isSecondaryLangVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-5 scale-95 pointer-events-none absolute"
                        } w-full card-shadow-static rounded-[16px] relative`}
                    >
                        <div className="absolute top-4 right-5 translate-x-2 -translate-y-2 text-2xl">
                            <IoClose
                                size={30}
                                className={`hover:cursor-pointer transition-all duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}`}
                                onClick={() => {
                                    dispatch(changeSecondaryLanguage("Dual Language"));
                                }}
                            />
                        </div>

                        {secondaryLangArticleData && (
                            <div className="py-3 px-2">
                                <h1 className={`text-3xl font-bold font-poppins mb-2 transition-all duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}`}>
                                    {secondaryLangArticleData.title}
                                </h1>
                                <div className="flex space-x-2">
                                    <h1 className={`text-sm italic mb-6 font-opensans transition-all duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}`}>{secondaryLangArticleDate}</h1>
                                    <HiOutlineSpeakerWave size={20} className={`pt-[1px] hover:cursor-pointer transition-all duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}`} />
                                </div>
                                <div
                                    className={`text-lg font-opensans tracking-wider leading-[1.75] transition-all duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}`}
                                    style={{
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word",
                                        overflowWrap: "break-word",
                                    }}
                                >
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: convertPtoNewline(secondaryLangArticleData.content),
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleScreen;
