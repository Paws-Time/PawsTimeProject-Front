import React from "react";
import styled, { css } from "styled-components";
import { theme } from "design-system/lib/theme";

type ButtonState = "primary" | "hover" | "active" | "disabled";

type Props = {
  state?: ButtonState;
  label: string;
  onClick?: () => void;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const StyledButton = styled.button<{ state: ButtonState }>`
  //기본 설정.
  display: inline-block;
  padding: 12px, 24px;
  border: none;
  border-radius: 5px;
  font-size: ${theme.fontSize.text.md};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  //상태에 따른 shadow와 color 변경 설정
  ${({ state }) => {
    const shadow =
      state === "disabled" ? theme.shadow.primary : theme.shadow[state];
    return css`
      background-color: ${theme.colors.comp.button[state]}; //배경색상
      box-shadow: ${shadow};
      color: ${theme.colors.ref.base.white}; //글자색상
      cursor: ${state === "disabled" ? "not-allowed" : "pointer"};
    `;
  }}
`;

export const button = (props: Props) => {
  const { state = "primary", label, ...rest } = props;
  return (
    <StyledButton state={state} {...rest}>
      {label}
    </StyledButton>
  );
};
