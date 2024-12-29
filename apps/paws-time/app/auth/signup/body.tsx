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
    <div
      className="flex"
      style={{
        flexDirection: "row", // 수평 방향(row)
        justifyContent: "flex-end", // 수평 정렬(center로 설정)
        alignItems: "center", // 수직 정렬(중앙 정렬 추가)
        width: "1200px", // 고정된 너비 설정
        height: "800px", // 고정된 높이 설정
        margin: "0 auto", // 화면 중앙 정렬
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
          <a href="/auth/login" className="text-blue-500 underline">
            로그인 하기
          </a>
        </h3>
        <CustomButton $label="계정 생성하기" $sizeType="long" type="submit" />
      </form>
    </div>
  );
};

export default SignupBody;
