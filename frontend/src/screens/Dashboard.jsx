import { useSelector } from "react-redux";
import { useEffect } from "react";
import FeaturedArticle from "../components/FeaturedArticle";
import ArticleListCard from "../components/ArticleListCard";
import FeaturedCardLoader from "../components/loaders/FeaturedCardLoader";
import RecentCardLoader from "../components/loaders/RecentCardLoader";
import {
    useGet3BusinessArticlesQuery,
    useGet3IdentityArticlesQuery,
    useGet3MentalArticlesQuery,
    useGet5RecentArticlesQuery,
} from "../slices/article/articleApiSlice";
import { TRANSLATIONS } from "../constants";

const Dashboard = () => {
    const language = useSelector((state) => state.language.language);
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const translations = TRANSLATIONS[language] || TRANSLATIONS.en;

    const {
        data: recentArticles = [],
        isLoading: isRecentLoading,
        isError: isRecentError,
        error: recentError,
        refetch: refetchRecent,
        isFetching: isRecentFetching,
    } = useGet5RecentArticlesQuery(undefined, { refetchOnMountOrArgChange: true });

    const {
        data: mentalArticles = [],
        isLoading: isMentalLoading,
        isError: isMentalError,
        error: mentalError,
        refetch: refetchMental,
        isFetching: isMentalFetching,
    } = useGet3MentalArticlesQuery(undefined, { refetchOnMountOrArgChange: true });

    const {
        data: businessArticles = [],
        isLoading: isBusinessLoading,
        isError: isBusinessError,
        error: businessError,
        refetch: refetchBusiness,
        isFetching: isBusinessFetching,
    } = useGet3BusinessArticlesQuery(undefined, { refetchOnMountOrArgChange: true });

    const {
        data: identityArticles = [],
        isLoading: isIdentityLoading,
        isError: isIdentityError,
        error: identityError,
        refetch: refetchIdentity,
        isFetching: isIdentityFetching,
    } = useGet3IdentityArticlesQuery(undefined, { refetchOnMountOrArgChange: true });

    useEffect(() => {
        refetchRecent();
        refetchMental();
        refetchBusiness();
        refetchIdentity();
    }, [refetchRecent, refetchMental, refetchBusiness, refetchIdentity]);

    const isLoading =
        isRecentLoading || isRecentFetching ||
        isMentalLoading || isMentalFetching ||
        isBusinessLoading || isBusinessFetching ||
        isIdentityLoading || isIdentityFetching;

    const hasError = isRecentError || isMentalError || isBusinessError || isIdentityError;
    const errorMessage = recentError?.data?.message || "Something went wrong";

    if (isLoading) {
        return (
            <section className="space-y-10">
                {/* Featured + Recent */}
                <div className="flex space-x-6">
                    <div className="flex-1">
                        <h1 className={`py-5 font-poppins font-bold text-4xl ${isDarkMode ? "text-white" : "text-darkExpansion"}`}>
                            {translations.featuredArticle || "Featured Article"}
                        </h1>
                        <FeaturedCardLoader />
                    </div>
                    <div className="flex-1">
                        <h1 className={`py-5 font-poppins font-bold text-xl ${isDarkMode ? "text-white" : "text-darkExpansion"}`}>
                            {translations.recentArticles || "Recent Articles"}
                        </h1>
                        <div className="space-y-4">
                            {Array.from({ length: 4 }).map((_, i) => <RecentCardLoader key={i} />)}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (hasError) {
        return (
            <section className="flex justify-center items-center mt-20">
                <div className="bg-red-100 text-red-800 p-6 rounded-2xl shadow-lg text-center max-w-md">
                    <h1 className="text-2xl font-bold">Error</h1>
                    <p className="mt-2">{errorMessage}</p>
                    <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg" onClick={() => window.location.reload()}>
                        {translations.goToDashboard || "Go to Dashboard"}
                    </button>
                </div>
            </section>
        );
    }

    return (
        <>
            {/* Featured & Recent */}
            <section className="flex space-x-6 mb-8">
                <div className="flex-1">
                    <h1 className={`py-5 font-poppins font-bold text-4xl ${isDarkMode ? "text-white" : "text-darkExpansion"}`}>
                        {translations.featuredArticle || "Featured Article"}
                    </h1>
                    {recentArticles.length > 0 ? (
                        <FeaturedArticle article={recentArticles[0]} />
                    ) : (
                        <p className="text-gray-500">No articles available</p>
                    )}
                </div>

                <div className="flex-1">
                    <h1 className={`py-5 font-poppins font-bold text-xl ${isDarkMode ? "text-white" : "text-darkExpansion"}`}>
                        {translations.recentArticles || "Recent Articles"}
                    </h1>
                    <div className="space-y-6">
                        {recentArticles.slice(1).map((article) => (
                            <ArticleListCard key={article._id} article={article} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Mental Health */}
            <section className="mb-8">
                <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? "text-white" : "text-darkExpansion"}`}>
                    {translations.mentalHealth || "Mental Health"}
                </h2>
                <div className="space-y-4">
                    {mentalArticles.map((article) => (
                        <ArticleListCard key={article._id} article={article} />
                    ))}
                </div>
            </section>

            {/* Business */}
            <section className="mb-8">
                <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? "text-white" : "text-darkExpansion"}`}>
                    {translations.business || "Business"}
                </h2>
                <div className="space-y-4">
                    {businessArticles.map((article) => (
                        <ArticleListCard key={article._id} article={article} />
                    ))}
                </div>
            </section>

            {/* Identity */}
            <section className="mb-8">
                <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? "text-white" : "text-darkExpansion"}`}>
                    {translations.identity || "Identity"}
                </h2>
                <div className="space-y-4">
                    {identityArticles.map((article) => (
                        <ArticleListCard key={article._id} article={article} />
                    ))}
                </div>
            </section>
        </>
    );
};

export default Dashboard;
