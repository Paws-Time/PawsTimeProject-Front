"use client";

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

interface PostData {
  id?: number;
  postId?: number;
  title?: string;
  contentPreview?: string;
  createdAt?: string;
  updatedAt?: string;
  views?: number;
  likesCount?: number;
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
  const params = {
    boardId: Number(boardId),
    keyword: searchKeyword,
    page: pageNo,
    size: pageSize,
    sort: `${sortBy},${direction}`,
  };

  const { data: boardData } = useGetBoard(Number(boardId));
  const boardTitle = boardData?.data?.title;
  // 게시글 목록 가져오기
  const { data: postData } = useGetPosts(params, {
    query: {
      queryKey: getGetPostsQueryKey({ boardId: Number(boardId) }),
      staleTime: 0,
      cacheTime: 1000,
    },
  });
  useEffect(() => {
    if (postData?.data) {
      setPostDatas([...postData.data]);
    }
  }, [postData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchKeyword(keyword);
  };
  const resetPage = () => {
    setPageNo(0);
  };
  return (
    <div className="container">
      <div className="w-custom-sidew" />
      <div className="flex">
        <h1 className="heading">{boardTitle} 게시글</h1>
        <div className="ml-5">
          <CustomButton
            $label="수정"
            $sizeType="normal"
            onClick={() => router.push(`${boardId}/edit`)}
          />
        </div>
      </div>
      <div className="filter-container">
        <form className="input" onSubmit={handleSearch}>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="제목을 입력하세요"
            style={formStyles.input}
            required
          />
        </form>
        <CustomButton
          $label="새글 쓰기"
          $sizeType="normal"
          value={boardTitle}
          onClick={() => router.push(`/board/write/`)}
          className="mt-2"
        />
        <CustomButton
          $label="검색설정"
          $sizeType="normal"
          onClick={openModal}
          className="mt-2"
        />
        <Modal>
          <SortSetting />
        </Modal>
      </div>
      <div className="card-container">
        {postDatas.length > 0 ? (
          postDatas.map((post: PostData) => (
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

        <span className="mt-5 ml-20"> 현 페이지입니다 : {pageNo + 1}</span>
        <div className="flex gap-3">
          {pageNo === 0 && (
            <CustomButton
              $label="이전"
              $sizeType="normal"
              onClick={() => setPageNo((prev) => Math.max(prev - 1, 0))} // 이전 페이지로 이동
              disabled={pageNo === 0} // 첫 페이지에서는 비활성화
            />
          )}

          <CustomButton
            $label="다음"
            $sizeType="normal"
            onClick={() => setPageNo((prev) => prev + 1)} // 다음 페이지로 이동
            disabled={postDatas.length < pageSize} // 마지막 페이지에서 비활성화
          />
        </div>
      </div>
    </div>
  );
};

export default BoardDetailBody;
