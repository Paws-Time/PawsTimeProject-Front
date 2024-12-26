import React from "react";
import Image from "next/image";
import CarouselBody from "./components/carouselBody";
import HotPostsBody from "./components/hotpostsBody";
import "./styles/css/mainPage.css";

const MainPage = () => {
  return (
    <div className="main-page-container">
      {/* 상단 섹션 */}
      <div className="top-section">
        <div className="left-carousel">
          <CarouselBody />
        </div>
        <div className="right-image">
          <h2>이미지</h2>
          <Image
            src="/aaa.jpg"
            alt="사용자 등록 사진"
            width={300}
            height={300}
            style={{ borderRadius: "8px", border: "1px solid black" }}
          />
        </div>
      </div>

      {/* 하단 섹션 */}
      <div className="bottom-section">
        <HotPostsBody />
      </div>
    </div>
  );
};

export default MainPage;
