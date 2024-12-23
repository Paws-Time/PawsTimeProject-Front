"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "../hooks/store";
import { useGetBoardList } from "../lib/codegen/hooks/board/board";

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
  const [boards, setBoards] = useState<Board[]>([]);
  const { isShow } = useStore();

  // 보더 데이터 가져오기
  const { data, isLoading, isError } = useGetBoardList();

  useEffect(() => {
    if (data) {
      setBoards(data.data || []); // API로부터 받은 데이터를 상태에 저장
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>보더 데이터를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <div className="flex w-full h-custom-boardh">
      {isShow && <div className="flex w-custom-sidew " />}
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
