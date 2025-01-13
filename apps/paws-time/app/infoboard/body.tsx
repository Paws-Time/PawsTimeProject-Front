"use client";
import { useEffect, useState } from "react";
import { formStyles } from "../styles/forms";
import { getHospitalInfo } from "../lib/codegen/hooks/info/info";
import { CustomButton } from "@/components/utils/button";
import GoogleMapApiData from "@/components/googlemap";

interface GetHospitalInfoRespDto {
  add1?: string;
  add2?: string;
  addNum?: number;
  id?: number;
  name?: string;
  tel?: string;
  type?: string;
  x?: number;
  y?: number;
}

export default function InfoBoardBody() {
  // State 관리
  const [locations, setLocations] = useState<GetHospitalInfoRespDto[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<GetHospitalInfoRespDto | null>(null);
  const [regionFilter, setRegionFilter] = useState(6);
  const [nameFilter, setNameFilter] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState("");
  const [direction, setDirection] = useState("DESC");
  const [pageNo, setPageNo] = useState(0);

  
  useEffect(() => {
    const fetchHospitalInfo = async () => {
      try {
        const response = await getHospitalInfo(regionFilter, {
          pageNo,
          pageSize,
          sortBy,
          direction,
        });
        setLocations(response?.data || []);
      } catch (error) {
        console.error("Error fetching hospital info:", error);
      }
    };
    fetchHospitalInfo();
  }, [regionFilter, pageNo, pageSize, sortBy]);

  // 필터링 로직
  const filteredLocations = locations
    .filter((location) => location.addNum === regionFilter) // 1차 필터: 지역별
    .filter(
      (location) => (nameFilter ? location?.name?.includes(nameFilter) : true) // 2차 필터: 이름 검색
    );

  // 장소 클릭 핸들러
  const handleLocationClick = (location: GetHospitalInfoRespDto) => {
    setSelectedLocation(location);
  };
  const handleSearchPageSize = () => {
    setPageSize((prev) => prev + 5);
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
          <CustomButton
            $label="더보기"
            $sizeType="long"
            onClick={handleSearchPageSize}
            className="mt-10"
          />
        </section>
      </article>

      {/* 지도 컴포넌트 */}
      <aside className="w-[800px] border-l h-full border-gray-300 ml-10">
        {selectedLocation && (
          <GoogleMapApiData
            latitude={selectedLocation?.y}
            longitude={selectedLocation?.x}
            name={selectedLocation?.name}
            tel={selectedLocation?.tel ?? "연락처없음"}
            address={
              selectedLocation?.add2 ??
              selectedLocation.add1 ??
              "주소 정보 없음"
            }
          />
        )}
      </aside>
    </div>
  );
}
