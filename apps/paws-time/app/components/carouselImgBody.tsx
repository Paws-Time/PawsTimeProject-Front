"use client";
import React, { useEffect, useState } from "react";
import { getRandomImages } from "../lib/codegen/hooks/post/post";
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
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await getRandomImages();
        if (response?.data) {
          setImages(
            response.data.map((img) => img.imageUrl || "/이미지 기본값.png")
          );
        }
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      {/* <h2 style={{ flex: 1, textAlign: "center" }}>이미지</h2> */}
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
        {images.length > 0 ? (
          images.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <Image
                src={imageUrl}
                alt={`이미지 ${index + 1}`}
                layout="responsive"
                width={16} // 비율용
                height={9} // 비율용
                style={{ borderRadius: "8px", border: "1px solid black" }}
              />
            </SwiperSlide>
          ))
        ) : (
          <p>이미지를 불러오는 중...</p>
        )}
      </Swiper>
    </div>
  );
};
