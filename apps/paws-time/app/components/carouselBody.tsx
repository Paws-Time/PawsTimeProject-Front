"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetPosts, getDetailPost } from "@/app/lib/codegen/hooks/post/post";
import { GetDetailPostRespDto } from "../lib/codegen/dtos";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Card } from "@/components/utils/card";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/css/carousel.css";

interface Post {
  id: number;
  title: string;
  contentPreview: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likesCount: number;
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
      staleTime: 5 * 60 * 1000,
    },
  });

  useEffect(() => {
    if (data?.data) {
      setPosts(data.data as Post[]);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: 게시글을 가져오는 중 문제가 발생했습니다.</div>;

  const handlePostClick = async (postId: number) => {
    try {
      const response = await getDetailPost(postId);
      const data = response.data as GetDetailPostRespDto; // 명시적으로 타입 설정
      const { boardId } = data;

      if (boardId) {
        router.push(`/board/boards/${boardId}/posts/${postId}`);
      } else {
        console.error("bordId를 가져올 수 없습니다.");
      }
    } catch (error) {
      console.error(
        "게시글 상세 정보를 가져오는 중 문제가 발생했습니다:",
        error
      );
    }
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
              onClick={() => handlePostClick(post.id)} // 게시글 클릭 핸들러
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CarouselBody;
