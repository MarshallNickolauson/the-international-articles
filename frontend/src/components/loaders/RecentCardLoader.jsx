import React from 'react';
import { useSelector } from 'react-redux';

const RecentCardLoader = () => {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    return (
        <div
            className={`animate-pulse ${
                isDarkMode ? 'bg-[#303030]' : 'bg-white'
            } rounded-[16px] card-shadow-static p-4 h-[133px] flex space-x-4 items-center`}
        >
            <div
                className={`w-24 h-[90px] rounded-md relative overflow-hidden ${
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
            <div className='flex-1 space-y-4'>
                <div
                    className={`h-5 rounded-md w-3/4 ${
                        isDarkMode ? 'bg-[#252525]' : 'bg-gray-300'
                    }`}
                ></div>
                <div
                    className={`h-4 rounded-md w-5/6 ${
                        isDarkMode ? 'bg-[#252525]' : 'bg-gray-200'
                    }`}
                ></div>
                <div
                    className={`h-4 rounded-md w-2/3 ${
                        isDarkMode ? 'bg-[#252525]' : 'bg-gray-200'
                    }`}
                ></div>
                <div
                    className={`h-3 rounded-md w-1/3 ${
                        isDarkMode ? 'bg-[#252525]' : 'bg-gray-200'
                    }`}
                ></div>
            </div>
        </div>
    );
};

export default RecentCardLoader;
