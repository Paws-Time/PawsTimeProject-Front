"use client";
import { theme } from "design-system/lib/theme";
import { useState } from "react";
import styled from "styled-components";

// 상태 타입 정의
type CardState = "primary" | "hover" | "active";

const CardWrapper = styled.div<{ state: CardState }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 314px;
  height: 258px;
  margin-bottom: 18px;
  border-radius: 15px;
  background-color: ${theme.colors.comp.card.primary};
  box-shadow: ${theme.shadow.primary};
  transition: all 0.3s ease;
  cursor: pointer;

  /* 상태에 따른 동적 스타일링 */
  border: ${(props) =>
    props.state === "primary"
      ? "none"
      : props.state === "hover"
      ? `double 1px ${theme.colors.comp.card.hover}`
      : `inset 3px ${theme.colors.comp.card.active}`};

  box-shadow: ${(props) =>
    props.state === "hover"
      ? `${theme.shadow.hover}`
      : props.state === "active"
      ? "inset 0 0 10px rgba(0, 0, 0, 0.2)"
      : `${theme.shadow.primary}`};

  .call-menu {
    font-size: ${theme.fontSize.text.xl};
    color: ${theme.colors.ref.base.black};
    margin-top: 8px;
    margin-right: 20px;
    text-align: right;
    align-self: flex-end;
  }

  .title {
    font-size: ${theme.fontSize.text.sm};
    color: ${theme.colors.ref.base.black};
    margin-top: 2px;
    margin-left: 20px;
    margin-bottom: 3px;
    text-align: left;
    align-self: flex-start;
  }

  .image-field {
    margin: 0 15px;
    width: 281px;
    height: 140px;
    margin-left: 20px;
    border-radius: 15px;
    background-color: ${theme.colors.ref.base.white};
    overflow: hidden;
  }

  .description {
    display: flex;
    font-size: ${theme.fontSize.text.xs};
    height: 16px;
    margin-left: 20px;
    margin-top: 8px;
    text-align: left;
    color: ${theme.colors.ref.base.black};
  }

  .foot {
    display: flex;
    width: 314px;
    height: 16px;
    margin-top: 10px;
    font-size: ${theme.fontSize.text.xs};
    .reviews {
      display: flex;
      width: 100px;
      height: 16px;
      margin-left: 100px;
      margin-right: 15px;
      color: ${theme.colors.ref.base.black};
    }
    .like {
      display: flex;
      width: 90px;
      height: 16px;
      margin-right: 18px;
      color: ${theme.colors.ref.base.black};
    }
  }
`;

export const Card = () => {
  const [state, setState] = useState<CardState>("primary");

  return (
    <CardWrapper
      state={state}
      onMouseEnter={() => setState("hover")} // 마우스 오버 상태
      onMouseLeave={() => setState("primary")} // 마우스가 떠날 때 초기화
      onClick={() => setState("active")} // 클릭 상태
    >
      <div className="call-menu">...</div>
      <div className="title">Title: 제목이 들어갑니다.</div>
      <div className="image-field">
        <img
          src="/logo.png"
          alt="Example"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="description">간략 소개.</div>
      <div className="foot">
        <span className="reviews"> 💬 15 reviews</span>
        <span className="like"> 👍 15 likes</span>
      </div>
    </CardWrapper>
  );
};
