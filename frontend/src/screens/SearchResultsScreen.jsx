import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLazySearchArticleQuery } from '../slices/article/articleApiSlice';
import { useSelector } from 'react-redux';
import ArticleListCard from '../components/ArticleListCard';
import RecentCardLoader from '../components/loaders/RecentCardLoader';
import { TRANSLATIONS } from '../constants';

const SearchResultsScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const language = useSelector((state) => state.language.language);
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const translations = TRANSLATIONS[language] || TRANSLATIONS.en;

    const [triggerSearch, { error, isLoading }] = useLazySearchArticleQuery();
    const [searchResults, setSearchResults] = useState([]);

    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');

    useEffect(() => {
        const fetchData = async () => {
            if (query) {
                try {
                    const res = await triggerSearch({ searchQuery: query, language });
                    if (res?.data) {
                        setSearchResults(res.data || []); 
                    } else if (res?.error) {
                        console.error('Error:', res.error);
                    }
                } catch (err) {
                    console.error('Failed to fetch articles:', err);
                }
            }
        };

        fetchData();
    }, [query, language, triggerSearch]);

    if (isLoading) {
        return (
            <div className='flex flex-col'>
                <h1 className={`py-5 font-poppins font-bold text-4xl transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>
                    {translations.searchResultsFor || 'Search Results For'}
                </h1>
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

    if (error) {
        return (
            <div className='flex justify-center items-center mt-20'>
                <div className='bg-red-100 text-red-800 p-6 rounded-2xl shadow-lg text-center max-w-md'>
                    <h1 className='text-2xl font-bold'>Error</h1>
                    <p>{error?.data?.message || 'Something went wrong'}</p>
                    <button className='mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg' onClick={() => navigate('/')}>
                        {translations.goToDashboard || 'Go to Dashboard'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className={`py-5 font-poppins font-bold text-4xl transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>
                {translations.searchResultsFor || 'Search Results For'}: "{query}"
            </h1>

            {searchResults.length === 0 ? (
                <p className='text-center text-gray-500'>{translations.noResults || 'No articles found'}</p>
            ) : (
                <div className='space-y-4 py-2'>
                    {searchResults.map((article) => (
                        <ArticleListCard key={article._id} article={article} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResultsScreen;
