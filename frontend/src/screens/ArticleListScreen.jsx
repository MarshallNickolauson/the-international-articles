import React from 'react';
import ArticleListCard from '../components/ArticleListCard';
import { useGetAllArticlesQuery } from '../slices/article/articleApiSlice';

const ArticleListScreen = () => {
    const {
        data: articles = [],
        isLoading,
        isError,
    } = useGetAllArticlesQuery();

    if (isLoading) return <p>Loading articles...</p>;
    if (isError) return <p>Error fetching articles</p>;

    return (
        <div className='space-y-4 py-5'>
            {articles.map((article) => (
                <ArticleListCard key={article._id} article={article} />
            ))}
        </div>
    );
};

export default ArticleListScreen;
