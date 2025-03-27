"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetPosts } from "@/app/lib/codegen/hooks/post/post";
import { getUserFromUserId } from "@/app/lib/codegen/hooks/user-api/user-api";
import { Card } from "@/components/utils/card";
import { useQueries } from "@tanstack/react-query";
import "@/app/components/css/styles.css";

interface Post {
  id: number;
  boardId: number;
  title: string;
  contentPreview: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likesCount: number;
  userId?: number;
}

const HotPostsBody = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [sortOption, setSortOption] = useState("likesCount,desc");

  const params = {
    page: 0,
    size: 4,
    sort: sortOption,
  };

  const { data, isLoading, error } = useGetPosts(params, {
    query: {
      staleTime: 0,
    },
  });

  useEffect(() => {
    if (data?.data) {
      setPosts(data.data as Post[]);
    }
  }, [data]);

  // userId 추출
  const userIds = posts
    .map((post) => post.userId)
    .filter((id) => id !== null && id !== undefined);

  // 작성자 정보 가져오기
  const userQueries = useQueries({
    queries: userIds.map((userId) => ({
      queryKey: ["user", userId],
      queryFn: () => getUserFromUserId(userId),
      enabled: !!userId,
    })),
  });

  // userId와 닉네임 매칭
  const userNicks = userQueries.reduce(
    (acc, query, index) => {
      const userId = userIds[index];
      acc[userId] = query.data?.data?.nick ?? "알 수 없음"; // 닉네임이 없으면 기본값
      return acc;
    },
    {} as Record<number, string>
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: 게시글을 가져오는 중 문제가 발생했습니다.</div>;

  const handlePostClick = (postId: number, boardId: number) => {
    router.push(`/board/boards/${boardId}/posts/${postId}`);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  return (
    <div>
      <h1 className="heading">최신 인기 게시글</h1>
      <div className="sort-container">
        <label htmlFor="sort">정렬 기준: </label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="likesCount,desc">좋아요 순</option>
          <option value="views,desc">조회수 순</option>
        </select>
      </div>
      <div className="board-container">
        <div className="card-row">
          {posts.map((post) => (
            <Card
              key={post.id}
              postId={post.id}
              $title={post.title}
              $contentPreview={post.contentPreview}
              $views={post.views}
              $likeCount={post.likesCount}
              $nick={userNicks[post.userId!] ?? "알 수 없음"} // ✅ 작성자 표시
              onClick={() => handlePostClick(post.id, post.boardId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotPostsBody;
