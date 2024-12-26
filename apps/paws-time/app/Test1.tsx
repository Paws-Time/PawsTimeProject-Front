"use client";

import React, { useEffect } from "react";
import axios from "axios";

export const BoardList = () => {
  useEffect(() => {
    const fetchBoardList = async () => {
      try {
        // 게시판 목록 조회 API 호출
        const response = await axios.get(
          "http://43.200.46.13:8080/board/list",
          {
            params: {
              pageNo: 0,
              pageSize: 10,
              sortBy: "createdAt",
              direction: "DESC",
            },
          }
        );
        console.log("게시판 목록 데이터:", response.data); // 데이터 출력
      } catch (error) {
        console.error("게시판 목록 조회 실패:", error);
      }
    };

    fetchBoardList();
  }, []);

  return <div>게시판 목록을 가져오는 중입니다. 콘솔을 확인하세요.</div>;
};
