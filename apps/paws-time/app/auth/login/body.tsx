"use client";

import React, { useState } from "react";
import { formStyles } from "@/app/styles/forms";
import { CustomButton } from "@/components/utils/button";

interface PostData {
  email: string;
  password: string;
}

const LoginBody = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="flex"
      style={{ width: "80%", margin: "0 auto" }} // 너비를 90%로 설정하고 중앙 정렬
    >
      {/* 배경 영역 */}
      <div
        style={{ ...formStyles.background, height: "800px" }}
        className="flex flex-1 items-center justify-start pl-10"
      >
        <img src="/logo.png" alt="Logo" className="w-80 h-auto" />
      </div>

      {/* 폼 영역 */}
      <form
        style={{ ...formStyles.form, width: "70%" }}
        className="flex flex-col justify-center w-1/3 ml-auto mr-10"
      >
        <h2 style={formStyles.heading}>로그인</h2>

        <div style={formStyles.field}>
          <label style={formStyles.label}>이메일</label>
          <input type="text" placeholder="이메일" />
        </div>

        <div style={formStyles.field}>
          <label style={formStyles.label}>패스워드</label>
          <input type="text" placeholder="패스워드" />
        </div>
        <h3>
          계정이 없으신가요?{" "}
          <a href="/login" className="text-blue-500 underline">
            회원가입 하기
          </a>
        </h3>
        <CustomButton $label="로그인 하기" $sizeType="long" type="submit" />
      </form>
    </div>
  );
};

export default LoginBody;
