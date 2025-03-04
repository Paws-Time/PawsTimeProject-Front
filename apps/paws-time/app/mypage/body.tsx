"use client";

import React, { useState, useRef } from "react";
import "../styles/css/mypage.css";
import { useAuth } from "@/app/hooks/authStore"; // ✅ 로그인 정보 가져오기

const MyPage = () => {
  const { nick } = useAuth(); // ✅ 현재 로그인한 사용자의 닉네임 가져오기
  const [selectedOption, setSelectedOption] = useState("recentPosts");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 아이콘 클릭 시 파일 업로드 트리거
  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mypage-container">
      {/* 프로필 섹션 */}
      <div className="profile-section">
        <div className="profile-image-container">
          <div className="profile-image">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="profile-img"
              />
            ) : (
              <p>이미지 없음</p>
            )}
          </div>
          {/* Material Icons 사용 */}
          <span
            className="material-symbols-outlined profile-settings-icon"
            onClick={handleIconClick}
          >
            settings
          </span>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />

        {/* ✅ 로그인한 사용자의 닉네임 표시 */}
        <h2 className="nick">{nick ?? "알 수 없음"}</h2>
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
