import { create } from "zustand";
import { SortBy, Direction } from "../lib/policy";

// 타입 정의
type PageSize = 4 | 8 | 12;

interface AppState {
  // 상태 (state)
  boardState: {
    pageSize: PageSize;
    sortBy: SortBy;
    direction: Direction;
  };

  // 상태 변경 함수 (actions)
  boardActions: {
    setPageSize: (pageSize: PageSize) => void;
    setSortBy: (sortBy: SortBy) => void;
    setDirection: (direction: Direction) => void;
  };
}

// Zustand 상태 관리
const useBoardStore = create<AppState>((set) => ({
  boardState: {
    pageSize: 8,
    sortBy: SortBy.CREATED_AT,
    direction: Direction.ASC,
  },
  boardActions: {
    setPageSize: (pageSize) =>
      set((state) => ({ boardState: { ...state.boardState, pageSize } })),
    setSortBy: (sortBy) =>
      set((state) => ({ boardState: { ...state.boardState, sortBy } })),
    setDirection: (direction) =>
      set((state) => ({ boardState: { ...state.boardState, direction } })),
  },
}));

export default useBoardStore;
