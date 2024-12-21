import { CustomButton } from "./components/icons/button";

export default function Home() {
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
