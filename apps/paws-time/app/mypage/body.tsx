"use client";

import React, { useState, useRef, useEffect } from "react";
import "../styles/css/mypage.css";
import Image from "next/image";
import { useAuth } from "@/app/hooks/authStore";
import { useGetPosts } from "@/app/lib/codegen/hooks/post/post";
import { useGetCommentListByUser } from "@/app/lib/codegen/hooks/comment/comment";
import {
  useUpdateProfileImg,
  useGetProfileImg,
} from "@/app/lib/codegen/hooks/-profileimg/-profileimg";
import {
  useDeleteUser,
  useUpdateNick,
} from "@/app/lib/codegen/hooks/user-api/user-api";
import { useRouter } from "next/navigation";
import { GetListPostRespDto, GetCommentRespDto } from "../lib/codegen/dtos";

const MyPage = () => {
  const { userId, nick } = useAuth();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("recentPosts");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [myPosts, setMyPosts] = useState<GetListPostRespDto[]>([]);
  const [myComments, setMyComments] = useState<GetCommentRespDto[]>([]);
  const [isEditingNick, setIsEditingNick] = useState(false);
  const [newNick, setNewNick] = useState(nick ?? "");

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

  const imagePreview =
    profileImgData?.data?.profileImgUrl || "/default-profile.png";

  // ✅ 프로필 이미지 변경
  const updateProfileImgMutation = useUpdateProfileImg();
  // const deleteProfileImgMutation = useDeleteProfileImg();

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
          refetchProfileImg();
        },
        onError: () => {
          alert("이미지 변경에 실패했습니다.");
        },
      }
    );
  };

  // // ✅ 프로필 이미지 삭제
  // const handleDeleteProfileImage = () => {
  //   if (!userId) return;

  //   deleteProfileImgMutation.mutate(
  //     { userId },
  //     {
  //       onSuccess: () => {
  //         alert("프로필 이미지가 삭제되었습니다!");
  //         refetchProfileImg();
  //       },
  //       onError: () => {
  //         alert("프로필 이미지 삭제에 실패했습니다.");
  //       },
  //     }
  //   );
  // };

  useEffect(() => {
    setNewNick(nick ?? "");
  }, [nick]);

  const updateNickMutation = useUpdateNick();

  const handleNickEdit = () => {
    if (!userId) return;

    updateNickMutation.mutate(
      { data: { nick: newNick } },
      {
        onSuccess: () => {
          alert("닉네임이 변경되었습니다!");
          setIsEditingNick(false);
        },
        onError: () => alert("닉네임 변경에 실패했습니다."),
      }
    );
  };

  // ✅ 회원 탈퇴 처리
  const deleteUserMutation = useDeleteUser();

  const handleDeleteUser = () => {
    if (!userId) return;

    const isConfirmed = window.confirm("정말 탈퇴 하시겠습니까?");
    if (isConfirmed) {
      deleteUserMutation.mutate(
        { userId },
        {
          onSuccess: () => {
            alert("회원 탈퇴가 완료되었습니다.");
            router.push("/home");
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

          <span
            className="material-symbols-outlined profile-settings-icon"
            onClick={() => fileInputRef.current?.click()}
          >
            settings
          </span>

          {/* <span
            className="material-symbols-outlined profile-delete-icon"
            onClick={handleDeleteProfileImage}
          >
            close
          </span> */}

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
