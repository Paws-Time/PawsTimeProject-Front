"use client";
import { theme } from "design-system/lib/theme";
import styled from "styled-components";

type CardProps = {
  $title?: string;
  $contentPreview?: string;
  imageUrl?: string;
  views?: number;
  likesCount?: number;
};

type Props = CardProps & React.ButtonHTMLAttributes<HTMLElement>;

const DEFAULT_IMAGE_URL = "/logo.png";
export function Card({
  $title,
  $contentPreview,
  imageUrl = DEFAULT_IMAGE_URL, // 기본값 설정
  views,
  likesCount,
  ...rest
}: Props) {
  return (
    <CardWrapper role="button" tabIndex={0} {...rest}>
      <div className="title">{$title}</div>
      <div className="image-field">
        <img src={imageUrl} alt={$title} />
      </div>
      <div className="contentPreview">{$contentPreview}</div>
      <div className="foot">
        <span className="views">💬 {views} 댓글</span>
        <span className="likesCount">👍 {likesCount} 좋아요</span>
      </div>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 320px;
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

  .title {
    color: ${theme.colors.ref.base.black};
    width: 340px;
    height: 40px;
    margin-top: 5px;
    text-align: center;
    font-size: ${theme.fontSize.display.xs};
  }

  .image-field {
    width: 350px;
    height: 200px;
    border-radius: 15px;
    background-color: ${theme.colors.ref.base.white};
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 330px;
      height: 190px;
      object-fit: cover;
      object-position: center;
      border-radius: inherit;
    }
  }

  .contentPreview {
    color: ${theme.colors.ref.base.black};
    width: 340px;
    height: 40px;
    margin-left: 10px;
    text-align: center;
    font-size: ${theme.fontSize.text.xs};
  }

  .foot {
    flex-direction: column; /* 열 방향으로 변경 */
    width: 340px;
    height: 30px;
    text-align: center;
    font-size: ${theme.fontSize.text.lg};

    .reviews {
      margin-left: 20px; /* 정렬 조정 */
      color: ${theme.colors.ref.base.black};
    }

    .likesCount {
      margin-left: 20px; /* 정렬 조정 */
      color: ${theme.colors.ref.base.black};
    }
  }
`;
