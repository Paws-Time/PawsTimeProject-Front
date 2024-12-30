import React from "react";

type MapInfo = {
  name: string;
  address: string;
  tel: string;
};

function Mapdetail({ name, address, tel }: MapInfo) {
  console.log(name, address, tel);

  const handleNaverSearch = () => {
    const naverUrl = `https://map.naver.com/v5/search/${encodeURIComponent(address)}`;
    window.open(naverUrl, "_blank");
  };

  const handleKakaoSearch = () => {
    const kakaoUrl = `https://map.kakao.com/?q=${encodeURIComponent(address)}`;
    window.open(kakaoUrl, "_blank");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-[450px] h-[200px]">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">{name}</h2>
      </div>
      <p className="text-sm text-gray-600 mt-2">{address}</p>
      <p className="text-sm text-gray-600">{tel}</p>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleNaverSearch}
          className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
        >
          네이버 지도에서 검색
        </button>
        <button
          onClick={handleKakaoSearch}
          className="bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-600"
        >
          카카오 지도에서 검색
        </button>
      </div>
    </div>
  );
}

export default Mapdetail;
