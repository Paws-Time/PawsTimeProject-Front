"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { formStyles } from "@/app/styles/forms";
import { CustomButton } from "@/components/utils/button";
import { useLoginUser } from "../../lib/codegen/hooks/user-api/user-api";
import { useAuthStore } from "@/app/hooks/authStore";
import { decodeJWT } from "@/components/utils/jwt";
import { getUserFromUserId } from "@/app/lib/codegen/hooks/user-api/user-api"; // 추가
import { AxiosError } from "axios";

const LoginBody = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const setToken = useAuthStore((state) => state.setToken);
  const setUserId = useAuthStore((state) => state.setUserId);
  const setNick = useAuthStore((state) => state.setNick);
  const setRole = useAuthStore((state) => state.setRole);

  const mutation = useLoginUser({
    mutation: {
      onSuccess: async (data) => {
        alert(data.message);

        const token = data.data;
        setToken(token as string);

        // JWT 토큰 디코딩하여 userId 가져오기
        const decodedToken = decodeJWT(token as string);
        if (decodedToken?.userId) {
          setUserId(decodedToken.userId); // userId 상태 업데이트

          // 🔹 로그인 후 userId를 이용해 닉네임을 가져와 상태 업데이트
          try {
            const response = await getUserFromUserId(
              Number(decodedToken.userId)
            );
            if (response.data) {
              setNick(response.data.nick ?? null);
              setRole(response.data.role ?? null);
            }
          } catch (error) {
            console.error("유저 정보를 불러오는데 실패했습니다:", error);
          }
        }

        router.push("/");
      },
      onError: (error: AxiosError<{ message: string }>) => {
        const message = error.response?.data?.message ?? "";
        // * ?? "" 라고 빈 문자열을 명시하는 이유 -> setErrorMessage에 초기값을 string을 주었는데 message는 string | undefined 타입일 수 있기 때문에
        setErrorMessage(message);
      },
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    mutation.mutate({ data: { email, password } });
  };

  const handleSignupNavigation = () => {
    router.push("/auth/signup");
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
        marginLeft: "500px",
        overflow: "hidden",
      }}
    >
      <div
        style={{ ...formStyles.background, height: "800px" }}
        className="flex flex-1 items-center"
      >
        <img src="/logo.png" alt="Logo" className="w-80 h-auto ml-28" />
      </div>

      <form
        onSubmit={handleLogin}
        style={{
          ...formStyles.form,
          width: "70%",
          height: "800px",
          border: "1px solid black",
        }}
        className="flex flex-col bg-white shadow-lg"
      >
        <h2 style={formStyles.heading}>로그인</h2>

        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}

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
