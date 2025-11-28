/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // THÊM DÒNG NÀY hoặc đổi từ 'media' thành 'class'
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}