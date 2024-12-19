import { Button } from "./components/icons/button";
import { Card } from "./components/icons/card";
import { InputField } from "./components/icons/input";



export default function Home() {
  return (
    <>
      <div className="mt-3">
        <InputField label="비밀번호" type="password" />
        <InputField label="아이디" type="text" />
        <Button label="테스트2" />
      </div>
      <div className="mt-3">
        <Card />
      </div>
    </>
  );
}
