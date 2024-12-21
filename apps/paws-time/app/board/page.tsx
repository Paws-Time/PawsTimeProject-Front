"use client";
import MainBoard from "../components/board/mainBoard";
import useStore from "../hooks/store";
import BoardWritePage from "./write/page";

export default function BoardPage() {
  const { currentComponent } = useStore(); // Zustand의 상태와 액션 사용

  return (
    <div className="flex">
      <div className="w-custom-sidew"></div>
      <div className="w-custom-width h-custom-height">
        {(() => {
          switch (currentComponent) {
            case "board":
              return <MainBoard />;
            case "create":
              return <BoardWritePage />;
            case "login":
            // return <Login />;
            default:
              return <div>잘못된 컴포넌트 상태입니다.</div>;
          }
        })()}
      </div>
    </div>
  );
}
