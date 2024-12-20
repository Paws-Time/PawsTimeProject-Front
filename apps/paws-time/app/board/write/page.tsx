import { NextPage } from "next";
import { BoardWriteBody } from "./body";

const BoardWritePage: NextPage = async () => {
  return (
    <div>
      <h1>글 작성하기</h1>
      <BoardWriteBody />
    </div>
  );
};

export default BoardWritePage;
