"use client";
import MapApiData from "@/components/map";
import { useEffect, useState } from "react";
import { formStyles } from "../styles/forms";

type Location = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  regionCode: number;
  tel?: string;
};

export default function InfoBoardBody() {
  // State 관리
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [regionFilter, setRegionFilter] = useState(6);
  const [nameFilter, setNameFilter] = useState("");

  // 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data/locations.json");
      const data = await response.json();
      setLocations(data.data);
    };
    fetchData();
  }, []);

  console.log("패치이후 데이터", locations);

  // 필터링 로직
  const filteredLocations = locations
    .filter((location) => location.regionCode === regionFilter) // 1차 필터: 지역별
    .filter(
      (location) => (nameFilter ? location.name.includes(nameFilter) : true) // 2차 필터: 이름 검색
    );

  // 장소 클릭 핸들러
  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="flex w-custom-width">
      <div className="w-custom-sidew"></div>
      <article className="flex flex-col w-[350px] h-full">
        {/* 지역 필터 */}
        <nav className="h-[50px] border-b border-gray-300">
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(Number(e.target.value))}
          >
            <option value={1}>서울</option>
            <option value={2}>인천</option>
            <option value={3}>대전</option>
            <option value={4}>대구</option>
            <option value={5}>광주</option>
            <option value={6}>부산</option>
            <option value={7}>울산</option>
            <option value={8}>세종</option>
            <option value={9}>경기도</option>
            <option value={10}>강원도</option>
            <option value={11}>충청북도</option>
            <option value={12}>충청남도</option>
            <option value={13}>경상북도</option>
            <option value={14}>경상남도</option>
            <option value={15}>전라북도</option>
            <option value={16}>전라남도</option>
            <option value={17}>제주도</option>
          </select>
        </nav>

        {/* 검색 필터 */}
        <form
          className="input"
          onSubmit={(e) => {
            e.preventDefault(); // 기본 동작 방지
            console.log("검색된 이름:", nameFilter);
          }}
        >
          <input
            type="text"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            placeholder="제목을 입력하세요"
            style={formStyles.input}
            required
          />
        </form>

        {/* 필터링된 목록 */}
        <section className="h-[500px] p-4">
          <h2 className="text-lg font-bold mb-4">병원 목록</h2>
          <ul className="space-y-2">
            {filteredLocations.map((location) => (
              <li
                key={location.id}
                className="cursor-pointer p-2 bg-gray-100 rounded hover:bg-gray-200"
                onClick={() => handleLocationClick(location)}
              >
                <div>{location.name}</div>
                <div>{location.tel || "연락처 없음"}</div>
              </li>
            ))}
          </ul>
        </section>
      </article>

      {/* 지도 컴포넌트 */}
      <aside className="w-[800px] border-l h-full border-gray-300 ml-10">
        {selectedLocation && (
          <MapApiData
            latitude={selectedLocation?.latitude}
            longitude={selectedLocation?.longitude}
            name={selectedLocation?.name}
            tel={selectedLocation?.tel ?? "연락처없음"}
            address={selectedLocation?.address}
          />
        )}
      </aside>
    </div>
  );
}
