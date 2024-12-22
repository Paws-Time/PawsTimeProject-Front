import BoardEditBody from "./body";

const BoardEditPage = async ({
  params,
}: {
  params: { boardId: string; postId: string };
}) => {
  const { boardId, postId } = await params;

  return (
    <div>
      <BoardEditBody boardId={boardId} postId={postId} />
    </div>
  );
};

export default BoardEditPage;
