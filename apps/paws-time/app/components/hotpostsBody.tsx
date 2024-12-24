"use client";

import React from "react";
import { useGetPosts } from "@/app/lib/codegen/hooks/post/post";
import { Card } from "@/components/utils/card";

interface PostData {
  id?: number;
  postId?: number;
  title?: string;
  contentPreview?: string;
  createdAt?: string;
  views?: number;
  likesCount?: number;
}

interface GetListPostRespDto {
  id?: number;
  title?: string;
  contentPreview?: string;
  createdAt?: string;
  views?: number;
  likesCount?: number;
}

const PopularPostsBody = () => {
  const boardIds = [1, 2, 3]; // 게시판 ID들

  const postsByBoard = boardIds.map((boardId) => {
    const { data, isLoading, error } = useGetPosts(
      {
        boardId,
        page: 0,
        size: 3,
        sort: "createdAt,desc", // 최신순 정렬
      },
      {
        query: {
          staleTime: 5 * 60 * 1000,
        },
      }
    );

    const posts: PostData[] = (data?.data || []).map(
      (post: GetListPostRespDto) => ({
        postId: post.id,
        title: post.title,
        contentPreview: post.contentPreview,
        createdAt: post.createdAt,
        views: post.views,
        likesCount: post.likesCount,
      })
    );

    return { boardId, posts, isLoading, error };
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>최신 인기 게시글</h1>

      <div style={styles.boardContainer}>
        {postsByBoard.map(({ boardId, posts, isLoading, error }) => (
          <div key={boardId} style={styles.boardSection}>
            <h3 style={styles.boardTitle}>게시판 {boardId}</h3>
            <div style={styles.cardRow}>
              {isLoading && <div>Loading...</div>}
              {error && (
                <div>Error: 데이터를 가져오는 중 문제가 발생했습니다.</div>
              )}
              {posts.length > 0 ? (
                posts.map((post: PostData) => (
                  <Card
                    key={post.postId}
                    $title={post.title}
                    $contentPreview={post.contentPreview}
                    views={post.views}
                    likesCount={post.likesCount}
                    onClick={() =>
                      console.log(
                        `게시글 ID: ${post.postId}, 게시판 ID: ${boardId}`
                      )
                    }
                  />
                ))
              ) : (
                <div>게시글이 없습니다.</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "80%",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  boardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "40px",
  },
  boardSection: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  boardTitle: {
    marginBottom: "10px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  cardRow: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
};

export default PopularPostsBody;
