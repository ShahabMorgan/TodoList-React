/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "2xl": {max: "1500px"},
        xl: {max: "1200px"},
        lg: {max: "979px"},
        md: {max: "767px"},
        sm: {max: "610px"},
        xs: {max: "550px"},
      },
      colors: {
        input: "var(--input-color)",
        button: "var(--button-color)",
        modal:"rgba(0,0,0,0.3)"
      },
      height: {
        form: "20.9rem",
        Header: "var(--section-size)",
      },
      borderRadius: {
        input: "0.5rem",
        checkBox: "0.2rem",
        Fotter: "30px",
      },
      spacing: {
        NavBar: "2.75rem",
        "main-heigth": "var(--main-heigth)",
        "360logoWeight": "11rem",
        "360logoHeight": "14.5rem",
        "Footer-Size": "var(--section-size)",
      },
      padding: {
        "section-space": "5.5rem",
        input: "0.8rem 1.6rem",
        button: "0.5rem",
      },
      width: {
        form: "30rem",
        button: "4.5rem",
      },
    },
  },
  plugins: [],
};
