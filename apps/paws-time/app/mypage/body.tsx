"use client";

import React, { useState } from "react";
import "../styles/css/mypage.css";

const MyPage = () => {
  const [selectedOption, setSelectedOption] = useState("recentPosts");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="mypage-container">
      {/* 프로필 섹션 */}
      <div className="profile-section">
        <p>이미지</p>
        <h2 className="profile-name">Chris James</h2>
        <p className="profile-bio">
          Hey, I'm Chris and a hobby photographer from Canada.
        </p>
      </div>

      {/* 게시글 섹션 */}
      <div className="content-section">
        <select
          className="content-filter"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="recentPosts">최근에 쓴 게시글</option>
          <option value="recentComments">최근에 댓글 단 게시글</option>
          <option value="recentLikes">최근에 좋아요 누른 게시글</option>
        </select>

        <div className="content-display">
          {selectedOption === "recentPosts" && (
            <p>최근에 쓴 게시글을 표시합니다.</p>
          )}
          {selectedOption === "recentComments" && (
            <p>최근에 댓글 단 게시글을 표시합니다.</p>
          )}
          {selectedOption === "recentLikes" && (
            <p>최근에 좋아요 누른 게시글을 표시합니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
