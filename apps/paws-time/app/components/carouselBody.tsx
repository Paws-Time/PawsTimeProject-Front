"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGetPosts } from "@/app/lib/codegen/hooks/post/post";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Card } from "@/components/utils/card";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../styles/css/carousel.css";

interface Post {
  id: number;
  postId?: number;
  title: string;
  contentPreview: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likesCount: number;
}

const CarouselBody = () => {
  const { boardId } = useParams(); // boardId 파라미터 가져오기
  const [posts, setPosts] = useState<Post[]>([]); // 타입 지정

  const params = {
    boardId: boardId ? Number(boardId) : undefined, // boardId가 존재하면 숫자로 변환
    page: 0,
    size: 10,
    sort: "createdAt,desc",
  };

  // 게시글 목록 가져오기
  const { data, isLoading, error } = useGetPosts(params, {
    query: {
      staleTime: 5 * 60 * 1000, // 캐싱 시간
    },
  });

  useEffect(() => {
    if (data?.data) {
      console.log("Fetched Data:", data.data); // 데이터 출력
      setPosts(data.data as Post[]); // data 배열 처리
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: 게시글을 가져오는 중 문제가 발생했습니다.</div>;

  return (
    <>
      <h2>최신 글</h2>
      <Swiper
        slidesPerView={3}
        spaceBetween={5}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <Card
              postId={post.id!}
              $title={post.title}
              $contentPreview={post.contentPreview}
              $views={post.views}
              $likeCount={post.likesCount}
              onClick={() => console.log(`Post clicked: ${post.id}`)} // 클릭 시 동작
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CarouselBody;
