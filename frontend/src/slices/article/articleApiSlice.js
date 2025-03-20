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
        getAllUserArticles: builder.query({
            query: (data) => ({
                url: `${ARTICLE_URL}/me`,
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Article'],
        }),
        get5RecentArticles: builder.query({
            query: (data) => ({
                url: `${ARTICLE_URL}/recent`,
                method: 'GET',
            }),
            providesTags: ['Article'],
        }),
        getArticleById: builder.query({
            query: (id) => ({
                url: `${ARTICLE_URL}/${id}`,
                method: 'GET',
            }),
            providesTags: ['Article'],
        }),
        searchArticle: builder.query({
            query: ({ searchQuery, language }) => ({
                url: `${ARTICLE_URL}/search?query=${encodeURIComponent(searchQuery)}&language=${language}`,
                method: 'GET',
            }),
            providesTags: ['Article'],
        }),
        createArticle: builder.mutation({
            query: (data) => ({
                url: `${ARTICLE_URL}`,
                method: 'POST',
                credentials: 'include',
            }),
        }),
        updateArticle: builder.mutation({
            query: (data) => ({
                url: `${ARTICLE_URL}/${data.id}`,
                method: 'PUT',
                credentials: 'include',
                body: data,
            }),
        }),
        toggleArticlePublished: builder.mutation({
            query: (data) => ({
                url: `${ARTICLE_URL}/${data.id}/toggle-published`,
                method: 'PUT',
                credentials: 'include',
            }),
        }),
        deleteArticle: builder.mutation({
            query: (data) => ({
                url: `${ARTICLE_URL}/${data.id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
        }),
    }),
});

export const {
    useGetAllArticlesQuery,
    useGetAllUserArticlesQuery,
    useGet5RecentArticlesQuery,
    useGetArticleByIdQuery,
    useLazySearchArticleQuery,
    useCreateArticleMutation,
    useUpdateArticleMutation,
    useToggleArticlePublishedMutation,
    useDeleteArticleMutation,
} = articleApiSlice;
