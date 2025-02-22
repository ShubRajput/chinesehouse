export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B00',
        secondary: '#000000',
      },
      backgroundImage: {
        'orange-gradient': 'linear-gradient(to right, #FF6B00, #FF8C38)',
        'orange-gradient-hover': 'linear-gradient(to right, #FF8C38, #FF6B00)',
      },
      textColor: {
        'gradient-orange': '#FF6B00',
      }
    },
  },
  plugins: [],
}