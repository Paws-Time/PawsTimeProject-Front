import React from "react";
import { useParams } from "next/navigation";
import BoardEditBody from "./body";

const BoardEditPage = () => {
  const { postId } = useParams() as { postId: string };

  return (
    <div>
      <BoardEditBody postId={postId} />
    </div>
  );
};

export default BoardEditPage;
