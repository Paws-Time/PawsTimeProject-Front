"use client";
import { theme } from "design-system/lib/theme";
import styled from "styled-components";

type CardProps = {
  title: string;
  contentPreview: string;
  imageUrl?: string;
  views: number;
  likesCount: number;
};

type Props = CardProps & React.ButtonHTMLAttributes<HTMLElement>;

const DEFAULT_IMAGE_URL = "/logo.png";
export function Card({
  title,
  contentPreview,
  imageUrl = DEFAULT_IMAGE_URL, // 기본값 설정
  views,
  likesCount,
  ...rest
}: Props) {
  return (
    <CardWrapper role="button" tabIndex={0} {...rest}>
      <div className="call-menu" onClick={() => {}}>
        ...
      </div>
      <div className="title">{title}</div>
      <div className="image-field">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="contentPreview">{contentPreview}</div>
      <div className="foot">
        <span className="views">💬 {views} reviews</span>
        <span className="likesCount">👍 {likesCount} likes</span>
      </div>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
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

  &:hover {
    border: double 1px ${theme.colors.comp.card.hover};
    box-shadow: ${theme.shadow.hover};
  }

  &:active {
    border: inset 3px ${theme.colors.comp.card.active};
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
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
    margin-top: 2px;
    margin-left: 20px;
    margin-bottom: 3px;
    text-align: left;
    align-self: flex-start;
  }

  .image-field {
    margin-left: 0;
    width: 95%;
    max-width: 300px;
    height: 140px;
    margin-left: 20px;
    border-radius: 15px;
    background-color: ${theme.colors.ref.base.white};
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    img {
      margin-left: 0;
      max-width: 260px;
      width: 90%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      border-radius: inherit;
    }
  }

  .description {
    display: flex;
    font-size: ${theme.fontSize.text.xs};
    color: ${theme.colors.ref.base.black};
    width: 90%;
    max-width: 300px;
    margin-top: 2px;
    margin-bottom: 3px;
    text-align: center;
    align-self: flex-start;
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
