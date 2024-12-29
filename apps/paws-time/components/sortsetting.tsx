import useBoardStore from "@/app/hooks/boardStore";
import React from "react";

function SortSetting() {
  const { boardState, boardActions } = useBoardStore();
  const { pageSize, sortBy, direction } = boardState;
  const { setPageSize, setSortBy, setDirection } = boardActions;

  return (
    <div className="p-6 space-y-6">
      {/* 정렬 기준 */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold">정렬 기준</h4>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="sortBy"
              value="title"
              checked={sortBy === "title"}
              onChange={() => setSortBy("title")}
            />
            <span>제목순</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="sortBy"
              value="likes_count"
              checked={sortBy === "likesCount"}
              onChange={() => setSortBy("likesCount")}
            />
            <span>좋아요순</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="sortBy"
              value="views"
              checked={sortBy === "views"}
              onChange={() => setSortBy("views")}
            />
            <span>조회순</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="sortBy"
              value="create_At"
              checked={sortBy === "createdAt"}
              onChange={() => setSortBy("createdAt")}
            />
            <span>작성일자순</span>
          </label>
        </div>
      </div>

      {/* 정렬 방향 */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold">정렬 방향</h4>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="direction"
              value="ASC"
              checked={direction === "ASC"}
              onChange={() => setDirection("ASC")}
            />
            <span>오름차순</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="direction"
              value="DESC"
              checked={direction === "DESC"}
              onChange={() => setDirection("DESC")}
            />
            <span>내림차순</span>
          </label>
        </div>
      </div>

      {/* 페이지 크기 */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold">페이지 크기</h4>
        <div>
          <select
            className="form-select border border-gray-300 rounded-md p-2"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value) as 4 | 8 | 12)}
          >
            <option value="4">4개씩 조회</option>
            <option value="8">8개씩 조회</option>
            <option value="12">12개씩 조회</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SortSetting;
