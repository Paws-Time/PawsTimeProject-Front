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
        "custom-sidew": "300px", //사이드바
        "custom-sideh": "1350px",
        "custom-buttonw": "500px",
        "custom-buttonh": "40px",
        "custom-boardw": "1480px", //보더
        "custom-boardh": "950px", //보더
        "custom-boardhw": "1480px", //보더안 헤더
        "custom-boardhh": "140px", //보더안 헤더
        "custom-width": "1800px", // 사용자 정의 너비
        "custom-height": "1350px", // 사용자 정의 높이
        "custom-headerw": "1480px", //전체 헤더
        "custom-headerh": "180px", //전체 헤더
      },
    },
  },
  plugins: [],
} satisfies Config;
