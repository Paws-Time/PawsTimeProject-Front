// * https://swiperjs.com/demos#default 참고
// * https://codesandbox.io/p/devbox/swiper-react-default-dnfw9v 참고

"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./test.css";

import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";

export const Test = () => {
  return (
    <div>
      <h2 style={{ flex: 1, textAlign: "center" }}>최신 글</h2>
      <Swiper
        pagination={true}
        navigation={true}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image
            src="/aaa.jpg"
            alt="사용자 등록 사진"
            width={300}
            height={300}
            style={{ borderRadius: "8px", border: "1px solid black" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Image
            src="/aaa.jpg"
            alt="사용자 등록 사진"
            width={300}
            height={300}
            style={{ borderRadius: "8px", border: "1px solid black" }}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
