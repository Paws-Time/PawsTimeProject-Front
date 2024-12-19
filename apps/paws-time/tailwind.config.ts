import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      spacing: {
        // 높이 및 너비를 위한 사용자 정의 크기
        "custom-sidew": "300px",
        "custom-sideh": "800px",
        "custom-buttonw": "500px",
        "custom-buttonh": "40px",
        "custom-boardw": "1670px",
        "custom-boardh": "1170px",
        "custom-width": "1480px", // 사용자 정의 너비
        "custom-height": "977px", // 사용자 정의 높이
      },
    },
  },
  plugins: [],
} satisfies Config;
