"use client";

import React, { useState } from "react";
import { useGetPosts } from "@/app/lib/codegen/hooks/post/post";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const params = {
    boardId: 1, // 필요한 경우 동적으로 설정
    page: 0,
    size: 5,
    sort: "createdAt,desc",
  };

  // 게시글 목록 가져오기
  const { data, isLoading, error } = useGetPosts(params, {
    query: {
      staleTime: 5 * 60 * 1000,
    },
  });
  console.log(data);
  const posts = data?.data || [];

  // 이전 슬라이드
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1
    );
  };

  // 다음 슬라이드
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === posts.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: 데이터를 불러오는 중 문제가 발생했습니다.</div>;

  return (
    <div style={styles.carouselContainer}>
      <button
        onClick={prevSlide}
        style={{ ...styles.arrowButton, ...styles.prevButton }}
      >
        이전
      </button>
      <div style={styles.carouselContent}>
        {posts.map((post, index) => (
          <div
            key={post.id}
            style={{
              ...styles.slide,
              display: currentIndex === index ? "block" : "none",
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.contentPreview}</p>
          </div>
        ))}
      </div>
      <button
        onClick={nextSlide}
        style={{ ...styles.arrowButton, ...styles.nextButton }}
      >
        다음
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  carouselContainer: {
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
  },
  carouselContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "transform 0.5s ease",
  },
  slide: {
    width: "100%",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  arrowButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "2rem",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    zIndex: 10, // 버튼이 슬라이드 위에 표시되도록 함
  },
  prevButton: {
    left: "10px", // 좌측 여백 설정
  },
  nextButton: {
    right: "10px", // 우측 여백 설정
  },
};

export default Carousel;
