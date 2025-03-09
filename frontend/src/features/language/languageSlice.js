import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    language: localStorage.getItem("the-international-articles-language-select")
        ? JSON.parse(
              localStorage.getItem("the-international-articles-language-select")
          )
        : "English",
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLanguage: (state, action) => {
            const selectedLanguage = action.payload;
            state.language = selectedLanguage;
            localStorage.setItem("the-international-articles-language-select", JSON.stringify(selectedLanguage))
        }
    }
});

export const {
    changeLanguage,
} = languageSlice.actions;

export default languageSlice.reducer;