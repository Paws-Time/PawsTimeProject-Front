"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { formStyles } from "../styles/forms";
import {
  getHospitalInfo,
  getShelterInfo,
} from "../lib/codegen/hooks/info/info"; // ✅ 보호소 API 추가
import { CustomButton } from "@/components/utils/button";
import Modal from "@/components/modal";
import Mapdetail from "@/components/mapdetail";
import { useModalStore } from "../hooks/modalStore";

// 병원 및 보호소 정보 인터페이스
interface GetLocationInfoRespDto {
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

export default function InfoBoardWithMap() {
  const [locations, setLocations] = useState<GetLocationInfoRespDto[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<GetLocationInfoRespDto>({
      id: 0,
      name: "서울역",
      add1: "서울특별시 중구 봉래동2가",
      tel: "02-123-4567",
      x: 37.5561,
      y: 126.9723,
    });

  const [regionFilter, setRegionFilter] = useState(6);
  const [nameFilter, setNameFilter] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [infoType, setInfoType] = useState("hospital"); // ✅ 병원/보호소 선택 추가
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInitialized = useRef(false);
  const [initializedLocationId, setInitializedLocationId] = useState<
    number | null | undefined
  >(null);
  const { openModal } = useModalStore();

  // 병원 및 보호소 정보 가져오기
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        let response;
        if (infoType === "hospital") {
          response = await getHospitalInfo(regionFilter, {
            pageNo: 0,
            pageSize,
            sortBy: "",
            direction: "DESC",
          });
        } else {
          response = await getShelterInfo(regionFilter, {
            pageNo: 0,
            pageSize,
            sortBy: "",
            direction: "DESC",
          });
        }
        setLocations(response?.data || []);
      } catch (error) {
        console.error("Error fetching info:", error);
      }
    };
    fetchInfo();
  }, [regionFilter, pageSize, infoType]); // ✅ infoType 추가

  // 지도 초기화
  useEffect(() => {
    if (
      selectedLocation &&
      mapRef.current &&
      selectedLocation.id !== initializedLocationId
    ) {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
        version: "weekly",
      });

      loader.load().then(() => {
        if (mapRef.current) {
          const map = new google.maps.Map(mapRef.current, {
            center: {
              lat: Number(selectedLocation.y) || 126.9723,
              lng: Number(selectedLocation.x) || 37.5561,
            },
            zoom: 14,
          });

          const marker = new google.maps.Marker({
            position: {
              lat: Number(selectedLocation.y) || 126.9723,
              lng: Number(selectedLocation.x) || 37.5561,
            },
            map: map,
            title: selectedLocation.name || "Location",
          });

          marker.addListener("click", () => {
            openModal();
          });

          setInitializedLocationId(selectedLocation.id);
        }
      });
    }
  }, [selectedLocation, initializedLocationId]);

  // 필터링된 병원/보호소 목록
  const filteredLocations = locations
    .filter((location) => location.addNum === regionFilter)
    .filter((location) =>
      nameFilter ? location?.name?.includes(nameFilter) : true
    );

  const handleLocationClick = (location: GetLocationInfoRespDto) => {
    setSelectedLocation(location);
    mapInitialized.current = false;
  };

  return (
    <div className="flex w-custom-width">
      <div className="w-custom-sidew"></div>
      <article className="flex flex-col w-[350px] h-full">
        <nav className="h-[50px] border-b border-gray-300 flex justify-between items-center px-4">
          {/* 지역 선택 필터 */}
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

          {/* ✅ 병원/보호소 전환 필터 */}
          <select
            value={infoType}
            onChange={(e) => setInfoType(e.target.value)}
          >
            <option value="hospital">병원</option>
            <option value="shelter">보호소</option>
          </select>
        </nav>

        {/* 이름 검색 필터 */}
        <form className="input" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            placeholder="이름을 입력하세요"
            style={formStyles.input}
            required
          />
        </form>

        <section className="h-[500px] p-4">
          <h2 className="text-lg font-bold mb-4">
            {infoType === "hospital" ? "병원 목록" : "보호소 목록"}
          </h2>
          {/* 병원/보호소 목록 */}
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

      {/* 지도 및 상세 정보 */}
      <aside className="w-[800px] border-l h-full border-gray-300 ml-10">
        <div
          ref={mapRef}
          id="map"
          className="w-[800px] h-[800px] relative ml-20 mt-10"
        />
        {selectedLocation && (
          <Modal>
            <Mapdetail
              name={selectedLocation.name}
              tel={selectedLocation.tel}
              address={
                selectedLocation.add2 ||
                selectedLocation.add1 ||
                "주소 정보 없음"
              }
            />
          </Modal>
        )}
      </aside>
    </div>
  );
}
