/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },

      colors: {
        primary:'#E62E05',
        login_bg:'#E04F16',
        text_color:'#667085',
        header_bg:'#FFF4ED'
      }
    },
  },
  plugins: [],
};
