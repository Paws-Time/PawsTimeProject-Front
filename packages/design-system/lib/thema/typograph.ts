type FontSizeOnly = {
  [key: string]: string; // key-value 형태로 fontSize만 정의
};

export const fontSize: Record<"display" | "text", FontSizeOnly> = {
  display: {
    "2xl": "4.5rem",
    xl: "3.75rem",
    lg: "3rem",
    md: "2.25rem",
    sm: "1.875rem",
    xs: "1.5rem",
  },
  text: {
    xl: "1.125rem",
    lg: "1.125rem",
    md: "1rem",
    sm: "0.875rem",
    xs: "0.75rem",
  },
};
