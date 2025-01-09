import React from "react";
import CarouselBody from "../components/carouselBody";
import { CarouselImgBody } from "../components/carouselImgBody";
import HotPostsBody from "../components/hotpostsBody";
import "../styles/css/home.css";

const home = () => {
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

export default home;
