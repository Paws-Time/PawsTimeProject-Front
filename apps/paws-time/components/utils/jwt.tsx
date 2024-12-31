export const decodeJWT = (token: string): any => {
  if (!token) return null;

  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    console.error("JWT 디코딩 중 오류:", error);
    return null;
  }
};
