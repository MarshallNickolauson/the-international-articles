import { useSelector } from 'react-redux';

const FeaturedCardLoader = () => {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    return (
        <div
            className={`animate-pulse ${
                isDarkMode ? 'bg-[#303030]' : 'bg-white'
            } rounded-lg card-shadow-static p-4`}
        >
            <div
                className={`h-[460px] rounded-md relative overflow-hidden ${
                    isDarkMode ? 'bg-[#303030]' : 'bg-gray-300'
                }`}
            >
                <div
                    className={`absolute inset-0 animate-[shimmer_1.5s_infinite] ${
                        isDarkMode
                            ? 'bg-gradient-to-r from-[#252525] via-[#1f1f1f] to-[#252525]'
                            : 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'
                    }`}
                ></div>
            </div>
            <div
                className={`mt-4 h-6 rounded-md w-3/4 ${
                    isDarkMode ? 'bg-[#252525]' : 'bg-gray-300'
                }`}
            ></div>
            <div
                className={`mt-2 h-4 rounded-md w-5/6 ${
                    isDarkMode ? 'bg-[#252525]' : 'bg-gray-200'
                }`}
            ></div>
            <div
                className={`mt-2 h-4 rounded-md w-2/3 ${
                    isDarkMode ? 'bg-[#252525]' : 'bg-gray-200'
                }`}
            ></div>
        </div>
    );
};

export default FeaturedCardLoader;
