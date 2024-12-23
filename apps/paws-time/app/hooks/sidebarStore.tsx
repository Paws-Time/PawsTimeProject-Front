"use client";

import { create } from "zustand";

interface AppState {
  sideBarState: {
    isSidebarOpen: boolean;
    isShow: boolean;
  };

  sideBarActions: {
    toggleSidebar: () => void;
    toggleIsShow: () => void;
  };
}

const useSideBarStore = create<AppState>((set) => ({
  // 상태 정의
  sideBarState: {
    isSidebarOpen: false,
    isShow: false,
  },

  // 액션 정의
  sideBarActions: {
    toggleSidebar: () =>
      set((store) => ({
        sideBarState: {
          ...store.sideBarState,
          isSidebarOpen: !store.sideBarState.isSidebarOpen,
        },
      })),
    toggleIsShow: () =>
      set((store) => ({
        sideBarState: {
          ...store.sideBarState,
          isShow: !store.sideBarState.isShow,
        },
      })),
  },
}));

export default useSideBarStore;
