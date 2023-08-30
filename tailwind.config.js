module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            sans: ["Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        },
        extend: {
            width: {
                450: "28.125rem",
                600: "37.5rem",
                680: "42.5rem",
                1140: "71.2rem",
                768: "48rem",
            },
            spacing: {
                30: "7.5rem",
                40: "10rem",
                60: "15rem",
                80: "5rem",
                90: "25rem",
            },
        },
        colors: {
            white: "#ffffff",
            // red scale
            "primary-1": "#991b1b",
            "primary-2": "#b91c1c",
            "primary-3": "#dc2626",
            "primary-4": "#ef4444",
            // green scale
            "success-1": "#16a34a",
            "success-2": "#22c55e",
            "success-3": "#4ade80",
            "success-4": "#86efac",
            "success-5": "#bbf7d0",
            // yellow scale
            "warning-1": "#facc15",
            // gray scale
            "default-1": "#374151",
            "default-2": "#4b5563",
            "default-3": "#6b7280",
            "default-4": "#9ca3af",
            "default-5": "#cbd5e1",
            "default-6": "#e5e7eb",
            "default-7": "#f3f4f6",
            // cyan
            "info-1": "#155e75",
            "info-2": "#0891b2",
            "info-3": "#06b6d4",
            "info-4": "#22d3ee",
            "info-5": "#67e8f9",
            //slate
            "slate-1": "#0f172a",
            "slate-2": "#1e293b",
            "slate-3": "#334155",
            "slate-4": "#64748b",
            "slate-5": "#94a3b8",
            //cemtrik scale
            "cemtrik-default-3": "#2c2f36",
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
        // require('@tailwindcss/typography'),
    ],
};
