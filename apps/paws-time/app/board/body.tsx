"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CustomButton } from "@/components/utils/button";
import { deleteBoard, useGetBoardList } from "../lib/codegen/hooks/board/board";
import { Direction, directionBoardDescription } from "@/app/lib/policy";
import { postFormStyles } from "../styles/postforms";

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
  const [direction, setDirection] = useState<Direction>(Direction.DESC);
  const [pageSize, setPageSize] = useState(3);
  const [boardId, setBoardId] = useState(0);

  const params = {
    pageNo: 0,
    pageSize,
    sortBy: "createdAt", // 항상 날짜순 정렬
    direction,
  };
  const handleDirectionChange = (newDirection: Direction) => {
    setDirection(newDirection);
  };

  const { data, isLoading, isError } = useGetBoardList<{
    status: string;
    message: string | null;
    data: Board[];
  }>(params);

  const boards = data?.data || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching boards.</div>;
  }

  // 페이지 넘기기
  const handlePage = () => {
    setPageSize((prev) => prev + 5);
  };

  return (
    <div className="flex w-full justify-center overflow-x-hidden">
      <div className="w-custom-sidew" />
      <div className="p-4 gap-4 w-full flex flex-col">
        {/* 정렬 방향 선택 */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            {Object.entries(directionBoardDescription).map(
              ([key, description]) => (
                <label key={key} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="direction"
                    value={key}
                    checked={direction === key}
                    onChange={() => handleDirectionChange(key as Direction)}
                  />
                  <span>{description}</span>
                </label>
              )
            )}
          </div>

          <CustomButton
            $label="새 게시판"
            $sizeType="normal"
            onClick={() => router.push(`/board/createBoard`)}
          />
        </div>

        {/* 게시판 목록 */}
        <div className="flex flex-col space-y-4">
          {boards.map((board) => (
            <div
              key={board.boardId}
              onClick={() => router.push(`board/boards/${board.boardId}`)}
              className="border border-gray-300 p-4 rounded cursor-pointer hover:bg-gray-100 flex justify-between"
            >
              <div className="flex flex-col">
                <h2 className="text-lg font-bold">{board.title}</h2>
                <p className="text-sm text-gray-600">{board.description}</p>
                <p className="text-xs text-gray-400">
                  생성일: {new Date(board.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div style={postFormStyles.buttonBox}>
                <button
                  style={{
                    ...postFormStyles.button,
                    ...postFormStyles.deleteButton,
                  }}
                  onClick={() => {
                    deleteBoard(board.boardId);
                  }}
                >
                  삭제
                </button>
                <button
                  style={{
                    ...postFormStyles.button,
                    ...postFormStyles.editButton,
                  }}
                  onClick={() => {
                    router.push(`/boards/${board.boardId}/edit`);
                  }}
                >
                  수정
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <CustomButton $label="더보기" $sizeType="long" onClick={handlePage} />
        </div>
      </div>
    </div>
  );
}
