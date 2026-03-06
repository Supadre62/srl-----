var config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './lib/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './index.html',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
                serif: ['"Source Serif 4"', 'serif'],
            },
            colors: {
                brand: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                },
            },
            boxShadow: {
                panel: '0 16px 40px rgba(15, 23, 42, 0.08)',
            },
        },
    },
    plugins: [],
};
export default config;
