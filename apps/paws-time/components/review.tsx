import {
  getGetCommentByPostInfiniteQueryOptions,
  useCreateComment,
  useDeleteComment,
  useGetCommentByPostInfinite,
} from "@/app/lib/codegen/hooks/comment/comment";
import { postFormStyles } from "@/app/styles/postforms";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { NextPage } from "next";
import { InputField } from "./utils/input";

interface ReviewProps {
  postId: number;
}
interface ReviewReqDto {
  postId: number;
  content: string;
}
interface ReviewReqParams {
  pageNo?: number;
  pageSize?: number;
  sortBy?: string;
  direction?: string;
}
interface ReviewResDto {
  reviewsId?: number;
  content: string;
  createAt: string;
}
function Review({ postId }: ReviewProps) {
  const [content, setContent] = useState("");
  const [reviews, setReviews] = useState<ReviewResDto[]>([]);

  //댓글조회(5개씩 조회)
  const {} = useCreateComment();
  //댓글삭제제
  const {} = useDeleteComment(commentId);
  const params: ReviewReqParams = {};
  const { data };
  const onSubmit
  return (
    <>
      <div>
        <div style={postFormStyles.commentBox}>USER1: 댓글 내용입니다.</div>;
        <div style={postFormStyles.commentBox}>USER1: 댓글 내용입니다.</div>;
      </div>
      <div style={postFormStyles.commentBox}>USER1: 댓글 내용입니다.</div>;
      <InputField $label="댓글 입력창" $type="text" value={content} onSubmit={onsubmit} />
    </>
  );
}

export default Review;
