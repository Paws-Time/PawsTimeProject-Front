"use client";

import React, { useState, useRef, useEffect } from "react";
import "../styles/css/mypage.css";
import Image from "next/image";
import { useAuth, useAuthStore } from "@/app/hooks/authStore";
import { useGetPosts } from "@/app/lib/codegen/hooks/post/post";
import { useGetCommentListByUser } from "@/app/lib/codegen/hooks/comment/comment";
import {
  useUpdateProfileImg,
  useGetProfileImg,
  useDeleteProfileImg,
} from "@/app/lib/codegen/hooks/-profileimg/-profileimg";
import {
  useDeleteUser,
  useUpdateNick,
} from "@/app/lib/codegen/hooks/user-api/user-api";
import { useRouter } from "next/navigation";
import { GetListPostRespDto, GetCommentRespDto } from "../lib/codegen/dtos";
import { AxiosError } from "axios";

const MyPage = () => {
  const { userId, nick, setAuth } = useAuth();
  const { logoutState } = useAuthStore();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("recentPosts");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [myPosts, setMyPosts] = useState<GetListPostRespDto[]>([]);
  const [myComments, setMyComments] = useState<GetCommentRespDto[]>([]);
  const [isEditingNick, setIsEditingNick] = useState(false);
  const [newNick, setNewNick] = useState(nick ?? "");
  const [showOptions, setShowOptions] = useState(false);

  const params = {
    page: 0,
    size: 10,
    sort: "createdAt,desc",
  };

  // ✅ 내 게시글 가져오기
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

  // ✅ 내 댓글 가져오기
  const { data: commentsData } = useGetCommentListByUser(
    { pageNo: 0, pageSize: 10, sortBy: "createdAt", direction: "desc" },
    {
      query: {
        enabled: !!userId,
      },
    }
  );

  useEffect(() => {
    if (commentsData?.data) {
      setMyComments(commentsData.data);
    }
  }, [commentsData]);

  // ✅ 프로필 이미지 조회
  const { data: profileImgData, refetch: refetchProfileImg } = useGetProfileImg(
    userId ?? 0,
    {
      query: {
        enabled: !!userId,
      },
    }
  );

  const defaultProfileImage = "/profile-img.png"; // public 폴더에 있어야 함
  const [imagePreview, setImagePreview] = useState(defaultProfileImage);

  useEffect(() => {
    const serverImgUrl = profileImgData?.data?.profileImgUrl;
    if (!serverImgUrl || serverImgUrl.trim() === "") {
      setImagePreview(defaultProfileImage);
    } else {
      setImagePreview(serverImgUrl);
    }
  }, [profileImgData]);

  // ✅ 프로필 이미지 변경
  const updateProfileImgMutation = useUpdateProfileImg();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !userId) return;

    const formData = new FormData();
    formData.append("file", file);

    updateProfileImgMutation.mutate(
      { userId, data: { file } },
      {
        onSuccess: (response) => {
          alert(response.message);
          refetchProfileImg();
        },
        onError: (error: unknown) => {
          const axiosError = error as AxiosError<{ message?: string }>;
          const message = axiosError.response?.data?.message;
          alert(message);
        },
      }
    );
  };

  // ✅ 프로필 이미지 삭제
  const deleteProfileImgMutation = useDeleteProfileImg();

  const handleDeleteProfileImage = () => {
    if (!userId) return;

    deleteProfileImgMutation.mutate(
      { userId },
      {
        onSuccess: () => {
          alert("프로필 이미지가 삭제되었습니다!");
          refetchProfileImg();
        },
        onError: () => {
          alert("프로필 이미지 삭제에 실패했습니다.");
        },
      }
    );
  };

  // ✅ 설정 옵션 선택 시 실행
  const handleProfileOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;

    if (selectedValue === "change") {
      fileInputRef.current?.click(); // ✅ 파일 업로드 실행
    } else if (selectedValue === "delete") {
      handleDeleteProfileImage(); // ✅ 프로필 이미지 삭제 실행
    }

    setShowOptions(false); // ✅ 옵션 선택 후 닫기
  };

  // ✅ 닉네임 변경 API 요청
  const updateNickMutation = useUpdateNick();

  const handleNickEdit = () => {
    if (!userId) return;

    updateNickMutation.mutate(
      { data: { nick: newNick } },
      {
        onSuccess: (response) => {
          alert(response.message);
          setIsEditingNick(false);

          // ✅ 상태 즉시 업데이트 (새로고침 없이 반영)
          setAuth({ nick: newNick });
        },
        onError: (error: unknown) => {
          const axiosError = error as AxiosError<{ message?: string }>;
          const message = axiosError.response?.data?.message;
          alert(message);
        },
      }
    );
  };

  // ✅ nick이 변경될 때 `newNick`도 업데이트
  useEffect(() => {
    setNewNick(nick ?? "");
  }, [nick]);

  // ✅ 회원 탈퇴 처리
  const deleteUserMutation = useDeleteUser();

  const handleDeleteUser = () => {
    if (!userId) return;

    const isConfirmed = window.confirm("정말 탈퇴 하시겠습니까?");
    if (isConfirmed) {
      deleteUserMutation.mutate(
        { userId },
        {
          onSuccess: (response) => {
            alert(response.message);
            logoutState();
            router.push("/auth/login");
          },
          onError: (error: unknown) => {
            const axiosError = error as AxiosError<{ message?: string }>;
            const message = axiosError.response?.data?.message;
            alert(message);
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
              onError={() => setImagePreview(defaultProfileImage)}
              priority
            />
          </div>

          {/* ✅ 설정 버튼 */}
          <span
            className="material-symbols-outlined profile-settings-icon"
            onClick={() => setShowOptions(!showOptions)}
          >
            settings
          </span>

          {/* ✅ 설정 옵션 (드롭다운 메뉴) */}
          {showOptions && (
            <select
              className="profile-options"
              onChange={handleProfileOptionChange}
              value=""
            >
              <option value="" disabled>
                프로필 설정
              </option>
              <option value="change">🖼 이미지 변경</option>
              <option value="delete">❌ 이미지 삭제</option>
            </select>
          )}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
        <div>
          {isEditingNick ? (
            <>
              <input
                type="text"
                value={newNick}
                onChange={(e) => setNewNick(e.target.value)}
                className="nickname-input"
              />
              <button onClick={handleNickEdit}>저장</button>
              <button onClick={() => setIsEditingNick(false)}>취소</button>
            </>
          ) : (
            <>
              <span className="nick">닉네임: {nick ?? "알 수 없음"}</span>
              <button onClick={() => setIsEditingNick(true)}>수정</button>
            </>
          )}
        </div>

        <button onClick={() => router.push("/mypage/editPassword")}>
          비밀번호 변경
        </button>
        <div>
          <button className="delete-account-btn" onClick={handleDeleteUser}>
            회원 탈퇴
          </button>
        </div>
      </div>

      {/* 게시글 & 댓글 섹션 */}
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
          ) : selectedOption === "recentComments" && myComments.length > 0 ? (
            <ul className="comment-list">
              {myComments.map((comment) => (
                <li
                  key={comment.commentId}
                  onClick={() =>
                    router.push(
                      `/board/boards/${comment.boardId}/posts/${comment.postId}`
                    )
                  }
                  className="comment-item"
                >
                  <span className="comment-content">{comment.content}</span>
                  <span className="comment-date">
                    {new Date(comment.createAt ?? "").toLocaleDateString(
                      "ko-KR"
                    )}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>내용이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
