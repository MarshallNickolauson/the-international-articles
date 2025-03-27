import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isDarkMode: localStorage.getItem('the-international-articles-isDarkMode') ? JSON.parse(localStorage.getItem('the-international-articles-isDarkMode')) : false,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem('the-international-articles-isDarkMode', JSON.stringify(state.isDarkMode));
        },
    },
});

export const { toggleDarkMode } = themeSlice.actions;

export default themeSlice.reducer;
