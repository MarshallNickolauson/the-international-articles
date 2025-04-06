import { useSelector } from 'react-redux';
import FeaturedArticle from '../components/FeaturedArticle';
import ArticleListCard from '../components/ArticleListCard';
import { useGet5RecentArticlesQuery } from '../slices/article/articleApiSlice';
import FeaturedCardLoader from '../components/loaders/FeaturedCardLoader';
import RecentCardLoader from '../components/loaders/RecentCardLoader';
import { TRANSLATIONS } from '../constants';
import { useEffect } from 'react';

const Dashboard = () => {
    const language = useSelector((state) => state.language.language);
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    const {
        data: articles = [],
        isLoading,
        isError,
        error,
        refetch,
        isFetching,
    } = useGet5RecentArticlesQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    const translations = TRANSLATIONS[language] || TRANSLATIONS.en;

    if (isLoading || isFetching) {
        return (
            <section>
                <div className='flex space-x-6'>
                    {/* Featured Article Loader */}
                    <div className='flex-1 flex flex-col'>
                        <h1 className={`py-5 font-poppins font-bold text-4xl ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>{translations.featuredArticle || 'Featured Article'}</h1>
                        <div className='h-[460px]'>
                            <FeaturedCardLoader />
                        </div>
                    </div>

                    {/* Recent Articles Loader */}
                    <div className='flex-1 flex flex-col'>
                        <h1 className={`py-5 font-poppins font-bold text-xl mt-3 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>{translations.recentArticles || 'Recent Articles'}</h1>
                        <div className='flex flex-col h-[500px] justify-between space-y-4'>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <RecentCardLoader key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (isError) {
        return (
            <section className='flex justify-center items-center mt-20'>
                <div className='bg-red-100 text-red-800 p-6 rounded-2xl shadow-lg text-center max-w-md'>
                    <h1 className='text-2xl font-bold'>Error {error?.status || 'Unknown'}</h1>
                    <p className='mt-2'>{error?.data?.message || 'Something went wrong'}</p>
                    <button className='mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg' onClick={() => window.location.reload()}>
                        {translations.goToDashboard || 'Go to Dashboard'}
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className='flex space-x-6'>
                {/* Featured Article */}
                <div className='flex-1 flex flex-col'>
                    <h1 className={`py-5 font-poppins font-bold text-4xl transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>
                        {translations.featuredArticle || 'Featured Article'}
                    </h1>

                    {articles && articles.length > 0 ? (
                        <div className='h-[500px] animate-fadeInSlideUp'>
                            <FeaturedArticle key={articles[0]._id} article={articles[0]} />
                        </div>
                    ) : (
                        <p className='text-gray-500'>No articles available</p>
                    )}
                </div>

                {/* Recent Articles */}
                <div className='flex-1 flex flex-col font-opensans'>
                    <h1 className={`py-5 font-poppins font-bold text-xl mt-3 transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-darkExpansion'}`}>
                        {translations.recentArticles || 'Recent Articles'}
                    </h1>

                    {articles && articles.length > 1 ? (
                        <div className='flex flex-col h-[500px] justify-between space-y-4 animate-fadeInSlideUp'>
                            {articles.slice(1).map((article) => (
                                <ArticleListCard key={article._id} article={article} />
                            ))}
                        </div>
                    ) : (
                        <p className='text-gray-500'>No recent articles available</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
