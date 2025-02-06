"use client";

import { useRouter } from "next/navigation";
import { useLogoutUser } from "@/app/lib/codegen/hooks/user-api/user-api";
import { useAuthStore } from "@/app/hooks/authStore";

export const useHandleLogout = () => {
  const router = useRouter();
  const logoutState = useAuthStore((state) => state.logoutState);
  const logoutMutation = useLogoutUser();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync(); // API 호출
      logoutState(); // 상태 초기화
      router.push("/"); // 리다이렉트
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return handleLogout;
};
