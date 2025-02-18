"use client";
import { useGetCommentByPost } from "@/app/lib/codegen/hooks/comment/comment";
import { useGetThumbnail } from "@/app/lib/codegen/hooks/post/post";
import { theme } from "design-system/lib/theme";
import styled from "styled-components";

type CardProps = {
  $title?: string;
  postId: number;
  $contentPreview?: string;
  imageUrl?: string;
  $views?: number;
  $likeCount?: number;
};

type Props = CardProps & React.ButtonHTMLAttributes<HTMLElement>;
const defaultImage = "/noimage.png";
export function Card({
  $title,
  postId,
  $contentPreview,
  $views,
  $likeCount,
  ...rest
}: Props) {
  const { data } = useGetCommentByPost(postId);
  const commentCount = data?.data?.length ?? 0; // 댓글 수 기본값 0 처리
  const { data: imageData } = useGetThumbnail(postId);
  const setImageUrl = imageData?.data?.[0].imageUrl || defaultImage;
  return (
    <CardWrapper role="button" tabIndex={0} {...rest}>
      <div className="title">{$title}</div>
      <div className="image-field">
        <img src={setImageUrl} alt={$title || "이미지"} loading="lazy" />
      </div>
      <div className="nick">작성자</div>
      <div className="contentPreview">{$contentPreview}</div>
      <div className="foot">
        <span className="views">💬 {$views ?? 0} 조회수</span>
        <span className="likesCount">👍 {$likeCount ?? 0} 좋아요</span>
        <span className="comments">💬 {commentCount} 댓글수</span>
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
    border: 1px solid ${theme.colors.ref.base.gray};
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
      overflow: hidden;
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

  .nick {
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${theme.colors.ref.base.black};
    font-size: ${theme.fontSize.text.m};
    margin-top: 5px;
  }

  .foot {
    flex-direction: column; /* 열 방향으로 변경 */
    width: 340px;
    height: 30px;
    text-align: center;
    font-size: ${theme.fontSize.text.xs};

    .reviews {
      margin-left: 20px; /* 정렬 조정 */
      color: ${theme.colors.ref.base.black};
    }

    .likesCount {
      margin-left: 20px; /* 정렬 조정 */
      color: ${theme.colors.ref.base.black};
    }
    .comments {
      margin-left: 20px; /* 정렬 조정 */
      color: ${theme.colors.ref.base.black};
    }
  }
`;
