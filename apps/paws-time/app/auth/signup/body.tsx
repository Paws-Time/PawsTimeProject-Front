"use client";

import React, { useState } from "react";
import { formStyles } from "@/app/styles/forms";
import { CustomButton } from "@/components/utils/button";

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

  return (
    <div className="flex flex-wrap items-stretch max-w-screen-lg w-full h-[500px] mx-auto">
      {/* 배경 영역 */}
      <div className="flex flex-1 items-center justify-start pl-10 bg-gray-500">
        <img src="/logo.png" alt="Logo" className="w-50 h-auto" />
      </div>

      {/* 폼 영역 */}
      <form
        style={formStyles.form}
        className="flex flex-col justify-center w-2/5 p-10 bg-white shadow-lg"
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
          계정이 이미 있나요?{" "}
          <a href="/login" className="text-blue-500 underline">
            로그인 하기
          </a>
        </h3>
        <CustomButton $label="계정 생성하기" $sizeType="long" type="submit" />
      </form>
    </div>
  );
};

export default SignupBody;
