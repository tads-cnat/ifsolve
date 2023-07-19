/** @type {import('tailwindcss').Config} */

const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                marck: ['Marck Script', 'ui-sans-serif'],
            },
            colors: {
                transparent: 'transparent',
                white: '#FFFFFF',
                'primary-100': '#26D189',
                'primary-80': '#51DAA1',
                'primary-60': '#7DE3B8',
                'primary-40': '#A8EDD0',
                'primary-20': '#D4F6E7',
                'primary-10': '#E9FAF3',
                'primary-5': '#F4FDF9',
                'dark-100': '#1F2423',
                'dark-80': '#4C504F',
                'dark-60': '#797B7B',
                'dark-40': '#A6A7A7',
                'dark-20': '#D2D3D3',
                'dark-10': '#E9E9E9',
                'dark-5': '#F4F4F4',
            },
        },
    },
    plugins: [],
});
