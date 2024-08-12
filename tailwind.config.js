module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./renderer/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "rm-blue-100": "#367CF4",
        "rm-blue-200": "#367cc8",
      },
    },
  },
  plugins: [],
};
