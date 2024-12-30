"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/app/lib/codegen/hooks/post/post";
import { Card } from "@/components/utils/card";
import "@/app/components/css/styles.css";
import axios from "axios";

interface PostData {
  id?: number;
  postId?: number;
  title?: string;
  contentPreview?: string;
  createdAt?: string;
  views?: number;
  likesCount?: number;
}

interface BoardData {
  boardId: number;
  title: string;
}

// 게시판 목록 조회 함수
const fetchBoardList = async () => {
  const response = await axios.get("http://43.200.46.13:8080/board/list", {
    params: {
      pageNo: 0,
      pageSize: 10,
      sortBy: "createdAt",
      direction: "ASC",
    },
  });
  return response.data.data as BoardData[];
};

const HotPostsBody = () => {
  const router = useRouter();
  const [postsByBoard, setPostsByBoard] = useState<Record<number, PostData[]>>(
    {}
  ); // 게시판별 게시글 상태

  // React Query를 사용해 게시판 목록 가져오기
  const {
    data: boards,
    isLoading: isLoadingBoards,
    isError: isBoardListError,
  } = useQuery(["boardList"], fetchBoardList);

  useEffect(() => {
    if (!boards || boards.length === 0) return;

    const fetchPostsByBoard = async () => {
      try {
        const data = await Promise.all(
          boards.map(async (board) => {
            const response = await getPosts({
              boardId: board.boardId,
              keyword: "",
              page: 0,
              size: 4,
              sort: "likesCount,desc",
            });
            return { boardId: board.boardId, posts: response.data ?? [] };
          })
        );

        // 게시판별 데이터를 상태로 저장
        const newPostsByBoard = data.reduce(
          (acc, { boardId, posts }) => {
            acc[boardId] = posts;
            return acc;
          },
          {} as Record<number, PostData[]>
        );

        setPostsByBoard(newPostsByBoard);
      } catch (error) {
        console.error("Error fetching popular posts:", error);
      }
    };

    fetchPostsByBoard();
  }, [boards]);

  if (isLoadingBoards) return <div>Loading...</div>;
  if (isBoardListError)
    return <div>Error: 게시판 목록을 가져오는 중 문제가 발생했습니다.</div>;

  return (
    <div>
      <h1 className="heading">최신 인기 게시글</h1>
      <div className="board-container">
        {Object.entries(postsByBoard)
          .filter(([, posts]) => posts.length > 0) // 빈 배열 필터링
          .map(([boardId, posts], index) => (
            <div key={boardId} className="board-section">
              {/* boardId와 boards 배열의 인덱스를 사용해 제목 표시 */}
              <h3 className="board-title">
                {boards?.[index]?.title || `게시판 ${boardId}`} 게시판
              </h3>
              <div className="card-row">
                {posts.map((post) => (
                  <Card
                    key={post.id}
                    postId={post.id!}
                    $title={post.title}
                    $contentPreview={post.contentPreview}
                    $views={post.views}
                    $likeCount={post.likesCount}
                    onClick={() =>
                      router.push(`/board/boards/${boardId}/posts/${post.id}`)
                    }
                  />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HotPostsBody;
