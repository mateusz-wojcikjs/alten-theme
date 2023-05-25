/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    container: {
      center: true,
      padding: "1rem"
    },
    extend: {
      colors: {
        white: "#fff",
        gray: {
          shadow: "#F9F9F9",
          base: "#F4F4F5",
          dark: "#A3A3A3",
          steel: "#505D68"
        },
        black: "#1d1d1d",
        blue: {
          base: "#0080CA",
          main: "#043962"
        }
      },
      boxShadow: {
        decorative: "0px 2px 2px -1px rgba(255,255,255, .1)",
        accordion: "0px 2px 2px -1px rgba(0,0,0, .1)"
      },
      spacing: {
        15: "4rem"
      },
      padding: {
        30: "7.5rem"
      },
      fontSize: {
        lead: "2rem",
        xxs: ".625rem"
      }
    }
  },
  plugins: []
};
