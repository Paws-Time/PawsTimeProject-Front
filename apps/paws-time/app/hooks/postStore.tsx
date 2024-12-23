import { create } from "zustand";

type sizeType = 3 | 5 | 10;
type sortType = string;

interface AppState {
  postState: {
    keyword: string;
    page: number;
    size: sizeType;
    sort: sortType;
  };
  postAction: {
    setKeyword: (keyword: string) => void;
    setPage: (page: number) => void;
    setPageSize: (pageSize: sizeType) => void;
    setSortBy: (sort: sortType) => void;
  };
}

const usePostStore = create<AppState>((set) => ({
  // 상태 초기화
  postState: {
    keyword: "",
    page: 0,
    size: 10,
    sort: "createdAt,desc",
  },

  // 상태 변경 함수 초기화
  postAction: {
    setKeyword: (keyword) =>
      set((state) => ({
        postState: { ...state.postState, keyword },
      })),
    setPage: (page) =>
      set((state) => ({
        postState: { ...state.postState, page },
      })),
    setPageSize: (pageSize) =>
      set((state) => ({
        postState: { ...state.postState, size: pageSize },
      })),
    setSortBy: (sort) =>
      set((state) => ({
        postState: { ...state.postState, sort },
      })),
  },
}));

export default usePostStore;
