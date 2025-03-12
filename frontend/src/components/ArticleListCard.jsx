import { useSelector } from "react-redux";
import dock from "../assets/dock.png";

const ArticleListCard = ({ article }) => {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    const language = useSelector((state) => state.language.language);
    
    const articleData = article.languages[language.toLowerCase()];

    if (!articleData) return null;

    const localeMap = {
        english: "en-US",
        español: "es-ES",
        français: "fr-FR",
        deutsch: "de-DE",
        português: "pt-PT"
    };
    
    const articleDate = new Date(articleData.date).toLocaleDateString(
        localeMap[language.toLowerCase()] || "en-US",
        { month: "short", day: "numeric", year: "numeric" }
    );

    return (
        <div className="card-shadow rounded-[16px] hover:cursor-pointer transition-all duration-200">
            <div className="flex space-x-4">
                <div className="h-36 w-36 flex-shrink-0">
                    <img
                        src={dock}
                        alt=""
                        className="h-full w-full object-cover rounded-l-[16px] image-shadow"
                    />
                </div>

                {/* Text container */}
                <div className="flex items-center w-full overflow-hidden">
                    <div className="flex flex-col space-y-1 w-full">
                        <h1 className={`text-2xl font-bold truncate transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>
                            {articleData.title}
                        </h1>
                        <h1 className={`text-sm italic transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
                            {articleDate}
                        </h1>
                        <h1 className={`text-lg line-clamp-1 transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>
                            {articleData.content.substring(0, 500)}
                        </h1>
                        <div>
                            <h1 className={`text-lg font-bold underline inline-block pb-1 transition-all duration-200 ${isDarkMode ? 'text-white hover:text-blue-300' : 'text-darkExpansion hover:text-mainBlue'}`}>
                                Read More
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleListCard;
