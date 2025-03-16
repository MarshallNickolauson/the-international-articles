import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('the-international-articles-userInfo')
        ? JSON.parse(
              localStorage.getItem('the-international-articles-userInfo')
          )
        : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem(
                'the-international-articles-userInfo',
                JSON.stringify(action.payload)
            );
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('the-international-articles-userInfo');
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;