"use client";

import React, { useState, useRef, useEffect } from "react";
import "../styles/css/mypage.css";
import Image from "next/image";
import { useAuth } from "@/app/hooks/authStore";
import { useGetPosts } from "@/app/lib/codegen/hooks/post/post";
import {
  useUpdateProfileImg,
  useDeleteProfileImg,
} from "@/app/lib/codegen/hooks/-profileimg/-profileimg";
import { useGetProfileImg } from "@/app/lib/codegen/hooks/-profileimg/-profileimg";
import { useDeleteUser } from "@/app/lib/codegen/hooks/user-api/user-api"; // ✅ 로그인 & 회원 탈퇴 API 추가
import { useRouter } from "next/navigation";
import { GetListPostRespDto } from "../lib/codegen/dtos";

const MyPage = () => {
  const { userId, nick } = useAuth(); // ✅ 로그인한 사용자 정보 가져오기
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("recentPosts");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [myPosts, setMyPosts] = useState<GetListPostRespDto[]>([]);
  const deleteUserMutation = useDeleteUser(); // ✅ 회원 탈퇴 API 호출 훅

  const params = {
    page: 0,
    size: 10,
    sort: "createdAt,desc",
  };

  const { data: postsData } = useGetPosts(params, {
    query: {
      staleTime: 5 * 60 * 1000,
      enabled: !!userId,
    },
  });

  useEffect(() => {
    if (postsData?.data && userId) {
      const userPosts = postsData.data.filter((post) => post.userId === userId);
      setMyPosts(userPosts);
    }
  }, [postsData, userId]);

  // ✅ 프로필 이미지 조회
  const { data: profileImgData, refetch: refetchProfileImg } = useGetProfileImg(
    userId ?? 0, // 🔹 userId가 null이면 0을 넘기지만, 실제 호출을 막으려면 enabled 사용
    {
      query: {
        enabled: !!userId, // 🔹 userId가 존재할 때만 요청 실행
      },
    }
  );

  const imagePreview =
    profileImgData?.data?.profileImgUrl || "/default-profile.png";

  // ✅ API 훅
  const updateProfileImgMutation = useUpdateProfileImg();
  const deleteProfileImgMutation = useDeleteProfileImg();

  // ✅ 프로필 이미지 변경
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !userId) return;

    const formData = new FormData();
    formData.append("file", file);

    updateProfileImgMutation.mutate(
      { userId, data: { file } },
      {
        onSuccess: () => {
          alert("프로필 이미지가 변경되었습니다!");
          refetchProfileImg(); // ✅ 최신 프로필 이미지 다시 가져오기
        },
        onError: () => {
          alert("이미지 변경에 실패했습니다.");
        },
      }
    );
  };

  // ✅ 프로필 이미지 삭제
  const handleDeleteProfileImage = () => {
    if (!userId) return;

    deleteProfileImgMutation.mutate(
      { userId },
      {
        onSuccess: () => {
          alert("프로필 이미지가 삭제되었습니다!");
          refetchProfileImg(); // ✅ 최신 상태 반영
        },
        onError: () => {
          alert("프로필 이미지 삭제에 실패했습니다.");
        },
      }
    );
  };

  // ✅ 회원 탈퇴 처리 (비밀번호 확인 없이 alert 만 표시)
  const handleDeleteUser = () => {
    if (!userId) return;

    const isConfirmed = window.confirm("정말 탈퇴 하시겠습니까?");
    if (isConfirmed) {
      deleteUserMutation.mutate(
        { userId },
        {
          onSuccess: () => {
            alert("회원 탈퇴가 완료되었습니다.");
            router.push("/home"); // ✅ 탈퇴 후 홈으로 이동
          },
          onError: () => {
            alert("회원 탈퇴에 실패했습니다.");
          },
        }
      );
    }
  };

  return (
    <div className="mypage-container">
      {/* 프로필 섹션 */}
      <div className="profile-section">
        <div className="profile-image-container">
          <div className="profile-image">
            <Image
              src={imagePreview}
              alt="Profile Preview"
              width={100}
              height={100}
              className="profile-img"
              priority
            />
          </div>

          {/* ✅ 닉네임 표시 */}
          <div>
            <span className="nick">닉네임: {nick ?? "알 수 없음"}</span>
          </div>

          <div>
            <button
              className="delete-profile-img-btn"
              onClick={handleDeleteProfileImage}
            >
              프로필 이미지 삭제
            </button>
          </div>
          <div>
            <button className="delete-account-btn" onClick={handleDeleteUser}>
              회원 탈퇴
            </button>
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>

      {/* ✅ 게시글 섹션 */}
      <div className="content-section">
        <select
          className="content-filter"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="recentPosts">최근에 쓴 게시글</option>
          <option value="recentComments">최근에 댓글 단 게시글</option>
        </select>

        <div className="content-display">
          {selectedOption === "recentPosts" && myPosts.length > 0 ? (
            <ul className="post-list">
              {myPosts.map((post) => (
                <li
                  key={post.id}
                  onClick={() =>
                    router.push(
                      `/board/boards/${post.boardId}/posts/${post.id}`
                    )
                  }
                  className="post-item"
                >
                  <span className="post-title">{post.title}</span>
                  <span className="post-date">
                    {new Date(post.createdAt ?? "").toLocaleDateString("ko-KR")}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>작성한 게시글이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
