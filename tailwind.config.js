module.exports = {
  darkMode: "class", // Enables dark mode using a 'class' strategy
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Correct path to include all JS, JSX, TS, and TSX files
    "./public/index.html",         // Include the HTML file(s) in your project
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};