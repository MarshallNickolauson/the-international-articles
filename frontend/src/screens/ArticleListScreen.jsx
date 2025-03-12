import React from 'react'
import ArticleListCard from '../components/ArticleListCard'

const ArticleListScreen = () => {
  return (
    <div className='space-y-4 py-5'>
        <ArticleListCard />
        <ArticleListCard />
        <ArticleListCard />
    </div>
  )
}

export default ArticleListScreen