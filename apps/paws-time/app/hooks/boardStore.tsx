import { create } from "zustand";

// 타입 정의
type PageSize = 4 | 8 | 12;
type SortBy = "views" | "likesCount" | "title" | "createdAt";
type Direction = "DESC" | "ASC";

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
    sortBy: "createdAt",
    direction: "DESC",
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
