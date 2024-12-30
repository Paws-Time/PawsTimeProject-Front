import React from "react";
import { useModalStore } from "@/app/hooks/modalStore";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const { modalState, closeModal } = useModalStore();

  if (!modalState) return null; // 모달 상태가 false면 렌더링하지 않음

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={closeModal} style={styles.closeButton}>
          닫기
        </button>
        {children}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // 배경 어둡게
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    width: "80%",
    maxWidth: "500px",
    textAlign: "center" as const,
    position: "relative" as const,
  },
  closeButton: {
    position: "absolute" as const,
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Modal;
