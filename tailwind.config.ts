import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF4D8D', // Pink color from the image
        secondary: '#4FB8B0', // Teal color from the progress bars
        background: '#FFFFFF',
        text: '#333333',
      },
    },
  },
  plugins: [],
}

export default config;
