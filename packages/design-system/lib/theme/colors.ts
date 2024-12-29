export const referenceToken = {
  base: {
    white: "#FFFFFF",
    gray: "#C4C4C4",
    black: "#000000",
  },

  primary: {
    green: {
      100: "#51C8BC", //로그인, 회원가입, 등 기본색
      200: "#3BADCD", //버튼에 사용될 청록색
      300: "#248EAC",
      400: "#113E1D", //sidebar에 사용될 어두운색
    },
    gray: {
      100: "#E5E5E5", //사이드바 자리 사용될 밝은회색
      200: "#C4C4C4", //헤더에 사용될 좀더 어두운회색
      300: "#D9D9D9", //모달에 사용될 중간회색
      400: "#939393", //로그인 버튼에 사용될 많이 어두운회색
    },
  },
};

export const systemToken = {
  background: {
    primary: referenceToken.base.white,
    secondary: referenceToken.primary.green[100],
    boarder: referenceToken.primary.gray[100],
    shadow: referenceToken.primary.green[200],
  },
};

export const componentToken = {
  button: {
    primary: referenceToken.primary.gray[100],
    hover: referenceToken.primary.green[200],
    active: referenceToken.primary.green[300],
    disabled: referenceToken.primary.green[100],
  },
  input: {
    primary: referenceToken.base.white,
    hover: referenceToken.primary.gray[100],
    focus: referenceToken.primary.gray[100],
    active: referenceToken.primary.gray[200],
    disable: referenceToken.base.white,
  },
  card: {
    primary: referenceToken.base.white,
    hover: referenceToken.primary.gray[100],
    active: referenceToken.primary.gray[200],
    disable: referenceToken.base.white,
  },
};
