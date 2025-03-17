import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetArticleByIdQuery } from '../slices/article/articleApiSlice';

const EditArticleScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const language = useSelector((state) => state.language.language);

    const { id } = useParams();

    const {
            data: article,
            isLoading,
            isError,
            error,
        } = useGetArticleByIdQuery(id);

    const [englishTitle, setEnglishTitle] = useState('');
    const [englishDate, setEnglishDate] = useState('');
    const [englishContent, setEnglishContent] = useState('');

    useEffect(() => {
        if (article) {
            setEnglishTitle(article.languages.en.title);
            setEnglishDate(article.languages.en.date);
            setEnglishContent(article.languages.en.content);
        }
    }, [article]);

  return (
    <div>
      
    </div>
  )
}

export default EditArticleScreen
