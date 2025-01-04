"use client";

import {
  useCreateComment,
  useDeleteComment,
  useGetCommentByPost,
  useUpdateComment, // 수정 API 훅 추가
} from "@/app/lib/codegen/hooks/comment/comment";
import { postFormStyles } from "@/app/styles/postforms";
import React, { useEffect, useState } from "react";
import { InputField } from "./utils/input";
import { CustomButton } from "./utils/button";
import { useQueryClient } from "@tanstack/react-query";

interface ReviewProps {
  postId: number;
  setCommentsCount: React.Dispatch<React.SetStateAction<number>>; // 업데이트 함수 타입 정의
  setNewComments: React.Dispatch<React.SetStateAction<string>>;
}
interface ReviewReqParams {
  pageNo?: number;
  pageSize?: number;
  sortBy?: string;
  direction?: string;
}
interface ReviewResDto {
  commentId?: number;
  content?: string;
  createAt?: string;
}

function Review({ postId, setCommentsCount, setNewComments }: ReviewProps) {
  const [pageSize, setPageSize] = useState(5);
  const [direction, setDirection] = useState("DESC");
  const [content, setContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [pageNo, setPageNo] = useState(0);
  const [reviews, setReviews] = useState<ReviewResDto[]>([]);
  const [params, setParams] = useState<ReviewReqParams>({
    pageNo,
    pageSize,
    sortBy: "createdAt",
    direction,
  });
  const queryClient = useQueryClient();

  // 댓글 작성
  const { mutate: createComment } = useCreateComment({
    mutation: {
      onSuccess: (newComment) => {
        if (newComment.data) {
          const newReview = newComment.data as ReviewResDto;
          setReviews((prev) => [newReview, ...prev]);
          setCommentsCount((prev: number) => prev + 1);
        }
        setContent("");
        setNewComments("");
        queryClient.invalidateQueries(["getCommentByPost", postId]);
      },
    },
  });

  // 댓글 수정
  const { mutate: updateComment } = useUpdateComment({
    mutation: {
      onSuccess: (updatedComment) => {
        if (updatedComment.data) {
          const updatedReview = updatedComment.data as ReviewResDto;
          setReviews((prev) =>
            prev.map((review) =>
              review.commentId === updatedReview.commentId
                ? updatedReview
                : review
            )
          );
        }
        setEditingCommentId(null);
        setEditingContent("");
        alert("댓글이 수정되었습니다.");
      },
    },
  });

  // 댓글 삭제
  const { mutate: deleteComment } = useDeleteComment({
    mutation: {
      onSuccess: (_, { commentId }) => {
        setReviews((prev) =>
          prev.filter((review) => review.commentId !== commentId)
        );
        setCommentsCount((prev: number) => Math.max(0, prev - 1));
        alert("댓글이 삭제되었습니다.");
        queryClient.refetchQueries(["getCommentByPost", postId]);
      },
    },
  });

  const handleDeleteReviews = (commentId: number) => {
    deleteComment({ commentId });
  };

  const handleEditReviews = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
    setNewComments(content);
  };

  const handleUpdateSubmit = () => {
    if (!editingContent.trim() || editingCommentId === null) return;
    updateComment({
      commentId: editingCommentId,
      data: { content: editingContent },
    });
  };

  // 댓글 조회
  const { data } = useGetCommentByPost(postId, params);

  useEffect(() => {
    if (data?.data) {
      setReviews(data.data);
    }
  }, [data]);

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      pageNo,
      pageSize,
      sortBy: "createdAt",
      direction,
    }));
  }, [pageNo, pageSize, direction]);

  useEffect(() => {});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;
    createComment({
      postId,
      data: { content },
    });
  };
  console.log(pageNo);
  return (
    <>
      {reviews.map((review, index) => (
        <div
          key={review.commentId ?? `review-${index}`}
          className="w-full flex flex-row items-center justify-between"
          style={postFormStyles.commentBox}
        >
          {editingCommentId === review.commentId ? (
            <div className="flex flex-1">
              <InputField
                $label="수정 내용"
                type="text"
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
              />
              <CustomButton
                $label="✔️"
                $sizeType="mini"
                style={{ marginLeft: "4px" }}
                onClick={handleUpdateSubmit}
              />
              <CustomButton
                $label="❌"
                $sizeType="mini"
                style={{ marginLeft: "4px" }}
                onClick={() => {
                  setEditingCommentId(null);
                  setEditingContent("");
                }}
              />
            </div>
          ) : (
            <>
              <div className="flex-1">{review.content}</div>
              <div className="flex gap-2">
                <CustomButton
                  $label="✏️"
                  $sizeType="mini"
                  onClick={() => {
                    if (review.commentId !== undefined) {
                      handleEditReviews(review.commentId, review.content ?? "");
                    }
                  }}
                />
                <CustomButton
                  $label="x"
                  $sizeType="mini"
                  onClick={() => {
                    if (review.commentId !== undefined) {
                      handleDeleteReviews(review.commentId);
                    }
                  }}
                />
              </div>
            </>
          )}
        </div>
      ))}
      <div>
        <form onSubmit={handleSubmit} style={postFormStyles.commentBox}>
          <InputField
            $label="댓글 입력창"
            type="text"
            value={content || ""}
            onChange={(e) => setContent(e.target.value)}
          />
          <CustomButton $label="저장하기" $sizeType="long" />
        </form>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value) as 3 | 5)}
          style={postFormStyles.select}
        >
          <option value={3}>3개씩 조회</option>
          <option value={5}>5개씩 조회</option>
        </select>
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          style={postFormStyles.select}
        >
          <option value="desc">최신순</option>
          <option value="asc">오래된순</option>
        </select>
        {pageNo > 0 && (
          <CustomButton
            $label="이전"
            $sizeType="short"
            className="ml-3"
            onClick={() => setPageNo((prev) => Math.max(0, prev - 1))}
          />
        )}

        <span className="mt-5 ml-5"> {pageNo + 1} 페이지 </span>
        <CustomButton
          $label="다음"
          $sizeType="short"
          className="ml-3"
          onClick={() => setPageNo((prev) => prev + 1)}
        />
      </div>
    </>
  );
}

export default Review;
