import React, { useEffect, useState } from 'react';
import ArticleListCard from '../components/ArticleListCard';
import { useGetAllArticlesQuery } from '../slices/article/articleApiSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RecentCardLoader from '../components/loaders/RecentCardLoader';
import { TRANSLATIONS } from '../constants';
import { FaRegArrowAltCircleDown } from 'react-icons/fa';

const ArticleListScreen = () => {
    const navigate = useNavigate();

    const language = useSelector((state) => state.language.language);
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    const translations = TRANSLATIONS[language] || TRANSLATIONS.en;

    const { data: articles = [], isLoading, isError, error, refetch, isFetching } = useGetAllArticlesQuery(undefined, { refetchOnMountOrArgChange: true });

    const [isRotated, setIsRotated] = useState(false);

    const sortedArticles = isRotated
        ? [...articles].sort((a, b) => new Date(a.languages[language]?.date) - new Date(b.languages[language]?.date)) // ASC by date
        : [...articles].sort((a, b) => new Date(b.languages[language]?.date) - new Date(a.languages[language]?.date)); // DESC by date

    useEffect(() => {
        refetch();
    }, [refetch]);

    if (isLoading || isFetching) {
        return (
            <div className='flex flex-col'>
                <h1 className={`py-5 font-poppins font-bold text-4xl transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>{translations.articles || 'Articles'}</h1>
                <div className='h-[460px] pt-1'>
                    {[...Array(8)].map((_, index) => (
                        <div className='pb-5' key={index}>
                            <RecentCardLoader />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <section className='flex justify-center items-center mt-20'>
                <div className='bg-red-100 text-red-800 p-6 rounded-2xl shadow-lg text-center max-w-md'>
                    <h1 className='text-2xl font-bold'>Error {error?.status || 'Unknown'}</h1>
                    <p className='mt-2'>{error?.data?.message || 'Something went wrong'}</p>
                    <button className='mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg' onClick={() => navigate('/')}>
                        {translations.goToDashboard || 'Go to Dashboard'}
                    </button>
                </div>
            </section>
        );
    }

    return (
        <div>
            <div className='flex items-center space-x-4'>
                <h1 className={`py-5 font-poppins font-bold text-4xl transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>{translations.articles || 'Articles'}</h1>
                <div className='my-4 flex space-x-3 items-center'>
                    <FaRegArrowAltCircleDown
                        size={35}
                        onClick={() => setIsRotated(!isRotated)}
                        className={`transition-all duration-200 cursor-pointer transform ${isRotated ? 'rotate-180' : ''} ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}
                    />
                </div>
            </div>
            <div className='space-y-4 py-2 animate-fadeInSlideUp'>
                {sortedArticles.map((article) => (
                    <ArticleListCard key={article._id} article={article} />
                ))}
            </div>
        </div>
    );
};

export default ArticleListScreen;
