/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                mainGreen: '#2C9F46',
                mainBlack: '#2C2E35',
                mainWhite: '#FFFFFF',

                lightGreen: '#52BC4A',
                darkGreen: '#236831',
                creamExpansion: '#E6F3DB',
                darkExpansion: '#201D1F',
                mainBlue: '#2256AD',
                mainRed: '#CD281A',
                mainOrange: '#FF611F',
                mainTan: '#FBEFCB',
                mainYellow: '#FFD639',

                _252825: '#252825',
                _303030: '#303030',
            },
            fontFamily: {
                roboto: ['Roboto', 'sans-serif'],
                ropa: ['Ropa Sans', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
                opensans: ['Open Sans', 'sans-serif'],
            },
            animation: {
                fadeInSlideUp: 'fadeInSlideUp 0.5s ease-out',
                fadeInSlideLeft: 'fadeInSlideLeft 0.5s ease-out',
                fadeIn: 'fadeIn 0.5s ease-out'
            },
            keyframes: {
                fadeInSlideUp: {
                    '0%': { opacity: '0', transform: 'translateY(50px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInSlideLeft: {
                    '0%': { opacity: '0', transform: 'translateX(100px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
        },
    },
    plugins: [],
};
