"use client";
import CreateBoard from "../components/board/createBoard";
import MainBoard from "../components/board/mainBoard";
import useStore from "../hooks/store";

export default function BoardPage() {
  const { currentComponent } = useStore(); // Zustand의 상태와 액션 사용

  return (
    <div className="w-custom-width h-custom-height">
      {(() => {
        switch (currentComponent) {
          case "board":
            return <MainBoard />;
          case "create":
          return <CreateBoard />;
          case "login":
          // return <Login />;
          default:
            return <div>잘못된 컴포넌트 상태입니다.</div>;
        }
      })()}
    </div>
  );
}
