"use client";
import { Card } from "../icons/card";
import { InputField } from "../icons/input";
import { CustomButton } from "../icons/button";
import useStore from "@/app/hooks/store";
import Sidebar from "../sidebar";

export default function MainBoard() {
  const { isSidebarOpen, toggleSidebar, toggleComponent } = useStore(); // Zustand 훅 사용
  // 사이드바 토글 핸들러
  const sidebarHandle = () => {
    toggleSidebar();
  };
  return (
    <div className="flex flex-row pt-0 w-custom-width h-custom-height">
      {isSidebarOpen && (
        <div className="w-custom-sidew h-custom-sideh">
          <Sidebar />
        </div>
      )}
      <div className="flex flex-col w-custom-boardw h-custom-boardh">
        {/* 검색 및 필터 폼 */}
        <form className="flex w-10 h-10 mb-5 px-4">
          {/* 필터 Dropdown */}
          <select
            value="all"
            onChange={(e) => console.log(e.target.value)}
            className="border border-gray-300 mr-5 h-[40px] px-2"
          >
            <option value="all">전체보기</option>
            <option value="Photo">사진겔러리</option>
            <option value="Review">리뷰겔러리</option>
          </select>

          {/* 검색창 */}
          <InputField
            label="검색할 내용을 적어주세요"
            type="text"
            value=""
            onChange={(e) => console.log(e.target.value)}
          />

          {/* 검색 버튼 */}
          <CustomButton label="검색" onClick={() => {}} sizetype="normal" />

          <CustomButton
            label="새글 쓰기"
            sizetype="normal"
            onClick={() => toggleComponent("create")}
          />
        </form>
        <div className="flex flex-row items-center">
          {/* 사이드바 토글 버튼 */}
          <div className="flex justify-start w1 px-4 mb-3">
            {isSidebarOpen ? (
              <CustomButton label="◀" onClick={sidebarHandle} sizetype="mini" />
            ) : (
              <CustomButton label="▶" onClick={sidebarHandle} sizetype="mini" />
            )}
          </div>
          <div>
            {/* 카드 목록 */}
            <div
              className={`p-4 gap-10 grid ${
                isSidebarOpen ? "grid-cols-3" : "grid-cols-4"
              }`}
            >
              {Array(12)
                .fill(null)
                .map((_, index) => (
                  <Card key={index} />
                ))}
              {/* 페이지 네이션 */}
              <div className="flex justify-center items-center mt-6">
                <button className="px-4 py-2 mx-1 border rounded">1</button>
                <button className="px-4 py-2 mx-1 border rounded">2</button>
                <button className="px-4 py-2 mx-1 border rounded">3</button>
                <span className="px-4 py-2 mx-1">...</span>
                <button className="px-4 py-2 mx-1 border rounded">10</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-custom-sidew h-custom-sideh" />
    </div>
  );
}
