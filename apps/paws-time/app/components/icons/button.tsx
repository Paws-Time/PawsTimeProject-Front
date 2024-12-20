"use client";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { theme } from "design-system/lib/theme";

type ButtonState = "primary" | "hover" | "active" | "disabled";
type SizeType = "mini" | "short" | "normal" | "long";

type Props = {
  state?: ButtonState;
  label: string;
  sizetype?: SizeType; // 버튼 크기 타입
  onClick?: () => void;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const StyledButton = styled.button<{
  state: ButtonState;
  sizetype: SizeType;
}>`
  // 기본 설정
  display: inline-block;
  border: none;
  border-radius: 5px;
  font-size: ${theme.fontSize.text.md};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  // 상태에 따른 shadow와 color 변경
  ${({ state }) => {
    const shadow =
      state === "disabled" ? theme.shadow.primary : theme.shadow[state];
    return css`
      background-color: ${theme.colors.comp.button[state]}; // 배경색상
      box-shadow: ${shadow};
      color: ${theme.colors.ref.base.black}; // 글자색상
      cursor: ${state === "disabled" ? "not-allowed" : "pointer"};
    `;
  }}

  // 타입에 따른 크기 설정
  ${({ sizetype }) => {
    const sizeStyles = {
      mini: css`
        width: 30px;
        height: 30px;
      `,
      short: css`
        width: 50px;
        height: 40px;
      `,
      normal: css`
        width: 120px;
        height: 45px;
      `,
      long: css`
        width: 510px;
        height: 50px;
      `,
    };
    return sizeStyles[sizetype];
  }}
`;

export const CustomButton = (props: Props) => {
  const {
    label,
    onClick,
    sizetype = "normal",
    state = "primary",
    ...rest
  } = props; // 기본값 설정
  const [currentState, setCurrentState] = useState<ButtonState>(state);

  return (
    <StyledButton
      state={currentState}
      sizetype={sizetype}
      onClick={onClick}
      onMouseEnter={() => setCurrentState("hover")} // 마우스 오버
      onMouseLeave={() => setCurrentState("primary")} // 마우스 벗어남
      onMouseDown={() => setCurrentState("active")} // 클릭
      onMouseUp={() => setCurrentState("hover")} // 클릭 해제
      {...rest}
    >
      {label}
    </StyledButton>
  );
};
