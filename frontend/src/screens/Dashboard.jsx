import FeaturedArticle from "../components/FeaturedArticle";
import RecentArticle from "../components/RecentArticle";

const Dashboard = () => {
    return (
        <section>
            <div className="flex space-x-6">
                {/* Featured Article (Left) */}
                <div className="flex-1 flex flex-col">
                    <h1 className="py-5 font-poppins font-bold text-4xl">
                        Featured Article
                    </h1>
                    <div className="h-[500px]">
                        <FeaturedArticle />
                    </div>
                </div>

                {/* Recent Articles (Right) */}
                <div className="flex-1 flex flex-col">
                    <h1 className="py-5 font-poppins font-bold text-xl mt-3">
                        Recent Articles
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
