import { Button } from "./components/icons/button";
import { InputField } from "./components/icons/input";

export default function Home() {
  return (
    <>
      test
      <InputField label="비밀번호" type="password"></InputField>
      <InputField label="로그인" type="text"></InputField>
      <Button label="테스트2" />;
    </>
  );
}
