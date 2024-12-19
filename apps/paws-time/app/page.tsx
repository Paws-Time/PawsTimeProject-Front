import { Button } from "./components/icons/button";
import { InputField } from "./components/icons/input";

export default function Home() {
  return (
    <div>
      <InputField label="입력칸" type="password" />
      <Button label="테스트2" />
    </div>
  );
}
