/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        Prueba: {
        
          "primary": "#00b6b8",
          
          "secondary": "#00a6ce",
                   
          "accent": "#4fdcb9",
                   
          "neutral": "#ffffff",
                   
          "base-100": "#f4f9f9",
                   
          "info": "#84cbe7",
                   
          "success": "#23a96f",
                   
          "warning": "#bf9a08",
                   
          "error": "#dc2626",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

