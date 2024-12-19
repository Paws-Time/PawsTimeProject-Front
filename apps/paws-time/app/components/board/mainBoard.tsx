"use client";
import { useState } from "react";
import { Card } from "../icons/card";
import { InputField } from "../icons/input";
import { CustomButton } from "../icons/button";
import Sidebar from "./sidebar";

export default function MainBoard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true); // 사이드바 상태

  // 사이드바 토글 핸들러
  const toggleSidebar = (): void => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-row pt-0">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="transition-all duration-100 w-1/6 bg-gray-200">
          <Sidebar />
        </div>
      )}
      <div
        className={`flex flex-col ${
          isSidebarOpen ? "w-5/6" : "w-full"
        } ml-5 h-full p-4 bg-gray-50 transition-all duration-100`}
      >
        <div className="flex">
          {/* 검색 및 필터 폼 */}
          <form className="flex w-custom-boardw h-15 mb-5">
            {/* 필터 Dropdown */}
            <select
              value="all"
              onChange={(e) => console.log(e.target.value)}
              className="border border-gray-300 mr-5 h-10"
            >
              <option value="all">전체보기</option>
              <option value="Photo">사진겔러리</option>
              <option value="Review">리뷰겔러리</option>
            </select>

            {/* 검색창 */}
            <InputField
              label="검색할 내용을 적어주세요"
              type="text"
              className="w-3/2 mr-5 h-10"
              value=""
              onChange={(e) => console.log(e.target.value)}
            />

            {/* 검색 버튼 */}
            <CustomButton
              label="검색"
              type="submit"
              className="ml-5 h-10 w-1/6"
            />
          </form>
          <CustomButton label="새글 쓰기" className="h-10 w-1/5" />
        </div>

        <div className="flex flex-row items-center">
          {/* 사이드바 토글 버튼 */}
          <CustomButton
            label={isSidebarOpen ? "<<" : ">>"}
            onClick={toggleSidebar}
            className="mr-10"
          >
            {isSidebarOpen ? "사이드바 닫기" : "사이드바 열기"}
          </CustomButton>
          {/* 카드 목록 */}
          <div className="p-4 gap-3 grid grid-cols-4 overflow-y-auto">
            {Array(12)
              .fill(null)
              .map((_, index) => (
                <Card key={index} />
              ))}
          </div>
        </div>
        {/* 페이지 네이션 */}
        <div className="flex justify-center items-center mt-6">
          <button className="px-3 py-1 mx-1 border rounded">1</button>
          <button className="px-3 py-1 mx-1 border rounded">2</button>
          <button className="px-3 py-1 mx-1 border rounded">3</button>
          <span className="px-3 py-1 mx-1">...</span>
          <button className="px-3 py-1 mx-1 border rounded">10</button>
        </div>
      </div>
    </div>
  );
}
