import React from 'react';
import ArticleListCard from '../components/ArticleListCard';
import { useGetAllArticlesQuery } from '../slices/article/articleApiSlice';
import { useNavigate } from 'react-router-dom';

const ArticleListScreen = () => {
    const navigate = useNavigate();
    
    const {
        data: articles = [],
        isLoading,
        isError,
        error
    } = useGetAllArticlesQuery();

    if (isLoading) return <p>Loading articles...</p>;

    if (isError) {
        return (
            <section className="flex justify-center items-center mt-20">
                <div className="bg-red-100 text-red-800 p-6 rounded-2xl shadow-lg text-center max-w-md">
                    <h1 className="text-2xl font-bold">Error {error?.status || 'Unknown'}</h1>
                    <p className="mt-2">{error?.data?.message || 'Something went wrong'}</p>
                    <button 
                        className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        onClick={() => navigate('/')}
                    >
                        Go to Dashboard
                    </button>
                </div>
            </section>
        );
    }
    
    return (
        <div className='space-y-4 py-5'>
            {articles.map((article) => (
                <ArticleListCard key={article._id} article={article} />
            ))}
        </div>
    );
};

export default ArticleListScreen;
