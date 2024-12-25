import {
  useCreateComment,
  useDeleteComment,
  useGetCommentByPost,
} from "@/app/lib/codegen/hooks/comment/comment";
import { postFormStyles } from "@/app/styles/postforms";
import React, { useEffect, useState } from "react";
import { InputField } from "./utils/input";
import { CustomButton } from "./utils/button";

interface ReviewProps {
  postId: number;
}
interface ReviewReqParams {
  pageNo?: number;
  pageSize?: number;
  sortBy?: string;
  direction?: string;
}
interface ReviewResDto {
  commentId?: number;
  content?: string;
  createAt?: string;
}
function Review({ postId }: ReviewProps) {
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState("createdAt");
  const [direction, setDirection] = useState("DESC");
  const [content, setContent] = useState("");
  const [pageNo, setPageNo] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [reviews, setReviews] = useState<ReviewResDto[]>([]);
  const [params, setParams] = useState<ReviewReqParams>({
    pageNo,
    pageSize,
    sortBy,
    direction,
  });

  //댓글작성
  const { mutate: createComment } = useCreateComment({
    mutation: {
      onSuccess: () => {
        alert("댓글이 추가되었습니다.");
        setContent("");
      },
    },
  });
  // 댓글삭제
  const { mutate: deleteComment } = useDeleteComment({
    mutation: {
      onSuccess: (_, { commentId }) => {
        // 댓글 삭제 성공 시 상태 업데이트
        setReviews((prev) =>
          prev.filter((review) => review.commentId !== commentId)
        );
        alert("댓글이 삭제되었습니다.");
      },
      onError: (error) => {
        console.error("댓글 삭제 실패:", error);
      },
    },
  });

  const handleDeleteReviews = (commentId: number) => {
    deleteComment({ commentId });
  };
  // 댓글조회
  const { data } = useGetCommentByPost(postId, params);

  useEffect(() => {
    if (data?.data) {
      setReviews(data.data);
    }
  }, [data]);

  useEffect(() => {
    setParams((prev) => ({
      ...prev, // 기존 상태를 복사
      pageNo,
      pageSize, // 업데이트할 값
      sortBy,
      direction,
    }));
  }, [pageNo, pageSize, sortBy, direction]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;
    createComment({
      postId,
      data: { content },
    });
  };
  // const totalPageNumber = () => {
  //   const pageNumbers = [];
  //   for (let i = 0; i < totalPage; i++) {
  //     pageNumbers.push(i);
  //   }
  //   re;
  // };

  return (
    <>
      {reviews.map((review) => (
        <div
          key={review.commentId}
          className="w-full flex flex-row items-center justify-between"
          style={postFormStyles.commentBox}
        >
          <div className="flex-1">{review.content}</div>
          <div className="flex gap-2">
            <CustomButton
              $label="x"
              $sizeType="mini"
              onClick={() => {
                if (review.commentId !== undefined) {
                  handleDeleteReviews(review.commentId);
                }
              }}
            />
          </div>
        </div>
      ))}
      <div>
        <form onSubmit={handleSubmit} style={postFormStyles.commentBox}>
          <InputField
            $label="댓글 입력창"
            type="text"
            value={content || ""}
            onChange={(e) => setContent(e.target.value)}
          />
          <CustomButton $label="저장하기" $sizeType="long" />
        </form>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value) as 3 | 5)}
          style={postFormStyles.select}
        >
          <option value={3}>3개씩 조회</option>
          <option value={5}>5개씩 조회</option>
        </select>
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          style={postFormStyles.select}
        >
          <option value="desc">최신순</option>
          <option value="asc">오래된순</option>
        </select>

        <CustomButton
          $label="이전"
          $sizeType="short"
          className="ml-3"
          onClick={() => setPageNo((prev) => Math.max(0, prev - 1))}
        />

        <CustomButton
          $label="다음"
          $sizeType="short"
          className="ml-3"
          onClick={() => setPageNo((prev) => prev + 1)}
        />
      </div>
    </>
  );
}

export default Review;
