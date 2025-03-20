import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    currentArticle: null,
};

const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        toggleArticleLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setCurrentArticle: (state, action) => {
            state.currentArticle = action.payload;
        },
        clearCurrentArticle: (state) => {
            state.currentArticle = null;
        }
    }
});

export const {
    toggleArticleLoading,
    setCurrentArticle,
    clearCurrentArticle,
} = articleSlice.actions;

export default articleSlice.reducer;