import { create } from "zustand";

// 타입 정의
type PageSize = 3 | 5 | 10;
type SortBy = "createdAt" | "createdDESC";
type Direction = "DESC" | "ASC";

interface AppState {
  // 상태 (state)
  boardState: {
    pageNo: number;
    pageSize: PageSize;
    sortBy: SortBy;
    direction: Direction;
  };

  // 상태 변경 함수 (actions)
  boardActions: {
    setPageNo: (pageNo: number) => void;
    setPageSize: (pageSize: PageSize) => void;
    setSortBy: (sortBy: SortBy) => void;
    setDirection: (direction: Direction) => void;
  };
}

// Zustand 상태 관리
const useBoardStore = create<AppState>((set) => ({
  boardState: {
    pageNo: 0,
    pageSize: 10,
    sortBy: "createdAt",
    direction: "DESC",
  },
  boardActions: {
    setPageNo: (pageNo) =>
      set((state) => ({ boardState: { ...state.boardState, pageNo } })),
    setPageSize: (pageSize) =>
      set((state) => ({ boardState: { ...state.boardState, pageSize } })),
    setSortBy: (sortBy) =>
      set((state) => ({ boardState: { ...state.boardState, sortBy } })),
    setDirection: (direction) =>
      set((state) => ({ boardState: { ...state.boardState, direction } })),
  },
}));

export default useBoardStore;
