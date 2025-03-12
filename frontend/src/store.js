import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";
import languageReducer from "./features/language/languageSlice.js";
import themeReducer from "./features/theme/themeSlice.js";

const store = configureStore({
    reducer: {
        language: languageReducer,
        theme: themeReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;
