"use client";

import React, { useState } from "react";
import { formStyles } from "@/app/styles/forms";
import { CustomButton } from "@/components/utils/button";
import { useRouter } from "next/router";

interface PostData {
  email: string;
  nick: string;
  /** @pattern ^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*()-+=]).{8,}$ */
  password: string;
}

const SignupBody = () => {
  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const router = useRouter(); // useRouter 초기화

  const handleLoginNavigation = () => {
    router.push("/auth/login"); // /auth/signup 경로로 이동
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
        overflow: "hidden",
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
        <h2 style={formStyles.heading}>회원가입</h2>

        <div style={formStyles.field}>
          <label style={formStyles.label}>이메일</label>
          <input
            type="text"
            placeholder="이메일"
            className="border rounded p-2 w-full"
          />
        </div>
        <div style={formStyles.field}>
          <label style={formStyles.label}>닉네임</label>
          <input
            type="text"
            placeholder="닉네임"
            className="border rounded p-2 w-full"
          />
        </div>

        <div style={formStyles.field}>
          <label style={formStyles.label}>패스워드</label>
          <input
            type="password"
            placeholder="패스워드"
            className="border rounded p-2 w-full"
          />
        </div>
        <h3 className="mt-4 text-sm">
          계정이 있으신가요?{" "}
          <button
            type="button"
            className="text-blue-500 underline"
            onClick={handleLoginNavigation}
          >
            로그인 하기
          </button>
        </h3>
        <CustomButton $label="계정 생성하기" $sizeType="long" type="submit" />
      </form>
    </div>
  );
};

export default SignupBody;
