import BoardDetailBody from "./body";

const BoardDetailPage = async ({
  params,
}: {
  params: { boardId: string; postId: string };
}) => {
  const { boardId, postId } = await params;

  return (
    <div>
      <BoardDetailBody boardId={boardId} postId={postId} />
    </div>
  );
};

export default BoardDetailPage;
