import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
};

const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        toggleArticleLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    }
});

export const {
    toggleArticleLoading
} = articleSlice.actions;

export default articleSlice.reducer;