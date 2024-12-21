"use client";

import { create } from "zustand";

interface AppState {
  isModalOpen: boolean;
  isSidebarOpen: boolean;
  currentComponent: string;
  isShow: boolean;

  toggleSidebar: () => void;
  toggleModal: () => void;
  toggleComponent: (component: string) => void;
  toggleIsShow: () => void;
}

const useStore = create<AppState>((set) => ({
  isModalOpen: false,
  isSidebarOpen: false,
  currentComponent: "board",
  isShow: false,
  post: [],

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  toggleComponent: (component: string) =>
    set(() => ({ currentComponent: component })),
  toggleIsShow: () => set((state: AppState) => ({ isShow: !state.isShow })),
}));

export default useStore;
