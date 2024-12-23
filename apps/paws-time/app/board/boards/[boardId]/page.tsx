import BoardDetailBody from "./body";

const BoardDetailPage = ({ params }: { params: { boardId: number } }) => {
  const { boardId } = params;

  return <BoardDetailBody boardId={boardId} />;
};

export default BoardDetailPage;
