import useBoardStore from "@/app/hooks/boardStore";
import {
  directionDescription,
  SortBy,
  sortByDescription,
  Direction,
} from "@/app/lib/policy";

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
          {Object.entries(sortByDescription).map(([key, description]) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="radio"
                name={sortBy}
                value={key}
                checked={sortBy === key}
                onChange={() => setSortBy(key as SortBy)}
              />
              <span>{description}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 정렬 방향 */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold">정렬 방향</h4>
        <div className="space-y-2">
          {Object.entries(directionDescription).map(([key, description]) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="radio"
                name="direction"
                value={key}
                checked={direction === key}
                onChange={() => setDirection(key as Direction)}
              />
              <span>{description}</span>
            </label>
          ))}
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
