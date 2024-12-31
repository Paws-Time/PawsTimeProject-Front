"use client";
import { useModalStore } from "@/app/hooks/modalStore";
import React, { useEffect } from "react";
import Modal from "./modal";
import Mapdetail from "./mapdetail";

// Kakao 지도 타입 선언
declare global {
  interface Window {
    kakao: any;
  }
}

// Props 타입 정의
type MapProps = {
  latitude: number; // 위도
  longitude: number; // 경도
  name: string;
  tel: string;
  address: string;
};

function MapApiData({ latitude, longitude, name, tel, address }: MapProps) {
  const kakaoApiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_JAVASCRIPT;
  const { openModal } = useModalStore();
  useEffect(() => {
    // Kakao 지도 SDK 로드
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false`;
    script.async = true;
    script.onload = () => {
      // SDK 로드 후 지도 초기화
      if (window.kakao) {
        window.kakao.maps.load(() => {
          const container = document.getElementById("map"); // 지도 컨테이너
          const options = {
            center: new window.kakao.maps.LatLng(latitude, longitude), // 중심 좌표
            level: 3, // 확대 레벨
          };

          // 지도 생성
          const map = new window.kakao.maps.Map(container, options);
          // 마커 생성
          const marker = new window.kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: new window.kakao.maps.LatLng(latitude, longitude), // 마커 위치
            clickable: true,
          });
          const iwContent = '<div style="padding:5px;">세부정보보기</div>';
          // 인포윈도우를 생성합니다
          const infowindow = new window.kakao.maps.InfoWindow({
            content: iwContent,
          });
          window.kakao.maps.event.addListener(marker, "mouseover", () => {
            infowindow.open(map, marker);
          });
          window.kakao.maps.event.addListener(marker, "mouseout", () => {
            infowindow.close();
          });
          window.kakao.maps.event.addListener(marker, "click", () => {
            openModal();
          });
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
  }, [latitude, longitude, kakaoApiKey, openModal]);

  return (
    <>
      <div id="map" className="w-[900px] h-[850px] ml-20 mt-10" />;
      <Modal>
        <Mapdetail name={name} tel={tel} address={address} />
      </Modal>
    </>
  );
}

export default MapApiData;
