"use client";

import React, { useState } from "react";
import { formStyles } from "@/app/styles/forms";
import { CustomButton } from "@/components/utils/button";
import { useCreateUser } from "../../lib/codegen/hooks/user-api/user-api";

// interface PostData {
//   email: string;
//   nick: string;
//   /** @pattern ^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*()-+=]).{8,}$ */
//   password: string;
// }
// useCreateUser가 이미 타입을 관리하는 중

const SignupBody = () => {
  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const mutation = useCreateUser({
    mutation: {
      onSuccess: () => {
        alert("회원가입이 완료되었습니다.");
        // router.push("/auth/login"); // 회원가입 성공 후 로그인 페이지로 이동
      },
      onError: (error: any) => {
        alert(`회원가입에 실패했습니다: ${error.message}`);
      },
    },
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== checkPassword) {
      alert("패스워드가 일치하지 않습니다.");
      return;
    }

    mutation.mutate({ data: { email, nick, password } });
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
        onSubmit={handleSignup}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={formStyles.field}>
          <label style={formStyles.label}>닉네임</label>
          <input
            type="text"
            placeholder="닉네임"
            className="border rounded p-2 w-full"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
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

        <div style={formStyles.field}>
          <label style={formStyles.label}>패스워드 확인</label>
          <input
            type="password"
            placeholder="패스워드 확인"
            className="border rounded p-2 w-full"
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
          />
        </div>

        <h3 className="mt-4 text-sm">
          계정이 있으신가요?{" "}
          <button type="button" className="text-blue-500 underline">
            로그인 하기
          </button>
        </h3>
        <CustomButton $label="계정 생성하기" $sizeType="long" type="submit" />
      </form>
    </div>
  );
};

export default SignupBody;
