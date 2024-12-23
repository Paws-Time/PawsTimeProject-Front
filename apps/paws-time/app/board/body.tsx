"use client";

import { useRouter } from "next/navigation";
import { useGetBoardList } from "../lib/codegen/hooks/board/board";
import useBoardState from "../hooks/boardStore";
import useSideBarStore from "../hooks/sidebarStore";

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
  const { boardState, boardAction } = useBoardState();
  const { pageNo, pageSize, sortBy, direction } = boardState;
  // const { setPageNo, setPageSize, setSortBy, setDirection } = boardAction;

  const params = {
    pageNo, // 여기서 숫자 값으로 바로 사용
    pageSize,
    sortBy,
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

  return (
    <div className="flex w-full h-custom-boardh">
      {isShow && <div className="flex w-custom-sidew" />}
      {/* 보더 목록 */}
      <div className="p-4 gap-4 flex flex-col w-4/5">
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
      </div>
    </div>
  );
}
