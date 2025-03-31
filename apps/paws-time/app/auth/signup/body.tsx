"use client";

import React, { useState } from "react";
import { formStyles } from "@/app/styles/forms";
import { CustomButton } from "@/components/utils/button";
import { useCreateUser } from "../../lib/codegen/hooks/user-api/user-api";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import Image from "next/image";

// interface PostData {
//   email: string;
//   nick: string;
//   /** @pattern ^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*()-+=]).{8,}$ */
//   password: string;
// }
//  useCreateUser가 이미 타입을 관리하는 중

const SignupBody = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailPlaceholder, setEmailPlaceholder] = useState("이메일");
  const [nickPlaceholder, setNickPlaceholder] = useState("닉네임");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*()-+=]).{8,}$/;

  const mutation = useCreateUser({
    mutation: {
      onSuccess: () => {
        alert("회원가입이 완료되었습니다.");
        router.push("/auth/login"); // 회원가입 성공 후 로그인 페이지로 이동
      },
      onError: (error: AxiosError<{ message: string; status?: string }>) => {
        // * status 값에 따라 오류 메세지 구분 하기 때문에 status 타입 명시해주기
        const message =
          error?.response?.data?.message || "회원가입에 실패했습니다.";
        const status = error?.response?.data?.status;

        if (status === "DUPLICATE") {
          if (message.includes("이메일")) {
            setEmail("");
            setEmailPlaceholder(message);
          } else if (message.includes("닉네임")) {
            setNick("");
            setNickPlaceholder(message);
          }
        } else {
          alert(message); // 기타 오류는 일반 경고창으로 표시
        }
      },
    },
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setEmailError("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "비밀번호는 최소 8자, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
      );
      return;
    }

    if (password !== checkPassword) {
      alert("패스워드가 일치하지 않습니다.");
      return;
    }

    mutation.mutate({ data: { email, nick, password } });
  };

  const handleLoginNavigation = () => {
    router.push("/auth/login");
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
      {/* 배경 영역 */}
      <div
        style={{ ...formStyles.background, height: "800px" }}
        className="flex flex-1 items-center"
      >
        <Image
          src="https://paws-time-bucket.s3.ap-northeast-2.amazonaws.com/logo.jpg"
          alt="LOGO"
          width={320}
          height={320}
          className="ml-28"
        />
      </div>

      {/* 폼 영역 */}
      <form
        onSubmit={handleSignup}
        style={{
          ...formStyles.form,
          width: "70%",
          height: "800px",
          border: "1px solid black",
        }}
        className="flex flex-col bg-white shadow-lg"
      >
        <h2 style={formStyles.heading}>회원가입</h2>

        <div style={formStyles.field}>
          <label style={formStyles.label}>이메일</label>
          <input
            type="text"
            placeholder={emailPlaceholder}
            className={`border rounded p-2 w-full ${emailPlaceholder !== "이메일" ? "text-red-500 placeholder-red-500" : ""}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailPlaceholder("이메일");
            }}
          />
        </div>

        <div style={formStyles.field}>
          <label style={formStyles.label}>닉네임</label>
          <input
            type="text"
            placeholder={nickPlaceholder}
            className={`border rounded p-2 w-full ${nickPlaceholder !== "닉네임" ? "text-red-500 placeholder-red-500" : ""}`}
            value={nick}
            onChange={(e) => {
              setNick(e.target.value);
              setNickPlaceholder("닉네임");
            }}
          />
        </div>

        <div style={formStyles.field}>
          <label style={formStyles.label}>패스워드</label>
          <input
            type="password"
            placeholder="패스워드"
            className="border rounded p-2 w-full"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (!passwordRegex.test(e.target.value)) {
                setPasswordError(
                  "비밀번호는 최소 8자, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
                );
              } else {
                setPasswordError("");
              }
            }}
          />
          {passwordError && (
            <span className="text-red-500 text-sm">{passwordError}</span>
          )}
        </div>

        <div style={formStyles.field}>
          <label style={formStyles.label}>패스워드 확인</label>
          <div className="relative">
            <input
              type="password"
              placeholder="패스워드 확인"
              className="border rounded p-2 w-full"
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
            />
            {checkPassword && (
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                style={{
                  color: password === checkPassword ? "green" : "red",
                }}
              >
                {password === checkPassword ? "✔" : "✘"}
              </span>
            )}
          </div>
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
