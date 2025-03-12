"use client";

import React, { useState } from "react";
import { formStyles } from "@/app/styles/forms";
import { CustomButton } from "@/components/utils/button";
import { useUpdatePassword } from "@/app/lib/codegen/hooks/user-api/user-api";
import { useRouter } from "next/navigation";

const PasswordChangePage = () => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*()-+=]).{8,20}$/;

  const mutation = useUpdatePassword({
    mutation: {
      onSuccess: () => {
        alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
        router.push("/auth/login"); // 변경 후 로그인 페이지로 이동
      },
      onError: (error: any) => {
        alert(`비밀번호 변경에 실패했습니다: ${error.message}`);
      },
    },
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "비밀번호는 8~20자이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
      );
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }

    mutation.mutate({ data: { currentPassword, newPassword } });
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
        <img src="/logo.png" alt="Logo" className="w-80 h-auto ml-28" />
      </div>

      {/* 폼 영역 */}
      <form
        onSubmit={handlePasswordChange}
        style={{
          ...formStyles.form,
          width: "70%",
          height: "800px",
          border: "1px solid black",
        }}
        className="flex flex-col bg-white shadow-lg"
      >
        <h2 style={formStyles.heading}>비밀번호 변경</h2>

        <div style={formStyles.field}>
          <label style={formStyles.label}>현재 비밀번호</label>
          <input
            type="password"
            placeholder="현재 비밀번호"
            className="border rounded p-2 w-full"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        <div style={formStyles.field}>
          <label style={formStyles.label}>새 비밀번호</label>
          <input
            type="password"
            placeholder="새 비밀번호"
            className="border rounded p-2 w-full"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              if (!passwordRegex.test(e.target.value)) {
                setPasswordError(
                  "비밀번호는 8~20자이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
                );
              } else {
                setPasswordError("");
              }
            }}
            required
          />
          {passwordError && (
            <span className="text-red-500 text-sm">{passwordError}</span>
          )}
        </div>

        <div style={formStyles.field}>
          <label style={formStyles.label}>새 비밀번호 확인</label>
          <div className="relative">
            <input
              type="password"
              placeholder="새 비밀번호 확인"
              className="border rounded p-2 w-full"
              value={confirmNewPassword}
              onChange={(e) => {
                setConfirmNewPassword(e.target.value);
                setConfirmPasswordError(
                  e.target.value === newPassword
                    ? ""
                    : "비밀번호가 일치하지 않습니다."
                );
              }}
              required
            />
            {confirmNewPassword && (
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                style={{
                  color: newPassword === confirmNewPassword ? "green" : "red",
                }}
              >
                {newPassword === confirmNewPassword ? "✔" : "✘"}
              </span>
            )}
          </div>
          {confirmPasswordError && (
            <span className="text-red-500 text-sm">{confirmPasswordError}</span>
          )}
        </div>

        <CustomButton
          $label="비밀번호 변경하기"
          $sizeType="long"
          type="submit"
        />
      </form>
    </div>
  );
};

export default PasswordChangePage;
