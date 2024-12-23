import { CustomButton } from "@/components/utils/button";

export default function Home() {
  return (
    <>
      <div className="mt-3">
        테스트
        <CustomButton $label="테스트" $sizeType="normal" />
        <CustomButton $label="테스트" $sizeType="mini" />
        <CustomButton $label="테스트" $sizeType="long" />
      </div>
    </>
  );
}
