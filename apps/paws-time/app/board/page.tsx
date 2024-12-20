"use client";
import Sidebar from "../components/sidebar";
import MainBoard from "../components/board/mainBoard";
import useStore from "../hooks/store";

export default function Page() {
  const { isSidebarOpen } = useStore(); // Sidebar 상태 가져오기

  return (
    <div className="flex flex-col w-custom-width h-custom-height">
      {/* Header */}

      <div className="flex flex-row flex-grow">
        {/* Sidebar */}
        {isSidebarOpen ? (
          <div>
            <div className="w-custom-sidew h-custom-sideh">
              <Sidebar />
            </div>
            <div className="w-custom-boardw h-custom-boardh">
              <MainBoard />
            </div>
          </div>
        ) : (
          <div className="w-custom-width h-custom-boardh">
            <MainBoard />
          </div>
        )}
      </div>
    </div>
  );
}
