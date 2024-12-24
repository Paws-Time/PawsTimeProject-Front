import {
  useCreateComment,
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
  reviewsId?: number;
  content?: string;
  createAt?: string;
}
function Review({ postId }: ReviewProps) {
  const [content, setContent] = useState("");
  const [reviews, setReviews] = useState<ReviewResDto[]>([]);
  const [params, setParams] = useState<ReviewReqParams>({
    pageNo: 0,
    pageSize: 5,
    sortBy: "createdAt",
    direction: "DESC",
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
  //댓글삭제
  // const { mutate: deleteComment } = useDeleteComment({
  //   mutation: {
  //     onSuccess: () => {
  //       alert("댓글이 삭제 되었습니다.");
  //     },
  //   },
  // });
  //댓글조회
  const { data } = useGetCommentByPost(postId, params);
  console.log(data?.data);

  useEffect(() => {
    if (data?.data) {
      setReviews(data.data);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;
    createComment({
      postId,
      data: { content },
    });
  };
  // const handleDelete = (commentId: number) => {
  //   deleteComment({ commentId });
  // };
  return (
    <>
      {data?.data?.map((review) => (
        <div key={review.commentId} style={postFormStyles.commentBox}>
          {review.content}
        </div>
      ))}
      <div>
        <form onSubmit={handleSubmit} style={postFormStyles.commentBox}>
          <InputField
            $label="댓글 입력창"
            $type="text"
            $value={content || ""}
            onChange={(e) => setContent(e.target.value)}
          />
          <CustomButton $label="저장하기" $sizeType="long" />
        </form>
        <select></select>
      </div>
    </>
  );
}

export default Review;
