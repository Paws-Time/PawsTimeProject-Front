"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetPosts } from "@/app/lib/codegen/hooks/post/post";
import { getUserFromUserId } from "@/app/lib/codegen/hooks/user-api/user-api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Card } from "@/components/utils/card";
import { useQueries } from "@tanstack/react-query";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/css/carousel.css";

interface Post {
  id: number;
  boardId: number;
  title: string;
  contentPreview: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likesCount: number;
  userId?: number;
}

const CarouselBody = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  const params = {
    page: 0,
    size: 10,
    sort: "createdAt,desc",
  };

  const { data, isLoading, error } = useGetPosts(params, {
    query: {
      staleTime: 0,
    },
  });

  // 게시글 데이터 세팅
  useEffect(() => {
    if (data?.data) {
      setPosts(data.data as Post[]);
    }
  }, [data]);

  // userId 추출
  const userIds = posts
    .map((post) => post.userId)
    .filter((id) => id !== null && id !== undefined);

  // 작성자 닉네임 가져오기
  const userQueries = useQueries({
    queries: userIds.map((userId) => ({
      queryKey: ["user", userId],
      queryFn: () => getUserFromUserId(userId),
      enabled: !!userId, // userId가 있을 때만 실행
    })),
  });

  // userId와 닉네임 매칭
  const userNicks = userQueries.reduce(
    (acc, query, index) => {
      const userId = userIds[index];
      acc[userId] = query.data?.data?.nick ?? "알 수 없음"; // 닉네임 or 기본값
      return acc;
    },
    {} as Record<number, string>
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: 게시글을 가져오는 중 문제가 발생했습니다.</div>;

  // 게시글 클릭 핸들러
  const handlePostClick = (postId: number, boardId: number) => {
    router.push(`/board/boards/${boardId}/posts/${postId}`);
  };

  return (
    <>
      <h2>최신 글</h2>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <Card
              postId={post.id}
              $title={post.title}
              $contentPreview={post.contentPreview}
              $views={post.views}
              $likeCount={post.likesCount}
              $nick={userNicks[post.userId!] ?? "알 수 없음"} // ✅ 작성자 표시
              onClick={() => handlePostClick(post.id, post.boardId)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CarouselBody;
