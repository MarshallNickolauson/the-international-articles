import {apiSlice} from '../apiSlice.js';
import { USERS_URL } from '../../constants.js';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
        }),
        logout: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
                credentials: 'include',
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data,
                credentials: 'include',
            })
        }),
        update: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
                credentials: 'include',
            })
        }),
        toggleFavoriteArticle: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/favorite`,
                method: 'PUT',
                body: data,
                credentials: 'include',
            })
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useUpdateMutation,
    useToggleFavoriteArticleMutation,
} = usersApiSlice;