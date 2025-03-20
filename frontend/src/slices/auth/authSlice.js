import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('the-international-articles-userInfo') ? JSON.parse(localStorage.getItem('the-international-articles-userInfo')) : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('the-international-articles-userInfo', JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('the-international-articles-userInfo');
        },
        toggleFavorite: (state, action) => {
            if (state.userInfo) {
                const articleId = action.payload;

                const isAlreadyFavorite = state.userInfo.favorites.some((fav) => fav.articleId === articleId);

                if (isAlreadyFavorite) {
                    state.userInfo.favorites = state.userInfo.favorites.filter((fav) => fav.articleId !== articleId);
                } else {
                    state.userInfo.favorites.push({ articleId });
                }

                localStorage.setItem('the-international-articles-userInfo', JSON.stringify(state.userInfo));
            }
        },
    },
});

export const { setCredentials, logout, toggleFavorite } = authSlice.actions;

export default authSlice.reducer;
