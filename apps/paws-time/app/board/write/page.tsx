
import { NextPage } from "core-next/hoc";
import { BoardWriteBody } from "./body";

export default NextPage(async () => {
  return (
    <div>
      <h1>글 작성하기</h1>
      <BoardWriteBody />
    </div>
  );
});

