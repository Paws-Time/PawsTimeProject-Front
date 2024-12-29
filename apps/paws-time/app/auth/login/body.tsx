"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // useRouter import
import { formStyles } from "@/app/styles/forms";
import { CustomButton } from "@/components/utils/button";

interface PostData {
  email: string;
  password: string;
}

const LoginBody = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // useRouter 초기화

  const handleSignupNavigation = () => {
    router.push("/auth/signup"); // /auth/signup 경로로 이동
  };

  return (
    <div
      className="flex"
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "1200px",
        height: "800px",
        margin: "0 auto",
        marginLeft: "450px",
        overflow: "hidden", // 화면 밖으로 나가는 요소 처리
      }}
    >
      {/* 배경 영역 */}
      <div
        style={{ ...formStyles.background, height: "800px" }}
        className="flex flex-1 items-center"
      >
        <img src="/logo.png" alt="Logo" className="w-80 h-auto ml-28" />
      </div>

      {/* 폼 영역 */}
      <form
        style={{ ...formStyles.form, width: "70%", border: "1px solid black" }}
        className="flex flex-col bg-white shadow-lg"
      >
        <h2 style={formStyles.heading}>로그인</h2>

        <div style={formStyles.field}>
          <label style={formStyles.label}>이메일</label>
          <input
            type="text"
            placeholder="이메일"
            className="border rounded p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={formStyles.field}>
          <label style={formStyles.label}>패스워드</label>
          <input
            type="password"
            placeholder="패스워드"
            className="border rounded p-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <h3 className="mt-4 text-sm">
          계정이 없으신가요?{" "}
          <button
            type="button"
            className="text-blue-500 underline"
            onClick={handleSignupNavigation}
          >
            회원가입 하기
          </button>
        </h3>
        <CustomButton $label="로그인 하기" $sizeType="long" type="submit" />
      </form>
    </div>
  );
};

export default LoginBody;
