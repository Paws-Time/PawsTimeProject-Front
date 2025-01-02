"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetPosts, getDetailPost } from "@/app/lib/codegen/hooks/post/post";
import { GetDetailPostRespDto } from "../lib/codegen/dtos";
import { Card } from "@/components/utils/card";
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
      staleTime: 5 * 60 * 1000,
    },
  });

  useEffect(() => {
    if (data?.data) {
      setPosts(data.data as Post[]);
    }
  }, [data]);

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
              postId={post.id!}
              $title={post.title}
              $contentPreview={post.contentPreview}
              $views={post.views}
              $likeCount={post.likesCount}
              onClick={() => handlePostClick(post.id, post.boardId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotPostsBody;
