/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  presets: [require("@relume_io/relume-tailwind")],
  plugins: [
    function({addUtilities}) {
      const newUtilities = {
        ".scollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "#00fff9 #b9a1e4",
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'red',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'blue',
          borderRadius: '1rem',
          border: '3px solid orange'
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}
