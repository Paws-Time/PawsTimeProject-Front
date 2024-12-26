"use client";

import { useRouter } from "next/navigation";
import { useGetBoardList } from "../lib/codegen/hooks/board/board";
import useSideBarStore from "../hooks/sidebarStore";
import useBoardStore from "../hooks/boardStore";
import { useState } from "react";
import { CustomButton } from "@/components/utils/button";
import { postFormStyles } from "../styles/postforms";
import { getPosts, useGetPosts } from "../lib/codegen/hooks/post/post";

interface Board {
  boardId: number;
  title: string;
  description: string;
  createdAt: string;
  isDelete?: boolean;
  updatedAt?: string;
}

export default function BoardList() {
  const router = useRouter();
  const { sideBarState } = useSideBarStore();
  const { isShow } = sideBarState;
  const [pageSize, setPageSize] = useState(5);
  const [direction, setDirection] = useState("DESC");
  // const { setPageNo, setPageSize, setSortBy, setDirection } = boardAction;

  const params = {
    pageNo: 0,
    pageSize,
    sortBy: "createdAt",
    direction,
  };

  // 보더 데이터 가져오기
  const { data, isLoading, isError } = useGetBoardList<{
    status: string;
    message: string | null;
    data: Board[];
  }>(params);

  // 데이터가 없는 경우 빈 배열로 설정
  const boards = data?.data || [];
  // 로딩 상태 처리
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 에러 상태 처리
  if (isError) {
    return <div>Error occurred while fetching boards.</div>;
  }
  //페이지 넘기기
  const handlePage = () => {
    setPageSize((prev) => prev + 5);
  };
  return (
    <div className="flex w-full h-custom-boardh">
      {isShow && <div className="flex w-custom-sidew" />}
      {/* 보더 목록 */}
      <div className="p-4 gap-4 flex flex-col w-4/5">
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          style={postFormStyles.select}
        >
          <option value="desc">최신순</option>
          <option value="asc">오래된순</option>
        </select>
        {boards.map((board) => (
          <div
            key={board.boardId}
            onClick={() => router.push(`board/boards/${board.boardId}`)}
            className="border border-gray-300 p-4 rounded cursor-pointer hover:bg-gray-100"
          >
            <h2 className="text-lg font-bold">{board.title}</h2>
            <p className="text-sm text-gray-600">{board.description}</p>
            <p className="text-xs text-gray-400">
              생성일: {new Date(board.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
        <CustomButton $label="더보기" $sizeType="long" onClick={handlePage} />
      </div>
    </div>
  );
}
