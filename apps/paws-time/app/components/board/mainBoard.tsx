"use client";
import { Card } from "../icons/card";
import { InputField } from "../icons/input";
import { CustomButton } from "../icons/button";
import useStore from "@/app/hooks/store";
import { useEffect, useState } from "react";
import { fetchBoards } from "@/app/service/api";

export default function MainBoard() {
  const { toggleComponent } = useStore(); // Zustand 훅 사용
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const getBoards = async () => {
      try {
        const boardData = await fetchBoards();
        setBoards(boardData); // 데이터 상태에 저장
      } catch (error) {
        console.error("Failed to fetch boards:", error);
      }
    };

    getBoards();
  }, []);

  return (
    <div className="flex flex-col w-custom-boardw h-custom-boardh">
      {/* 검색 및 필터 폼 */}
      <form className="flex w-10 h-10 mb-5 px-4">
        {/* 필터 Dropdown */}
        <select
          value="all"
          onChange={(e) => console.log(e.target.value)}
          className="border border-gray-300 mr-5 h-[40px] px-2"
        >
          <option value="default">전체보기</option>
          <option value="TECH">기술</option>
          <option value="LIFESTYLE">라이프스타일</option>
          <option value="EDUCATION">교육</option>
          <option value="ENTERTAINMENT">유머</option>
        </select>

        {/* 검색창 */}
        <InputField
          label="검색할 내용을 적어주세요"
          type="text"
          value=""
          onChange={(e) => console.log(e.target.value)}
        />

        {/* 검색 버튼 */}
        <CustomButton $label="검색" onClick={() => {}} $sizeType="long" />

        <CustomButton
          $label="새글 쓰기"
          $sizeType="long"
          onClick={() => toggleComponent("create")}
        />
      </form>
      <div>
        {/* 카드 목록 */}
        <div className={"p-4 gap-10 grid grid-cols-5"}>
          {boards.map((board) => (
            <Card
              key={board.boardId}
              boardId={board.boardId}
              title={board.title}
              description={board.description}
              createdAt={board.createdAt}
              updatedAt={board.updatedAt}
            />
          ))}
        </div>

        {/* 페이지 네이션 */}
        <div className="flex justify-center items-center mt-6">
          <button className="px-4 py-2 mx-1 border rounded">1</button>
          <button className="px-4 py-2 mx-1 border rounded">2</button>
          <button className="px-4 py-2 mx-1 border rounded">3</button>
          <span className="px-4 py-2 mx-1">...</span>
          <button className="px-4 py-2 mx-1 border rounded">10</button>
          {/* 필터 Dropdown */}
          <select
            value="all"
            onChange={(e) => console.log(e.target.value)}
            className="border border-gray-300 mr-5 h-[40px] px-2"
          >
            <option value="five">5개씩 조회</option>
            <option value="ten">10개씩 조회</option>
          </select>
          <select
            value="all"
            onChange={(e) => console.log(e.target.value)}
            className="border border-gray-300 mr-5 h-[40px] px-2"
          >
            <option value="decs">내림차순</option>
            <option value="asc">오름차순</option>
          </select>
        </div>
      </div>
    </div>
  );
}
