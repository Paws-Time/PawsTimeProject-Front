"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CustomButton } from "@/components/utils/button";
import {
  deleteBoard,
  getBoardList,
  useGetBoardList,
} from "../lib/codegen/hooks/board/board";
import { Direction, directionBoardDescription } from "@/app/lib/policy";
import { postFormStyles } from "../styles/postforms";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/app/hooks/authStore"; // ✅ 사용자 권한 가져오기
import { AxiosError } from "axios";

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
  const { role } = useAuthStore(); // ✅ role 추가
  const [direction, setDirection] = useState<Direction>(Direction.DESC);
  const [pageSize, setPageSize] = useState(4);
  const [boardList, setBoardList] = useState<Board[]>([]);
  const params = {
    pageNo: 0,
    pageSize,
    sortBy: "createdAt", // 항상 날짜순 정렬
    direction,
  };
  const queryClient = useQueryClient();

  const handleDirectionChange = (newDirection: Direction) => {
    setDirection(newDirection);
  };

  const { data, isLoading, isError } = useGetBoardList<{
    status: string;
    message: string | null;
    data: Board[];
  }>(params);

  useEffect(() => {
    if (data?.data) {
      setBoardList(data?.data);
    }
  }, [data]);

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

  const handleDelete = async (boardId: number) => {
    try {
      const response = await deleteBoard(boardId); // 삭제 API 호출
      alert(response.message); // ✅ 백엔드에서 내려준 성공 메시지 출력
      setBoardList((prevList) =>
        prevList.filter((board) => board.boardId !== boardId)
      );
      queryClient.invalidateQueries({ queryKey: [getBoardList(params)] }); // ReactQuery의 캐시를 무효화
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message =
        axiosError.response?.data?.message ?? "게시판 삭제에 실패했습니다.";
      alert(message); // ✅ 백엔드에서 내려준 에러 메시지 출력
    }
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

          {/* ✅ ADMIN만 새 게시판 버튼 표시 */}
          {role === "ADMIN" && (
            <CustomButton
              $label="새 게시판"
              $sizeType="normal"
              onClick={() => router.push(`/board/createBoard`)}
            />
          )}
        </div>

        {/* 게시판 목록 */}
        <div className="flex flex-col space-y-4">
          {boardList.map((board) => (
            <div
              key={board.boardId}
              className="border border-gray-300 p-4 rounded cursor-pointer hover:bg-gray-100 flex justify-between"
            >
              <div
                className="flex flex-col w-4/5"
                onClick={() => router.push(`board/boards/${board.boardId}`)}
              >
                <h2 className="text-lg font-bold">{board.title}</h2>
                <p className="text-sm text-gray-600">{board.description}</p>
                <p className="text-xs text-gray-400">
                  생성일: {new Date(board.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* ✅ ADMIN만 삭제 및 수정 버튼 표시 */}
              {role === "ADMIN" && (
                <div style={postFormStyles.buttonBox}>
                  <button
                    style={{
                      ...postFormStyles.button,
                      ...postFormStyles.deleteButton,
                    }}
                    onClick={() => {
                      handleDelete(board.boardId);
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
                      router.push(`board/boards/${board.boardId}/edit`);
                    }}
                  >
                    수정
                  </button>
                </div>
              )}
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
