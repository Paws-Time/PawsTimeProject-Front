"use client";

import {
  useCreateComment,
  useDeleteComment,
  useGetCommentByPost,
  useUpdateComment,
} from "@/app/lib/codegen/hooks/comment/comment";
import { postFormStyles } from "@/app/styles/postforms";
import React, { useEffect, useState } from "react";
import { InputField } from "./utils/input";
import { CustomButton } from "./utils/button";
import { useQueryClient } from "@tanstack/react-query";

interface ReviewProps {
  postId: number;
  setCommentsCount: React.Dispatch<React.SetStateAction<number>>;
  setNewComments?: React.Dispatch<React.SetStateAction<string>>;
}

function Review({ postId, setCommentsCount }: ReviewProps) {
  const [content, setContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const queryClient = useQueryClient();

  // 댓글 조회
  const { data, refetch } = useGetCommentByPost(postId);

  // 댓글 목록 최신화
  useEffect(() => {
    if (data?.data) {
      setCommentsCount(data.data.length);
    }
  }, [data, setCommentsCount]);

  // 댓글 작성
  const { mutate: createComment } = useCreateComment({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries(["getCommentByPost", postId]);
        setContent(""); // 입력창 초기화
        refetch(); // 최신 데이터 즉시 반영
      },
    },
  });

  // 댓글 수정
  const { mutate: updateComment } = useUpdateComment({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries(["getCommentByPost", postId]); // 최신 댓글 목록 반영
        setEditingCommentId(null);
        setEditingContent("");
        alert("댓글이 수정되었습니다.");
        refetch(); // 최신 데이터 즉시 반영
      },
    },
  });

  // 댓글 삭제
  const { mutate: deleteComment } = useDeleteComment({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries(["getCommentByPost", postId]); // 최신 댓글 목록 반영
        alert("댓글이 삭제되었습니다.");
        refetch(); // 최신 데이터 즉시 반영
      },
    },
  });

  const handleDelete = (commentId: number) => {
    deleteComment({ postId, commentId }); // 🔹 postId 추가
  };

  const handleEdit = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const handleUpdateSubmit = () => {
    if (!editingContent.trim() || editingCommentId === null) return;
    updateComment({
      postId, // 🔹 postId 추가
      commentId: editingCommentId,
      data: { content: editingContent },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;
    createComment({
      postId,
      data: { content },
    });
  };

  return (
    <>
      {data?.data?.map((review) => (
        <div
          key={review.commentId}
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
                onClick={() => setEditingCommentId(null)}
              />
            </div>
          ) : (
            <>
              <div className="flex-1">{review.content}</div>
              <div className="flex gap-2">
                <CustomButton
                  $label="✏️"
                  $sizeType="mini"
                  onClick={() =>
                    handleEdit(review.commentId!, review.content ?? "")
                  }
                />
                <CustomButton
                  $label="x"
                  $sizeType="mini"
                  onClick={() => handleDelete(review.commentId!)}
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
      </div>
    </>
  );
}

export default Review;
