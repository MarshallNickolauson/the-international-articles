import React from 'react';
import ArticleListCard from '../components/ArticleListCard';
import { useGetAllArticlesQuery } from '../slices/article/articleApiSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RecentCardLoader from '../components/loaders/RecentCardLoader';

const ArticleListScreen = () => {
    const navigate = useNavigate();

    const language = useSelector((state) => state.language.language);
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    const translations = {
        English: {
            articles: 'Articles',
        },
        Español: {
            articles: 'Artículos',
        },
        Français: {
            articles: 'Articles',
        },
        Deutsch: {
            articles: 'Artikel',
        },
        Português: {
            articles: 'Artigos',
        },
    };

    const {
        data: articles = [],
        isLoading,
        isError,
        error,
    } = useGetAllArticlesQuery();

    if (isLoading) {
        return (
            <div className='flex flex-col'>
                <h1
                    className={`py-5 font-poppins font-bold text-4xl ${
                        isDarkMode ? 'text-white' : 'text-darkExpansion'
                    }`}
                >
                    {translations[language]?.articles || 'Articles'}
                </h1>
                <div className='h-[460px] pt-1'>
                    {[...Array(8)].map((_, index) => (
                        <div className='pb-5'>
                            <RecentCardLoader key={index} />
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
                    <h1 className='text-2xl font-bold'>
                        Error {error?.status || 'Unknown'}
                    </h1>
                    <p className='mt-2'>
                        {error?.data?.message || 'Something went wrong'}
                    </p>
                    <button
                        className='mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'
                        onClick={() => navigate('/')}
                    >
                        Go to Dashboard
                    </button>
                </div>
            </section>
        );
    }

    return (
        <div>
            <div className='flex flex-col'>
                <h1
                    className={`py-5 font-poppins font-bold text-4xl ${
                        isDarkMode ? 'text-white' : 'text-darkExpansion'
                    }`}
                >
                    {translations[language]?.articles || 'Articles'}
                </h1>
            </div>
            <div className='space-y-4 py-2'>
                {articles.map((article) => (
                    <ArticleListCard key={article._id} article={article} />
                ))}
            </div>
        </div>
    );
};

export default ArticleListScreen;
