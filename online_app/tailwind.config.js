/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                glass: "rgba(255, 255, 255, 0.05)",
                glassBorder: "rgba(255, 255, 255, 0.1)",
                neonBlue: "#00f3ff",
                neonPurple: "#bc13fe",
                neonGreen: "#0afff0",
                darkBg: "#0f0f13",
                cardBg: "#1a1a23"
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-glow': 'conic-gradient(from 90deg at 50% 50%, #00000000 50%, #00f3ff11 100%)',
            }
        },
    },
    plugins: [],
}
