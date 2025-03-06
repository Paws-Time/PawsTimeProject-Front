"use client";

import React, { useState, useRef, useEffect } from "react";
import "../styles/css/mypage.css"; // ✅ CSS 추가
import { useAuth } from "@/app/hooks/authStore";
import { useGetPosts } from "@/app/lib/codegen/hooks/post/post";
import { useRouter } from "next/navigation";
import { GetListPostRespDto } from "../lib/codegen/dtos";

const MyPage = () => {
  const { userId, nick } = useAuth();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("recentPosts");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [myPosts, setMyPosts] = useState<GetListPostRespDto[]>([]);

  const params = {
    page: 0,
    size: 10,
    sort: "createdAt,desc",
  };

  const { data: postsData } = useGetPosts(params, {
    query: {
      staleTime: 5 * 60 * 1000,
    },
  });

  useEffect(() => {
    if (postsData?.data && userId) {
      const userPosts = postsData.data.filter((post) => post.userId === userId);
      setMyPosts(userPosts);
    }
  }, [postsData, userId]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handlePostClick = (postId: number, boardId: number) => {
    router.push(`/board/boards/${boardId}/posts/${postId}`);
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
          <span
            className="material-symbols-outlined profile-settings-icon"
            onClick={() => fileInputRef.current?.click()}
          >
            settings
          </span>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => setImagePreview(reader.result as string);
              reader.readAsDataURL(file);
            }
          }}
          style={{ display: "none" }}
        />

        <div>
          <span className="nick">닉네임 : {nick ?? "알 수 없음"}</span>
          &nbsp;&nbsp;
          <button>수정</button>
        </div>

        <div>
          <input type="text" placeholder="새 비밀번호" />
          <button>수정</button>
        </div>
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
        </select>

        <div className="content-display">
          {/* ✅ 내가 쓴 게시글 */}
          {selectedOption === "recentPosts" && (
            <>
              {myPosts.length > 0 ? (
                <ul className="post-list">
                  {myPosts.map((post) => {
                    if (!post.id) return null; // ✅ id가 undefined이면 무시하고 넘어감
                    return (
                      <li
                        key={post.id}
                        onClick={() => handlePostClick(post.id!, post.boardId!)}
                      >
                        {post.title}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>작성한 게시글이 없습니다.</p>
              )}
            </>
          )}

          {/* ✅ 아직 "댓글을 단 게시글" 기능은 추가되지 않음 */}
          {selectedOption === "recentComments" && (
            <p>최근에 댓글 단 게시글을 표시합니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
