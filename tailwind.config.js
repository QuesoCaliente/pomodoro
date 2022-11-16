/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#F87070",
          blue: "#70F3F8",
          purple: "#D881F8",
          gray: {
            100: "#FFFFFF",
            200: "#D7E0FF",
            300: "#EFF1FA",
          },
          bg: {
            100: "#1E213F",
            200: "#161932",
          }


        }
      },
      fontFamily: {
        kumbh: ["'Kumbh Sans'", "sans-serif"],
        roboslab: ["'Roboto Slab'", "serif"],
        spacemono: ["'Space Mono'", "monospace"],

      }
    },
  },
  plugins: [],
}
