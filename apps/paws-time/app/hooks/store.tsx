"use client";

import { create } from "zustand";

interface AppState {
  isModalOpen: boolean;
  isSidebarOpen: boolean;
  currentComponent: string;

  toggleSidebar: () => void;
  toggleModal: () => void;
  toggleComponent: (component: string) => void;
}

const useStore = create<AppState>((set) => ({
  isModalOpen: false,
  isSidebarOpen: false,
  currentComponent: "board",
  post: [],

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  toggleComponent: (component: string) =>
    set(() => ({ currentComponent: component })),
}));

export default useStore;
