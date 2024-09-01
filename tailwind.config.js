/** @type {import('tailwindcss').Config} */
module.exports = {
  // corePlugins: {
  //   preflight: false, // Disable the use of preflight which includes base styles
  // },
  content: ['./src/*.js'],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

