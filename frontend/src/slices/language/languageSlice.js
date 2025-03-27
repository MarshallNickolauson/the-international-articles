import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    language: localStorage.getItem('the-international-articles-language-select') ? JSON.parse(localStorage.getItem('the-international-articles-language-select')) : 'en',
    secondaryLanguage: 'Dual Language',
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLanguage: (state, action) => {
            state.language = action.payload;
            localStorage.setItem('the-international-articles-language-select', JSON.stringify(action.payload));
        },
        changeSecondaryLanguage: (state, action) => {
            state.secondaryLanguage = action.payload;
        },
    },
});

export const { changeLanguage, changeSecondaryLanguage } = languageSlice.actions;

export default languageSlice.reducer;
