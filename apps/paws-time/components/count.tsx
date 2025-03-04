"use client";
import {
  getGetPostsQueryKey,
  useGetPosts,
} from "@/app/lib/codegen/hooks/post/post";
import { useToggleLike } from "@/app/lib/codegen/hooks/like/like";
import { postFormStyles } from "@/app/styles/postforms";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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

  // 좋아요 기능
  const { mutate } = useToggleLike({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetPostsQueryKey({ boardId }),
        });
      },
    },
  });

  // 게시글 데이터 조회
  const { data: postData } = useGetPosts({ boardId });

  // 초기 데이터 설정
  useEffect(() => {
    const post = postData?.data?.find((post) => post.id === postId);
    if (post) {
      setLikeCount(Number(post.likesCount) || 0);
      setIsLiked((post as any).isLiked || false);
    }
  }, [postData, postId]);

  // 좋아요 핸들러
  const handleToggleLike = () => {
    if (!auth.token) {
      // 로그인하지 않은 경우 로그인 안내창 표시
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
