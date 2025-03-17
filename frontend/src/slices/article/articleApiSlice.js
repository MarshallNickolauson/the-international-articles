import { apiSlice } from '../apiSlice';
import { ARTICLE_URL } from '../../constants';

export const articleApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllArticles: builder.query({
            query: (data) => ({
                url: `${ARTICLE_URL}`,
                method: 'GET',
            }),
            providesTags: ['Article'],
        }),
        get5RecentArticles: builder.query({
            query: (data) => ({
                url: `${ARTICLE_URL}/recent`,
                method: 'GET'
            }),
            providesTags: ['Article'],
        }),
        getArticleById: builder.query({
            query: (id) => ({
                url: `${ARTICLE_URL}/${id}`,
                method: 'GET'
            }),
            providesTags: ['Article'],
        }),
        createArticle: builder.mutation({
            query: (data) => ({
                url: `${ARTICLE_URL}`,
                method: 'POST',
                credentials: 'include'
            }),
        }),
    }),
});

export const {
    useGetAllArticlesQuery,
    useGet5RecentArticlesQuery,
    useGetArticleByIdQuery,
    useCreateArticleMutation,
} = articleApiSlice;