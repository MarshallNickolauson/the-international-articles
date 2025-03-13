import { useSelector } from 'react-redux';
import FeaturedArticle from '../components/FeaturedArticle';
import ArticleListCard from '../components/ArticleListCard';
import { useGet5RecentArticlesQuery } from '../slices/article/articleApiSlice';

const Dashboard = () => {
    const language = useSelector((state) => state.language.language);
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    const {
        data: articles = [],
        isLoading,
        isError,
    } = useGet5RecentArticlesQuery();

    const translations = {
        English: {
            featuredArticle: 'Featured Article',
            recentArticles: 'Recent Articles',
        },
        Español: {
            featuredArticle: 'Artículo Destacado',
            recentArticles: 'Artículos Recientes',
        },
        Français: {
            featuredArticle: 'Article en Vedette',
            recentArticles: 'Articles Récents',
        },
        Deutsch: {
            featuredArticle: 'Empfohlener Artikel',
            recentArticles: 'Neueste Artikel',
        },
        Português: {
            featuredArticle: 'Artigo em Destaque',
            recentArticles: 'Artigos Recentes',
        },
    };

    const FeaturedSkeletonLoader = ({ isDarkMode }) => (
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

    const RecentSkeletonLoader = ({ isDarkMode }) => (
        <div
            className={`animate-pulse ${
                isDarkMode ? 'bg-[#303030]' : 'bg-white'
            } rounded-lg card-shadow-static p-4 h-[133px] flex space-x-4 items-center`}
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

    if (isLoading) {
        return (
            <section>
                <div className='flex space-x-6'>
                    {/* Featured Article Loader */}
                    <div className='flex-1 flex flex-col'>
                        <h1
                            className={`py-5 font-poppins font-bold text-4xl ${
                                isDarkMode ? 'text-white' : 'text-darkExpansion'
                            }`}
                        >
                            {translations[language]?.featuredArticle ||
                                'Featured Article'}
                        </h1>
                        <div className='h-[460px]'>
                            <FeaturedSkeletonLoader isDarkMode={isDarkMode} />
                        </div>
                    </div>

                    {/* Recent Articles Loader */}
                    <div className='flex-1 flex flex-col'>
                        <h1
                            className={`py-5 font-poppins font-bold text-xl mt-3 ${
                                isDarkMode ? 'text-white' : 'text-darkExpansion'
                            }`}
                        >
                            {translations[language]?.recentArticles ||
                                'Recent Articles'}
                        </h1>
                        <div className='flex flex-col h-[500px] justify-between space-y-4'>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <RecentSkeletonLoader
                                    key={index}
                                    isDarkMode={isDarkMode}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (isError) return <p>Error fetching articles</p>;

    return (
        <section>
            <div className='flex space-x-6'>
                {/* Featured Article */}
                <div className='flex-1 flex flex-col'>
                    <h1
                        className={`py-5 font-poppins font-bold text-4xl transition-all duration-200 ${
                            isDarkMode ? 'text-white' : 'text-darkExpansion'
                        }`}
                    >
                        {translations[language]?.featuredArticle ||
                            'Featured Article'}
                    </h1>
                    <div className='h-[500px]'>
                        <FeaturedArticle
                            key={articles[0]._id}
                            article={articles[0]}
                        />
                    </div>
                </div>

                {/* Recent Articles */}
                <div className='flex-1 flex flex-col'>
                    <h1
                        className={`py-5 font-poppins font-bold text-xl mt-3 transition-all duration-200 ${
                            isDarkMode ? 'text-white' : 'text-darkExpansion'
                        }`}
                    >
                        {translations[language]?.recentArticles ||
                            'Recent Articles'}
                    </h1>
                    <div className='flex flex-col h-[500px] justify-between space-y-4'>
                        {articles.slice(1).map((article) => (
                            <ArticleListCard
                                key={article._id}
                                article={article}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
