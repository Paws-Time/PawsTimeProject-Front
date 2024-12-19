"use client";
import { theme } from "design-system/lib/theme";
import styled from "styled-components";
import React from "react";

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 510px;
  height: 40px;
  margin-bottom: 1rem;
  transition: border-color 0.3s ease;

  &:hover {
    border: double 1px;
    border-color: ${theme.colors.comp.input.focus};
  }

  input {
    flex: 1;
    padding: 12px;
    font-size: ${theme.fontSize.text.sm};
    color: ${theme.colors.ref.base.black};
    border: none;
    border-bottom: 1px solid ${theme.colors.ref.base.gray};
    outline: none;

    &:focus {
      border: inset 1px;
      border-color: ${theme.colors.comp.input.hover};
    }

    //여백을 미리 선정
    &[type="password"] {
      padding-right: 40px;
    }
  }

  .icon {
    position: absolute;
    right: 10px;
    cursor: pointer;
  }
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
}
export const InputField = ({ label, type }: InputProps) => {
  return (
    <InputWrapper>
      <input type={type} placeholder={label} />
      {type === "password" && <span className="icon"></span>}{" "}
      {/* 항상 눈동자 아이콘 표시 */}
    </InputWrapper>
  );
};
