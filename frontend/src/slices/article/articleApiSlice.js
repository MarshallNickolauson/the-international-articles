import { apiSlice } from '../apiSlice';
const ARTICLE_URL = '/api/articles';

export const articleApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllArticles: builder.query({
            query: (data) => ({
                url: `${ARTICLE_URL}`,
                method: 'GET',
            }),
            providesTags: ['Articles']
        }),
    }),
});

export const {
    useGetAllArticlesQuery,
} = articleApiSlice;