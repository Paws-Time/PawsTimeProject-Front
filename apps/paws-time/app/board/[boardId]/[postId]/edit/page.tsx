"use client";

import React from "react";
import { useParams } from "next/navigation";
import { BoardEditBody } from "./body";

export const BoardEditPage = () => {
  const { postId } = useParams() as { postId: string };

  return (
    <div>
      <BoardEditBody postId={postId} />
    </div>
  );
};
