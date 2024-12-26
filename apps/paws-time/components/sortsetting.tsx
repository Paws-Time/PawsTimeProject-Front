import useBoardStore from "@/app/hooks/boardStore";
import React from "react";

function SortSetting() {
  const { boardState, boardActions } = useBoardStore();
  const { pageSize, sortBy, direction } = boardState;
  const { setPageSize, setSortBy, setDirection } = boardActions;

  return (
    <div className="mainContent">
      <div className="checkBox">
        {/* 정렬 기준 */}
        <div>
          <h4>정렬 기준</h4>
          <label>
            <input
              type="radio"
              name="sortBy"
              value="title"
              checked={sortBy === "title"}
              onChange={() => setSortBy("title")}
            />
            제목순
          </label>
          <label>
            <input
              type="radio"
              name="sortBy"
              value="likes_count"
              checked={sortBy === "likesCount"}
              onChange={() => setSortBy("likesCount")}
            />
            좋아요순
          </label>
          <label>
            <input
              type="radio"
              name="sortBy"
              value="views"
              checked={sortBy === "views"}
              onChange={() => setSortBy("views")}
            />
            조회순
          </label>
          <label>
            <input
              type="radio"
              name="sortBy"
              value="create_At"
              checked={sortBy === "createdAt"}
              onChange={() => setSortBy("createdAt")}
            />
            작성일자순
          </label>
        </div>

        {/* 정렬 방향 */}
        <div>
          <h4>정렬 방향</h4>
          <label>
            <input
              type="radio"
              name="direction"
              value="ASC"
              checked={direction === "ASC"}
              onChange={() => setDirection("ASC")}
            />
            오름차순
          </label>
          <label>
            <input
              type="radio"
              name="direction"
              value="DESC"
              checked={direction === "DESC"}
              onChange={() => setDirection("DESC")}
            />
            내림차순
          </label>
        </div>

        {/* 페이지 크기 */}
        <div className="pageSize">
          <h4>페이지 크기</h4>
          <select
            className=""
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
