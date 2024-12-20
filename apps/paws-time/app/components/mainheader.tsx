import React from "react";

function mainheader() {
  return (
    <div>
      <header className="flex items-center justify-between w-full h-screen bg-gray-200 px-6 shadow-md">
        <div className="flex items-center">
          <div className="w-20 h-20 bg-gray-400 rounded-full"></div>
          <span className="ml-4 font-bold text-lg">PAWS TIME</span>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
          <div className="ml-3 hidden sm:block">
            <p className="text-sm font-medium">Olivia Rhye</p>
            <p className="text-xs text-gray-500">olivia@untitledui.com</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default mainheader;
