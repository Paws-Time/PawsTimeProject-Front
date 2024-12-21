"use client";
import { theme } from "design-system/lib/theme";
import styled from "styled-components";
import { useState } from "react";

// 상태 타입 정의
type CardState = "primary" | "hover" | "active";

type CardProps = {
  title: string;
  description: string;
  imageUrl: string;
  reviews: number;
  likes: number;
};

const CardWrapper = styled.div<{ $state: CardState }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  height: 270px;
  margin-bottom: 18px;
  border-radius: 15px;
  background-color: ${theme.colors.comp.card.primary};
  box-shadow: ${theme.shadow.primary};
  transition: all 0.3s ease;
  cursor: pointer;

  border: ${(props) =>
    props.$state === "primary"
      ? "none"
      : props.$state === "hover"
      ? `double 1px ${theme.colors.comp.card.hover}`
      : `inset 3px ${theme.colors.comp.card.active}`};

  box-shadow: ${(props) =>
    props.$state === "hover"
      ? `${theme.shadow.hover}`
      : props.$state === "active"
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
    width: 330px;
    height: 140px;
    margin-left: 20px;
    border-radius: 15px;
    background-color: ${theme.colors.ref.base.white};
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
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
    width: 100%;
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

export function Card({
  title,
  description,
  imageUrl,
  reviews,
  likes,
}: CardProps) {
  const [state, setState] = useState<CardState>("primary");

  // 기본 이미지 설정
  const defaultImage = "/logo.png";
  const finalImageUrl = imageUrl || defaultImage;

  return (
    <CardWrapper
      $state={state}
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("primary")}
      onClick={() => setState("active")}
    >
      <div className="call-menu">...</div>
      <div className="title">{title}</div>
      <div className="image-field">
        <img src={finalImageUrl} alt={title} />
      </div>
      <div className="description">{description}</div>
      <div className="foot">
        <span className="reviews">💬 {reviews} reviews</span>
        <span className="like">👍 {likes} likes</span>
      </div>
    </CardWrapper>
  );
}
