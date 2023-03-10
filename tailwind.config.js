/** @type {import('tailwindcss').Config} */
module.exports = {
  resolve:{
    fallback:{
        "crypto": require.resolve("crypto-browserify")

    }
},
  content: ["./src/**/*.{html,js}",
],
  theme: {
    extend: {},
  },
  plugins: [],
}
