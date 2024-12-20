import React from "react";

function CreateBoard() {
  return (
    <div className="flex items-center justify-center w-[1150px] h-[750] ">
      <div className="relative w-[600px]">
        {/* 첫 번째 카드 (뒷배경) */}
        <div className="absolute top-6 left-6 w-full h-[500px] bg-white rounded-lg shadow-lg"></div>

        {/* 두 번째 카드 (앞배경) */}
        <div className="relative w-full h-[500px] bg-white rounded-lg shadow-xl p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium">Label</label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                rows={3}
                placeholder="Value"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Label</label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                rows={3}
                placeholder="Value"
              />
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-md cursor-pointer">
                <span className="text-2xl font-bold">+</span>
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Label</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Value"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-teal-500 text-white font-medium px-6 py-2 rounded-md shadow-md hover:bg-teal-600 focus:ring-2 focus:ring-teal-400"
              >
                글 저장하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBoard;
