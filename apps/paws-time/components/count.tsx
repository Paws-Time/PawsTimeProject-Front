"use client";
import { useGetCommentByPost } from "@/app/lib/codegen/hooks/comment/comment";
import { getPosts, useToggleLike } from "@/app/lib/codegen/hooks/post/post";
// import { useToggleLike } from "@/app/lib/codegen/hooks/post/post";
import { postFormStyles } from "@/app/styles/postforms";
import { useState } from "react";
// import React, { useState } from "react";

interface CountProps {
  boardId: number;
  postId: number; // postId는 반드시 숫자 타입이어야 함
}
function Count({ boardId, postId }: CountProps) {
  // const [isLike, setIsLike] = useState(false);
  // //좋아요 추가.
  const { mutate } = useToggleLike({
    mutation: {
      onSuccess: (data) => {
        console.log("상태변경 ", data);
      },
    },
  });
  //좋아요 수 조회
  const {} = getPosts({ boardId });
  //댓글 수 조회
  const { data } = useGetCommentByPost(postId);
  const commentCount = data?.data?.length;
  // 좋아요 핸들러
  const handleToggleLike = () => {
    mutate({ postId });
  };
  return (
    <div style={postFormStyles.footer}>
      <div style={postFormStyles.likesAndComments}>
        <span>
          <button onClick={handleToggleLike}>👍좋아요</button>
        </span>
        <span>💬댓글수 {commentCount}</span>
      </div>
    </div>
  );
}

export default Count;
