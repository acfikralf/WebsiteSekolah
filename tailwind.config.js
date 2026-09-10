import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#064E3B',
                    50: '#EBF5F1',
                    100: '#D1E7DE',
                    200: '#A5D0BE',
                    300: '#70B39A',
                    400: '#3E9277',
                    500: '#1B745B',
                    600: '#0C5D47',
                    700: '#064E3B',
                    800: '#04382A',
                    900: '#02261D',
                },
                secondary: {
                    DEFAULT: '#047857',
                    50: '#EAF5F0',
                    100: '#D0EADF',
                    200: '#A4D5C1',
                    300: '#6FBB9D',
                    400: '#3B9D7B',
                    500: '#12805E',
                    600: '#047857',
                    700: '#035F45',
                    800: '#024534',
                    900: '#012C22',
                },
                accent: {
                    DEFAULT: '#F59E0B',
                    50: '#FFF8EB',
                    100: '#FEEFC7',
                    200: '#FCD985',
                    300: '#F9C24B',
                    400: '#F5A811',
                    500: '#F59E0B',
                    600: '#D98806',
                    700: '#B06A04',
                    800: '#8A4F02',
                    900: '#663B01',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Poppins', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [forms],
};