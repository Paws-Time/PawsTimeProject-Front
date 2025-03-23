"use client";

import { useQueries } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import {
  getGetPostsQueryKey,
  useGetPosts,
} from "@/app/lib/codegen/hooks/post/post";
import { CustomButton } from "@/components/utils/button";
import { Card } from "@/components/utils/card";
import { useGetBoard } from "@/app/lib/codegen/hooks/board/board";
import { useModalStore } from "@/app/hooks/modalStore";
import SortSetting from "@/components/postsetting";
import Modal from "@/components/modal";
import useBoardStore from "@/app/hooks/boardStore";
import { useEffect, useState } from "react";
import { formStyles } from "@/app/styles/forms";
import "@/app/styles/css/board.css";
import { getUserFromUserId } from "@/app/lib/codegen/hooks/user-api/user-api";
import { useAuthStore } from "@/app/hooks/authStore"; // ✅ 로그인 상태 가져오기

interface PostData {
  id?: number;
  postId?: number;
  title?: string;
  contentPreview?: string;
  createdAt?: string;
  updatedAt?: string;
  views?: number;
  likesCount?: number;
  userId?: number;
}

const BoardDetailBody = () => {
  const router = useRouter();
  const { boardId } = useParams();
  const { openModal } = useModalStore();
  const { boardState } = useBoardStore();
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [pageNo, setPageNo] = useState(0);
  const { pageSize, sortBy, direction } = boardState;
  const [postDatas, setPostDatas] = useState<PostData[]>([]);

  const { token } = useAuthStore(); // ✅ 로그인 여부 확인
  const { data: boardData } = useGetBoard(Number(boardId));
  const boardTitle = boardData?.data?.title;

  // ✅ 게시글 목록 가져오기 (boardState 변경 시 자동 업데이트)
  const { data: postData } = useGetPosts(
    {
      boardId: Number(boardId),
      keyword: searchKeyword || undefined,
      page: pageNo, // ✅ 현재 페이지 번호 반영
      size: pageSize, // ✅ 페이지 크기 유지
      sort: `${sortBy},${direction}`,
    },
    {
      query: {
        queryKey: getGetPostsQueryKey({
          boardId: Number(boardId),
          page: pageNo, // ✅ 페이지 번호 반영
          size: pageSize, // ✅ 페이지 크기 유지
          sort: `${sortBy},${direction}`,
          keyword: searchKeyword || undefined,
        }),
        staleTime: 0,
      },
    }
  );

  // ✅ `postData`가 변경될 때 `postDatas` 업데이트
  useEffect(() => {
    if (postData?.data) {
      setPostDatas([...postData.data]);
    }
  }, [postData]);

  // ✅ boardState(정렬 옵션)가 변경될 때 페이지 번호를 초기화하고 API를 다시 호출
  useEffect(() => {
    setPageNo(0);
  }, [pageSize, sortBy, direction]);

  const userIds = postDatas
    .map((post) => post.userId)
    .filter((id) => id !== null && id !== undefined);

  const userQueries = useQueries({
    queries: userIds.map((userId) => ({
      queryKey: ["user", userId],
      queryFn: () => getUserFromUserId(userId),
      enabled: !!userId, // userId가 있을 때만 실행
    })),
  });

  const userNicks = userQueries.reduce(
    (acc, query, index) => {
      const userId = userIds[index];
      acc[userId] = query.data?.data?.nick ?? "알 수 없음";
      return acc;
    },
    {} as Record<number, string>
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (keyword.trim() === "") {
      setSearchKeyword(""); // ✅ 빈칸 입력 시 전체 게시글 조회
    } else {
      setSearchKeyword(keyword); // ✅ 검색어 입력 후 엔터 시 검색 실행
    }
  };

  // ✅ API 응답에서 전체 게시글 개수를 가져오기
  const resetPage = () => {
    setPageNo(0);
  };
  // ✅ 현재 페이지의 게시글 개수 확인
  const currentPostCount = postData?.data?.length ?? 0;

  // ✅ 로그인 여부 체크 후 새 글 작성 페이지로 이동
  const handleNewPostClick = () => {
    if (!token) {
      alert("로그인이 필요합니다.");
      router.push("/auth/login"); // 로그인 페이지로 이동
    } else {
      router.push(`/board/write/`); // 게시글 작성 페이지로 이동
    }
  };

  return (
    <div className="container">
      <h1>{boardTitle} 게시글</h1>

      <div className="filter-container">
        <form className="input" onSubmit={handleSearch}>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="제목을 입력하세요"
            style={formStyles.input}
          />
        </form>

        {/* ✅ 로그인 확인 후 새글 쓰기 버튼 동작 */}
        <CustomButton
          $label="새글 쓰기"
          $sizeType="normal"
          onClick={handleNewPostClick}
        />

        <CustomButton
          $label="검색설정"
          $sizeType="normal"
          onClick={openModal}
        />
        <Modal>
          <SortSetting />
        </Modal>
      </div>

      <div className="card-container">
        {postDatas.length > 0 ? (
          postDatas.map((post) => (
            <Card
              key={post.id}
              postId={post.id!}
              $title={post.title}
              $contentPreview={post.contentPreview}
              $views={post.views}
              $likeCount={post.likesCount}
              $nick={userNicks[post.userId!] ?? "알 수 없음"}
              onClick={() =>
                router.push(`/board/boards/${boardId}/posts/${post.id}`)
              }
            />
          ))
        ) : (
          <div>게시글이 없습니다.</div>
        )}
      </div>

      <div className="pagination">
        <CustomButton
          $label="처음으로"
          $sizeType="normal"
          onClick={resetPage}
        />
        <span className="mt-5 ml-20">현 페이지: {pageNo + 1}</span>
        <CustomButton
          $label="이전"
          $sizeType="normal"
          onClick={() => setPageNo((prev) => Math.max(prev - 1, 0))}
          disabled={pageNo === 0}
        />
        <CustomButton
          $label="다음"
          $sizeType="normal"
          onClick={() => setPageNo((prev) => prev + 1)}
          disabled={currentPostCount < pageSize} // ✅ 마지막 페이지에서는 "다음" 버튼 비활성화
        />
      </div>
    </div>
  );
};

export default BoardDetailBody;
