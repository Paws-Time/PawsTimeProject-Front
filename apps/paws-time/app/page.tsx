import React from "react";
import CarouselBody from "./components/carouselBody";
import HotPostsBody from "./components/hotpostsBody";
import "./styles/css/mainPage.css";
import { CarouselImgBody } from "./components/carouselImgBody";

const MainPage = () => {
  return (
    <div className="main-page-container">
      {/* 상단 섹션 */}
      <div className="top-section">
        <div className="left-carousel">
          <CarouselBody />
        </div>
        <div className="right-image">
          <CarouselImgBody />
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
