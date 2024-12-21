import BoardDetailBody from "./body";

const BoardDetailPage = async ({ params }: { params: { postId: string } }) => {
  const { postId } = await params; // postId만 사용

  console.log({ postId });

  return (
    <div>
      <BoardDetailBody postId={postId} />
    </div>
  );
};

export default BoardDetailPage;
