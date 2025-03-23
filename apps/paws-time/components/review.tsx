"use client";

import {
  useCreateComment,
  useDeleteComment,
  useGetCommentByPost,
  useUpdateComment,
} from "@/app/lib/codegen/hooks/comment/comment";
import { postFormStyles } from "@/app/styles/postforms";
import React, { useEffect, useState, useMemo } from "react";
import { InputField } from "./utils/input";
import { CustomButton } from "./utils/button";
import { useQueryClient } from "@tanstack/react-query";
import { getUserFromUserId } from "@/app/lib/codegen/hooks/user-api/user-api";
import { useAuth } from "@/app/hooks/authStore";

interface ReviewProps {
  postId: number;
  setCommentsCount: React.Dispatch<React.SetStateAction<number>>;
}

function Review({ postId, setCommentsCount }: ReviewProps) {
  const { userId: loggedInUserId, token, role } = useAuth();
  const [content, setContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [userNicknames, setUserNicknames] = useState<Record<number, string>>(
    {}
  );
  const queryClient = useQueryClient();

  // ✅ 댓글 조회
  const { data, refetch } = useGetCommentByPost(postId);

  // ✅ `commentsCount`를 `useMemo`를 사용하여 초기값 설정 (SSR과 CSR 동일한 값 유지)
  const initialCommentsCount = useMemo(() => data?.data?.length ?? 0, [data]);

  useEffect(() => {
    setCommentsCount(initialCommentsCount);
  }, [initialCommentsCount, setCommentsCount]);

  // ✅ 댓글 작성
  const { mutate: createComment } = useCreateComment({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries(["getCommentByPost", postId]);
        setContent("");
        refetch();
      },
    },
  });

  // ✅ 댓글 수정
  const { mutate: updateComment } = useUpdateComment({
    mutation: {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["getCommentByPost", postId]);
        setEditingCommentId(null);
        setEditingContent("");
        alert(response.message);
        refetch();
      },
    },
  });

  // ✅ 댓글 삭제
  const { mutate: deleteComment } = useDeleteComment({
    mutation: {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["getCommentByPost", postId]);
        alert(response.message);
        refetch();
      },
    },
  });

  // ✅ 댓글 작성자의 닉네임 가져오기 (중복 API 호출 방지)
  useEffect(() => {
    async function fetchCommentAuthors() {
      if (!data?.data) return;

      const newAuthors: Record<number, string> = { ...userNicknames };

      const uniqueUserIds = [
        ...new Set(
          data.data
            .map((comment) => comment.userId)
            .filter((id) => id !== undefined)
        ),
      ];

      for (const userId of uniqueUserIds) {
        if (!newAuthors[userId]) {
          try {
            const response = await getUserFromUserId(userId);
            if (response.data) {
              newAuthors[userId] = response.data.nick ?? "알 수 없음";
            }
          } catch (error) {
            console.error("작성자 정보 불러오기 실패:", error);
            newAuthors[userId] = "알 수 없음";
          }
        }
      }

      setUserNicknames(newAuthors);
    }

    fetchCommentAuthors();
  }, [data]);

  const handleDelete = (commentId: number) => {
    deleteComment({ postId, commentId });
  };

  const handleEdit = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const handleUpdateSubmit = () => {
    if (!editingContent.trim() || editingCommentId === null) return;
    updateComment({
      postId,
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
      {data?.data?.map((review) => {
        const isOwner = loggedInUserId === review.userId;
        const isAdmin = role === "ADMIN";

        return (
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
                <div className="flex-1">
                  <strong>
                    {review.userId && userNicknames[review.userId] !== undefined
                      ? userNicknames[review.userId]
                      : "로딩 중"}
                  </strong>
                  : {review.content}
                </div>

                {(isOwner || isAdmin) && (
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
                )}
              </>
            )}
          </div>
        );
      })}

      {token ? (
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
      ) : (
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          🔒 댓글을 작성하려면 로그인해주세요.
        </p>
      )}
    </>
  );
}

export default Review;
