import { useSelector } from "react-redux";
import dock from "../assets/dock.png";

const RecentArticle = () => {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

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
                            Practice the Presence of God
                        </h1>
                        <h1 className={`text-sm italic transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
                            Aug. 19, 2024
                        </h1>
                        <h1 className={`text-lg line-clamp-1 transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>
                            God is present in our lives every moment of the day,
                            whether we recognize it or not. More filler words
                            here that have meaning and trail off into dots
                            okay...
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

export default RecentArticle;
