import FeaturedArticle from "../components/FeaturedArticle";

const Dashboard = () => {
    return (
        <section>
            <div className="flex space-x-6">
                <div className="flex-1">
                    <h1 className="py-5 font-poppins font-bold text-4xl">
                        Featured Article
                    </h1>
                    <FeaturedArticle />
                </div>
                <div className="flex-1"></div>
            </div>
        </section>
    );
};

export default Dashboard;
