import { referenceToken } from "./colors";

export const shadow = {
  primary: `0px 4px 6px ${referenceToken.base.black}`, // 기본 그림자 색
  hover: `0px 4px 6px ${referenceToken.primary.gray[100]}`, // hover 상태
  active: `0px 4px 6px ${referenceToken.primary.gray[200]}`, // active 상태
};
