"use client";
import { useGetCommentByPost } from "@/app/lib/codegen/hooks/comment/comment";
import {
  getGetPostsQueryKey,
  useGetPosts,
  useToggleLike,
} from "@/app/lib/codegen/hooks/post/post";
import { postFormStyles } from "@/app/styles/postforms";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface CountProps {
  boardId: number;
  postId: number; // postId는 반드시 숫자 타입이어야 함
}
function Count({ boardId, postId }: CountProps) {
  const queryClient = useQueryClient();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [reviewsCount, setReviewsCount] = useState<number | undefined>(0);
  // //좋아요 추가.
  const { mutate } = useToggleLike({
    mutation: {
      onSuccess: () => {
        setIsLiked((prev) => !prev);
        queryClient.refetchQueries({
          queryKey: [...getGetPostsQueryKey({ boardId })],
        });
      },
    },
  });
  //좋아요 수 조회
  const { data: postData } = useGetPosts({ boardId });
  //댓글 수 조회
  const { data: commentsData } = useGetCommentByPost(postId);

  // //초기 데이터 설정
  useEffect(() => {
    const post = postData?.data?.find((post) => post.id === postId);
    if (post) setLikeCount(Number(post.likesCount) || 0);
    if (commentsData) {
      setReviewsCount(commentsData?.data?.length); // 즉시 갱신
      queryClient.invalidateQueries(["getCommentByPost", postId]); // 댓글 데이터 갱신
    }
  }, [postData, commentsData, postId, isLiked]);

  // 좋아요 핸들러
  const handleToggleLike = () => {
    mutate({ postId });
  };
  return (
    <div style={postFormStyles.footer}>
      <div style={postFormStyles.likesAndComments}>
        <span>
          <button onClick={handleToggleLike}>👍좋아요 {likeCount}</button>
        </span>
        <span>💬댓글수 {reviewsCount}</span>
      </div>
    </div>
  );
}

export default Count;
