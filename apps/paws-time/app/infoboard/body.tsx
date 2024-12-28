"use client";
import MapApiData from "@/components/map";
import { useState } from "react";

export default function InfoBoardBody() {
  // State 관리
  const [title, setTitle] = useState("서울");
  const [latitude, setLatitude] = useState(37.5665); // 서울
  const [longitude, setLongitude] = useState(126.978); // 서울

  // 장소 정보 배열
  const locations = [
    { name: "서울", latitude: 37.5665, longitude: 126.978 },
    { name: "부산", latitude: 35.1796, longitude: 129.0756 },
    { name: "인천", latitude: 37.4563, longitude: 126.7052 },
    { name: "대구", latitude: 35.8714, longitude: 128.6014 },
    { name: "광주", latitude: 35.1595, longitude: 126.8526 },
  ];

  // 장소 클릭 핸들러
  const handleLocationClick = (location: (typeof locations)[0]) => {
    setTitle(location.name);
    setLatitude(location.latitude);
    setLongitude(location.longitude);
  };

  return (
    <div className="flex w-custom-width">
      <div className="w-custom-sidew"></div>
      <article className="flex flex-col w-[350px] h-full">
        <nav className="h-[150px] border-b border-gray-300">
          <select>검색창이 들어갈 영역</select>
        </nav>
        <section className="h-[500px] p-4">
          <h2 className="text-lg font-bold mb-4">주요 도시</h2>
          <ul className="space-y-2">
            {locations.map((location) => (
              <li
                key={location.name}
                className="cursor-pointer p-2 bg-gray-100 rounded hover:bg-gray-200"
                onClick={() => handleLocationClick(location)}
              >
                {location.name}
              </li>
            ))}
          </ul>
        </section>
      </article>
      <aside className="w-[800px] border-l h-full border-gray-300 ml-10">
        {/* 지도 컴포넌트 */}
        <MapApiData title={title} latitude={latitude} longitude={longitude} />
      </aside>
    </div>
  );
}
