"use client";
import React, { useEffect } from "react";

// Kakao 지도 타입 선언
declare global {
  interface Window {
    kakao: any;
  }
}

// Props 타입 정의
type MapProps = {
  title?: string; // 마커에 표시할 제목
  latitude: number; // 위도
  longitude: number; // 경도
};

function MapApiData({ title, latitude, longitude }: MapProps) {
  const kakaoApiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_JAVASCRIPT;

  useEffect(() => {
    // Kakao 지도 SDK 로드
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false`;
    script.async = true;
    console.log(process.env.NEXT_PUBLIC_KAKAO_MAP_API_JAVASCRIPT);
    console.log("Kakao maps object:", window.kakao?.maps);
    script.onload = () => {
      console.log("Kakao Maps SDK 로드 성공");
      // SDK 로드 후 지도 초기화
      if (window.kakao) {
        console.log("Kakao Maps SDK 로드 성공");
        window.kakao.maps.load(() => {
          console.log("window.kakao 객체 확인:", window.kakao);
          const container = document.getElementById("map"); // 지도 컨테이너
          const options = {
            center: new window.kakao.maps.LatLng(latitude, longitude), // 중심 좌표
            level: 3, // 확대 레벨
          };

          // 지도 생성
          const map = new window.kakao.maps.Map(container, options);
          console.log("지도생성", map);
          // 마커 생성
          const marker = new window.kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: new window.kakao.maps.LatLng(latitude, longitude), // 마커 위치
            title: title, // 마커에 표시할 제목
          });
          console.log("마커 생성:", marker);
        });
      }
    };

    document.head.appendChild(script);

    // 클린업 (스크립트 제거 X, 지도만 초기화)
    return () => {
      const mapContainer = document.getElementById("map");
      if (mapContainer) {
        mapContainer.innerHTML = ""; // 지도 초기화
      }
    };
  }, [latitude, longitude, title]);

  return <div id="map" className="w-[900px] h-[700px]" />; // 지도 표시 영역
}

export default MapApiData;
