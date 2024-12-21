import { CustomButton } from "./components/icons/button";
// import { getBoardList } from "./lib/codegen/hooks/board/board";

export default async function Home() {
  // ! 설명용으로 둔 것이므로, 삭제하셔도 됩니다.
  // const { data } = await getBoardList() // ? => server component에서 빌드하면서 정적으로 세팅 완료
  // ! 설명용으로 둔 것이므로, 삭제하셔도 됩니다.
  // useGetBoardList() // ? => client component에서 그때그때 접속할 때마다 동적으로 페칭
  return (
    <>
      <div className="mt-3">
        테스트
        <CustomButton label="테스트" sizetype="normal" />
        <CustomButton label="테스트" sizetype="mini" />
        <CustomButton label="테스트" sizetype="long" />
      </div>
    </>
  );
}
