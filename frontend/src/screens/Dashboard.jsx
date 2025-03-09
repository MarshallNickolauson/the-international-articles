import { useSelector } from "react-redux";
import FeaturedArticle from "../components/FeaturedArticle";
import RecentArticle from "../components/RecentArticle";

const Dashboard = () => {

    const language = useSelector((state) => state.language.language);

    const translations = {
        English: {
            featuredArticle: "Featured Article",
            recentArticles: "Recent Articles",
        },
        Español: {
            featuredArticle: "Artículo Destacado",
            recentArticles: "Artículos Recientes",
        },
        Français: {
            featuredArticle: "Article en Vedette",
            recentArticles: "Articles Récents",
        },
        Deutsch: {
            featuredArticle: "Empfohlener Artikel",
            recentArticles: "Neueste Artikel",
        },
        Português: {
            featuredArticle: "Artigo em Destaque",
            recentArticles: "Artigos Recentes",
        },
    };

    return (
        <section>
            <div className="flex space-x-6">
                {/* Featured Article */}
                <div className="flex-1 flex flex-col">
                    <h1 className="py-5 font-poppins font-bold text-4xl">
                        {translations[language]?.featuredArticle || "Featured Article"}
                    </h1>
                    <div className="h-[500px]">
                        <FeaturedArticle />
                    </div>
                </div>

                {/* Recent Articles */}
                <div className="flex-1 flex flex-col">
                    <h1 className="py-5 font-poppins font-bold text-xl mt-3">
                        {translations[language]?.recentArticles || "Recent Articles"}
                    </h1>
                    <div className="flex flex-col h-[500px] justify-between space-y-4">
                        <RecentArticle />
                        <RecentArticle />
                        <RecentArticle />
                        <RecentArticle />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
