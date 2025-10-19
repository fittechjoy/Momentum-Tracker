/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#4f46e5", // indigo-600
          accent: "#10b981",  // emerald-500
        },
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.20)",
      },
    },
  },
  plugins: [],
};
