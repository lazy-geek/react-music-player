module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      colors: {
        'neutral': '#858199',
        'custom-grey': '#F3F0F7',
        'secondary': '#7E1BCC'
      },
      boxShadow : {
        'card': '0 2px 5px rgba(133,129,153,0.25),0 1px 0 #E3E3E3,0 0 1px rgba(133,129,153,.1)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
