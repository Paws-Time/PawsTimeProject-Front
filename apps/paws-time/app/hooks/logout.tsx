"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/hooks/authStore";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@/app/lib/codegen/hooks/user-api/user-api"; // 로그아웃 API 추가

export const useHandleLogout = () => {
  const router = useRouter();
  const logoutState = useAuthStore((state) => state.logoutState);

  // 🔹 로그아웃 API 호출
  const { mutate: logoutMutation } = useMutation({
    mutationFn: () => logoutUser({}), // 🔹 빈 객체 전달하여 호출
    onSuccess: () => {
      logoutState(); // Zustand 상태 초기화
      alert("로그아웃 되었습니다."); // 사용자 알림
      router.push("/home"); // 메인 페이지로 이동
      router.refresh(); // 🔹 상태 즉시 반영
    },
    onError: (error) => {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const handleLogout = () => {
    logoutMutation(); // 🔹 인자 없이 호출 가능해짐
  };

  return handleLogout;
};
