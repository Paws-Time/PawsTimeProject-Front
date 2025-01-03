"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetPosts } from "@/app/lib/codegen/hooks/post/post";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Card } from "@/components/utils/card";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/css/carousel.css";
// * https://swiperjs.com/demos#default 참고
// * https://codesandbox.io/p/devbox/swiper-react-default-dnfw9v 참고

interface Post {
  id: number;
  boardId: number;
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
              onClick={() => handlePostClick(post.id, post.boardId)} // boardId와 postId 전달
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CarouselBody;
