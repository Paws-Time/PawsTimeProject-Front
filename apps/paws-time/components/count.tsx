"use client";
import { useGetCommentByPost } from "@/app/lib/codegen/hooks/comment/comment";
import { useGetPosts, useToggleLike } from "@/app/lib/codegen/hooks/post/post";
import { postFormStyles } from "@/app/styles/postforms";
// import React, { useState } from "react";

interface CountProps {
  boardId: number;
  postId: number; // postId는 반드시 숫자 타입이어야 함
}
function Count({ boardId, postId }: CountProps) {
  // //좋아요 추가.
  const { mutate } = useToggleLike({
    mutation: {
      onSuccess: (data) => {
        console.log("상태변경 ", data);
      },
    },
  });
  //좋아요 수 조회
  const { data: postData } = useGetPosts({ boardId });
  const likesCount = postData?.data
    ?.filter((post) => post.id === postId)
    .map((post) => post.likesCount);
  //댓글 수 조회
  const { data: commentsData } = useGetCommentByPost(postId);
  const commentCount = commentsData?.data?.length;
  // 좋아요 핸들러
  const handleToggleLike = () => {
    mutate({ postId });
  };
  return (
    <div style={postFormStyles.footer}>
      <div style={postFormStyles.likesAndComments}>
        <span>
          <button onClick={handleToggleLike}>👍좋아요 {likesCount}</button>
        </span>
        <span>💬댓글수 {commentCount}</span>
      </div>
    </div>
  );
}

export default Count;
