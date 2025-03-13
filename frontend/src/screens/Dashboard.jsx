import { useSelector } from 'react-redux';
import FeaturedArticle from '../components/FeaturedArticle';
import ArticleListCard from '../components/ArticleListCard';
import { useGet5RecentArticlesQuery } from '../slices/article/articleApiSlice';
import FeaturedCardLoader from '../components/loaders/FeaturedCardLoader';
import RecentCardLoader from '../components/loaders/RecentCardLoader';

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
                            <FeaturedCardLoader />
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
                                <RecentCardLoader
                                    key={index}
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
