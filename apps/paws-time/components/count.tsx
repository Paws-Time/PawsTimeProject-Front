"use client";
import {
  getGetPostsQueryKey,
  useGetPosts,
} from "@/app/lib/codegen/hooks/post/post";
import { useToggleLike } from "@/app/lib/codegen/hooks/like/like";
import { postFormStyles } from "@/app/styles/postforms";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/authStore";

interface CountProps {
  boardId: number;
  postId: number;
  commentsCount: number;
}

function Count({ boardId, postId, commentsCount }: CountProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const auth = useAuth(); // 로그인 상태 확인

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  // ✅ 게시글 데이터 조회
  const { data: postData } = useGetPosts({ boardId });

  // ✅ `likeCount` 및 `isLiked` 초기값을 `useMemo`를 사용하여 SSR과 CSR에서 동일하게 설정
  const initialLikeCount = useMemo(() => {
    const post = postData?.data?.find((post) => post.id === postId);
    return post ? Number(post.likesCount) || 0 : 0;
  }, [postData, postId]);

  const initialIsLiked = useMemo(() => {
    const post = postData?.data?.find((post) => post.id === postId);
    return post ? (post as any).isLiked || false : false;
  }, [postData, postId]);

  // ✅ CSR에서만 `setState` 실행 (Hydration 오류 방지)
  useEffect(() => {
    setLikeCount(initialLikeCount);
    setIsLiked(initialIsLiked);
  }, [initialLikeCount, initialIsLiked]);

  // ✅ 좋아요 기능
  const { mutate } = useToggleLike({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetPostsQueryKey({ boardId }),
        });
      },
    },
  });

  // ✅ 좋아요 버튼 핸들러 (로그인 여부 확인)
  const handleToggleLike = () => {
    if (!auth.token) {
      const confirmLogin = window.confirm("로그인 하시겠습니까?");
      if (confirmLogin) {
        router.push("/auth/login"); // 로그인 페이지로 이동
      }
      return;
    }

    mutate({ postId });
  };

  return (
    <div style={postFormStyles.footer}>
      <div style={postFormStyles.likesAndComments}>
        <span>
          <button onClick={handleToggleLike}>
            {isLiked ? "❤️" : "👍"} 좋아요 {likeCount}
          </button>
        </span>
        <span>💬 댓글수 {commentsCount}</span>
      </div>
    </div>
  );
}

export default Count;
