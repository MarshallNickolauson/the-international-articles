import { useDispatch, useSelector } from "react-redux";
import dock from "../assets/dock.png";
import { useLocation, useNavigate } from "react-router-dom";
import { setCurrentArticle } from "../slices/article/articleSlice";

const ArticleListCard = ({ article }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    const language = useSelector((state) => state.language.language);

    const articleData = article.languages[language.toLowerCase()];

    if (!articleData) return null;

    const localeMap = {
        english: "en-US",
        español: "es-ES",
        français: "fr-FR",
        deutsch: "de-DE",
        português: "pt-PT",
    };

    const articleDate = new Date(articleData.date).toLocaleDateString(localeMap[language.toLowerCase()] || "en-US", { month: "short", day: "numeric", year: "numeric" });

    const cleanText = articleData.content
        .replace(/<[^>]*>/g, "") // Remove HTML tags
        .replace(/([^\s])([.?!;:])(\S)/g, "$1$2 $3") // Add space after . ? ! ; : if missing
        .replace(/([.?!;:])\s+/g, "$1 ") // Ensure only one space after punctuation
        .replace(/\s+/g, " ") // Collapse multiple spaces/newlines into one
        .trim()
        .substring(0, 500);

    const handleClick = () => {
        dispatch(setCurrentArticle(article));
        if (location.pathname.includes("/my-articles")) {
            navigate(`/article/${article._id}/edit`);
        } else {
            navigate(`/article/${article._id}`);
        }
    };

    return (
        <div className={`card-shadow rounded-[16px] hover:cursor-pointer transition-all duration-200 ${isDarkMode ? "bg-_303030" : ""}`} onClick={() => handleClick()}>
            <div className="flex space-x-4">
                <div className="h-36 w-36 flex-shrink-0">
                    <img src={dock} alt="" className="h-full w-full object-cover rounded-l-[16px] image-shadow" />
                </div>

                <div className="flex items-center w-full overflow-hidden">
                    <div className="flex flex-col space-y-1 w-full font-opensans">
                        <h1 className={`text-2xl font-bold truncate transition-all duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}`}>{articleData.title}</h1>
                        <h1 className={`text-sm italic transition-all duration-200 ${isDarkMode ? "text-white" : "text-gray-600"}`}>{articleDate}</h1>
                        <h1 className={`text-lg line-clamp-1 transition-all duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}`}>{cleanText}</h1>
                        <div className="flex space-x-3">
                            {!location.pathname.includes("/my-articles") && (
                                <h1
                                    className={`font-bold underline inline-block pb-1 transition-all duration-200 ${
                                        isDarkMode ? "text-white hover:text-blue-300" : "text-darkExpansion hover:text-mainBlue"
                                    } ${location.pathname.includes("/my-articles") ? "text-xl" : "text-lg"}`}
                                >
                                    Read More
                                </h1>
                            )}
                            {location.pathname.includes("/my-articles") && (
                                <h1
                                    className={`text-lg font-bold truncate transition-all duration-200 ${isDarkMode ? "text-white" : "text-darkExpansion"}
                                    px-3 bg-opacity-60 rounded-[16px] flex justify-center items-center
                                    ${article.isPublished ? "bg-green-400" : "bg-yellow-400"}`}
                                >
                                    {article.isPublished ? "Published" : "Draft"}
                                </h1>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleListCard;
