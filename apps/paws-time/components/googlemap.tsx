"use client";
import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import Modal from "./modal";
import Mapdetail from "./mapdetail";

type MapProps = {
  latitude?: number; // 위도
  longitude?: number; // 경도
  name?: string;
  tel?: string;
  address: string;
};

export default function GoogleMapApiData({
  latitude,
  longitude,
  name,
  tel,
  address,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInitialized = useRef(false); // 지도 초기화 여부 추적
  //랜더링이 2번이 되는 문제?

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string, // Google Maps API 키
      version: "weekly", // Google Maps API 버전
    });

    loader.load().then(() => {
      // 지도 초기화
      if (!mapInitialized.current && mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: latitude || 37.7749, lng: longitude || -122.4194 }, // 기본 위치는 샌프란시스코
          zoom: 14, // 지도 줌 레벨
        });

        // 마커 생성
        const marker = new google.maps.Marker({
          position: { lat: latitude || 37.7749, lng: longitude || -122.4194 },
          map: map,
          title: name || "Location", // 병원 이름
        });
        
        // 정보창 생성
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div>
              <h4>${name}</h4>
              <p>주소: ${address}</p>
              <p>전화: ${tel || "연락처 없음"}</p>
            </div>
          `,
        });

        // 마커 클릭 시 정보창 열기
        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });

        mapInitialized.current = true; // 지도 초기화 완료
      }
    });
  }, [latitude, longitude, name, tel, address]); // 위도와 경도, 병원 정보가 변경될 때마다 실행

  return (
    <>
      <div
        ref={mapRef}
        id="map"
        className="w-[1000px] h-[900px] relative ml-20 mt-10"
      />
      <Modal>
        <Mapdetail name={name} tel={tel} address={address} />
      </Modal>
    </>
  );
}
