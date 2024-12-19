"use client";
import { theme } from "design-system/lib/theme";
import styled from "styled-components";

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 314px;
  height: 258px;
  margin-bottom: 18px;
  border-radius: 15px;
  background-color: ${theme.colors.comp.card.primary.background};
  box-shadow: ${theme.shadow.primary};
  transition: border-color 0.3s ease;

  &:hover {
    border: double 1px ${theme.colors.comp.card.hover};
    box-shadow: ${theme.shadow.hover};
  }

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
    margin-top: 6px;
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
  return (
    <CardWrapper>
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
        <span className="reviews">💬 15 reviews</span>
        <span className="like">👍 15 likes</span>
      </div>
    </CardWrapper>
  );
};
