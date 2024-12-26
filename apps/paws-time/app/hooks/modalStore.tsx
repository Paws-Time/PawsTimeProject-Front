import { create } from "zustand";

interface ModalStore {
  modalState: boolean; // 모달 상태 (열림/닫힘)
  openModal: () => void; // 모달 열기
  closeModal: () => void; // 모달 닫기
}

export const useModalStore = create<ModalStore>((set) => ({
  modalState: false,
  openModal: () => set(() => ({ modalState: true })), // 모달 열기
  closeModal: () => set(() => ({ modalState: false })), // 모달 닫기
}));
