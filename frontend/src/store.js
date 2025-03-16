import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";
import languageReducer from "./slices/language/languageSlice.js";
import themeReducer from "./slices/theme/themeSlice.js";
import articleReducer from "./slices/article/articleSlice.js";
import authReducer from './slices/auth/authSlice.js';

const store = configureStore({
    reducer: {
        language: languageReducer,
        theme: themeReducer,
        article: articleReducer,
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;
