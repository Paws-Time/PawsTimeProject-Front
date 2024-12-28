"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "../styles/css/carouselImg.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

export const CarouselImgBody = () => {
  return (
    <div>
      <h2 style={{ flex: 1, textAlign: "center" }}>이미지</h2>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
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
          <Image
            src="/bbb.jpg"
            alt="사용자 등록 사진"
            width={300}
            height={300}
            style={{ borderRadius: "8px", border: "1px solid black" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/bbb.jpg"
            alt="사용자 등록 사진"
            width={300}
            height={300}
            style={{ borderRadius: "8px", border: "1px solid black" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/ccc.jpg"
            alt="사용자 등록 사진"
            width={300}
            height={300}
            style={{ borderRadius: "8px", border: "1px solid black" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/ddd.jpg"
            alt="사용자 등록 사진"
            width={300}
            height={300}
            style={{ borderRadius: "8px", border: "1px solid black" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/eee.jpg"
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
