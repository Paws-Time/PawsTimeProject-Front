import React from "react";
import Image from "next/image";
import Carousel from "./components/carouselBody"; // 캐러셀 컴포넌트
import PopularPostsBody from "./components/hotpostsBody";

const MainPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      {/* 상단 섹션 */}
      <div style={{ display: "flex", marginBottom: "40px" }}>
        {/* 좌측 최신 글 섹션 */}
        <div style={{ flex: 2, marginRight: "20px" }}>
          <h2>최신 글</h2>
          <Carousel />
        </div>

        {/* 우측 이미지 섹션 */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <h2>등록된 사진</h2>
          <Image
            src="/aaa.jpg"
            alt="사용자 등록 사진"
            width={300}
            height={300}
            style={{ borderRadius: "8px", border: "1px solid #ccc" }}
          />
        </div>
      </div>

      {/* 하단 인기 게시글 섹션 */}
      <div>
        <PopularPostsBody />
      </div>
    </div>
  );
};

export default MainPage;
