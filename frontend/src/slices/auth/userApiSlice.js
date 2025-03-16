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
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
} = usersApiSlice;