import React, { useEffect, useState } from 'react';
import ArticleListCard from '../components/ArticleListCard';
import { useGetAllUserArticlesQuery } from '../slices/article/articleApiSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RecentCardLoader from '../components/loaders/RecentCardLoader';
import { TRANSLATIONS } from '../constants';
import { FaRegArrowAltCircleDown } from 'react-icons/fa';

const MyArticlesScreen = () => {
    const navigate = useNavigate();

    const language = useSelector((state) => state.language.language);
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    const translations = TRANSLATIONS[language] || TRANSLATIONS.en;

    const { data: articles = [], isLoading, isError, error, refetch, isFetching } = useGetAllUserArticlesQuery(undefined, { refetchOnMountOrArgChange: true });

    const [isRotated, setIsRotated] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'published', 'draft'

    const filteredArticles = filterStatus === 'all' ? articles : articles.filter((article) => (filterStatus === 'published' ? article.isPublished : !article.isPublished));

    const sortedArticles = isRotated
        ? [...filteredArticles].sort((a, b) => new Date(a.languages[language]?.date) - new Date(b.languages[language]?.date)) // ASC by date
        : [...filteredArticles].sort((a, b) => new Date(b.languages[language]?.date) - new Date(a.languages[language]?.date)); // DESC by date

    useEffect(() => {
        refetch();
    }, [refetch]);

    if (isLoading || isFetching) {
        return (
            <div className='flex flex-col'>
                <h1 className={`py-5 font-poppins font-bold text-4xl ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>{translations.myArticles || 'My Articles'}</h1>
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
                <h1 className={`py-5 font-poppins font-bold text-4xl tranistion-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>{translations.myArticles || 'My Articles'}</h1>
                <div className='my-4 flex space-x-3 items-center'>
                    <FaRegArrowAltCircleDown
                        size={35}
                        onClick={() => setIsRotated(!isRotated)}
                        className={`transition-all duration-200 cursor-pointer transform ${isRotated ? 'rotate-180' : ''} ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}
                    />
                    <button
                        className={`mr-2 px-4 py-2 font-bold rounded-lg transition-all duration-200 ${filterStatus === 'all' ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-300 text-darkExpansion'}`}
                        onClick={() => setFilterStatus('all')}
                    >
                        {translations.all || 'All'}
                    </button>

                    <button
                        className={`mr-2 px-4 bg-opacity-90 py-2 font-bold rounded-lg transition-all duration-200 ${
                            filterStatus === 'published' ? 'bg-green-500 text-white shadow-md' : 'bg-gray-300 text-darkExpansion'
                        }`}
                        onClick={() => setFilterStatus('published')}
                    >
                        {translations.published || 'Published'}
                    </button>

                    <button
                        className={`px-4 py-2 font-bold rounded-lg transition-all duration-200 ${filterStatus === 'draft' ? 'bg-yellow-500 text-white shadow-md' : 'bg-gray-300 text-darkExpansion'}`}
                        onClick={() => setFilterStatus('draft')}
                    >
                        {translations.draft || 'Draft'}
                    </button>
                </div>
            </div>
            <div className='space-y-4 py-2'>
                {sortedArticles.map((article) => (
                    <ArticleListCard key={article._id} article={article} />
                ))}
            </div>
        </div>
    );
};

export default MyArticlesScreen;
