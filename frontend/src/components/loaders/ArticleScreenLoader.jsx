import { useSelector } from 'react-redux';

const ArticleScreenLoader = () => {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    return (
        <div
            className={`animate-pulse ${
                isDarkMode ? 'bg-[#303030]' : 'bg-white'
            } rounded-[16px] card-shadow-static w-11/12`}
        >
            <div className="w-full h-[725px] rounded-t-[16px] relative overflow-hidden">
                <div
                    className={`absolute inset-0 animate-[shimmer_1.5s_infinite] ${
                        isDarkMode
                            ? 'bg-gradient-to-r from-[#252525] via-[#1f1f1f] to-[#252525]'
                            : 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'
                    }`}
                ></div>
            </div>
            <div className="py-5 px-6">
                <div
                    className={`h-8 rounded-md w-3/4 ${
                        isDarkMode ? 'bg-[#252525]' : 'bg-gray-300'
                    }`}
                ></div>
                <div className="flex space-x-2 mt-4">
                    <div
                        className={`h-4 rounded-md w-1/4 ${
                            isDarkMode ? 'bg-[#252525]' : 'bg-gray-300'
                        }`}
                    ></div>
                    <div
                        className={`h-4 w-5 ${
                            isDarkMode ? 'bg-[#252525]' : 'bg-gray-300'
                        }`}
                    ></div>
                </div>
                <div
                    className={`mt-6 h-6 rounded-md w-5/6 ${
                        isDarkMode ? 'bg-[#252525]' : 'bg-gray-300'
                    }`}
                ></div>
                <div
                    className={`mt-2 h-6 rounded-md w-2/3 ${
                        isDarkMode ? 'bg-[#252525]' : 'bg-gray-300'
                    }`}
                ></div>
                <div
                    className={`mt-2 h-6 rounded-md w-full ${
                        isDarkMode ? 'bg-[#252525]' : 'bg-gray-300'
                    }`}
                ></div>
                <div
                    className={`mt-2 h-6 rounded-md w-4/5 ${
                        isDarkMode ? 'bg-[#252525]' : 'bg-gray-300'
                    }`}
                ></div>
                <div
                    className={`mt-2 h-6 rounded-md w-3/4 ${
                        isDarkMode ? 'bg-[#252525]' : 'bg-gray-300'
                    }`}
                ></div>
            </div>
        </div>
    );
};

export default ArticleScreenLoader;
