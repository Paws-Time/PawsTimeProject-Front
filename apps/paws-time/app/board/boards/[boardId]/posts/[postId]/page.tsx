import PostDetailBody from "./body";

const PostDetailPage = ({ params }: { params: { postId: number } }) => {
  const { postId } = params;
  return (
    <div>
      <PostDetailBody postId={postId} />
    </div>
  );
};

export default PostDetailPage;
