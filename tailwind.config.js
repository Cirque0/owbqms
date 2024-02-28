import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                montserrat: ['Montserrat'],
            },
            colors: {
                maroon: '#880000',
            }
        },
    },

    plugins: [require('daisyui')],

    daisyui: {
        themes: [
            {
                puptheme: {
                    "primary": "#880000",
                    "secondary": "#fde047",
                    "accent": "#22d3ee",
                    "neutral": "#374151",
                    "base-100": "#ffffff",
                    "info": "#2563eb",
                    "success": "#4ade80",
                    "warning": "#fde047",
                    "error": "#ef4444",
                },
            },
            'bumblebee',
        ]
    }
};
