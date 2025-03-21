"use client";

import { decodeJWT } from "@/components/utils/jwt";
import { create } from "zustand";
import { getUserFromUserId } from "../lib/codegen/hooks/user-api/user-api";
import { useEffect, useState } from "react";

interface AuthState {
  token: string | null;
  userId: number | null;
  nick: string | null;
  role: string | null;
  setToken: (token: string | null) => void;
  setUserId: (userId: number | null) => void;
  setNick: (nick: string | null) => void;
  setRole: (role: string | null) => void;
  restoreState: () => Promise<void>;
  clearToken: () => void;
  logoutState: () => void;
  setAuth: (auth: Partial<AuthState>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null, // ✅ 초기 상태를 `null`로 설정하여 서버와 일관성 유지
  userId: null,
  nick: null,
  role: null,

  setToken: (token: string | null) => {
    set({ token });
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("jwtToken", token);
      } else {
        localStorage.removeItem("jwtToken");
      }
    }
  },

  setUserId: (userId: number | null) => set({ userId }),

  setNick: (nick: string | null) => set({ nick }),

  setRole: (role: string | null) => set({ role }),

  setAuth: (auth: Partial<AuthState>) =>
    set((state) => ({ ...state, ...auth })),

  restoreState: async () => {
    try {
      if (typeof window === "undefined") return; // ✅ 서버 환경에서는 실행하지 않음

      const token = localStorage.getItem("jwtToken");
      if (token) {
        const decoded = decodeJWT(token) as { userId: string };
        const userId = Number(decoded.userId);

        if (userId) {
          set({ token, userId });

          // userId를 이용해서 닉네임과 역할(role) 가져오기
          const response = await getUserFromUserId(userId);
          if (response.data) {
            set({
              nick: response.data.nick ?? null,
              role: response.data.role ?? null,
            });
          }
        }
      }
    } catch (error) {
      console.error("Failed to restore auth state:", error);
      set({ token: null, userId: null, nick: null, role: null });
      localStorage.removeItem("jwtToken");
    }
  },

  clearToken: () => {
    set({ token: null, userId: null, role: null, nick: null });
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwtToken");
    }
  },

  logoutState: () => {
    set({ token: null, userId: null, role: null, nick: null });
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwtToken");
    }
  },
}));

// ✅ `useAuth` 훅 추가 (서버에서 실행 방지)
export const useAuth = () => {
  const auth = useAuthStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    auth.restoreState(); // ✅ 클라이언트에서만 상태 복원 실행
  }, []);

  if (!isClient) {
    return {
      token: null,
      userId: null,
      nick: null,
      role: null,
      setToken: () => {},
      setUserId: () => {},
      setNick: () => {},
      setRole: () => {},
      restoreState: async () => {},
      clearToken: () => {},
      logoutState: () => {},
      setAuth: () => {},
    }; // ✅ 서버에서는 빈 상태 반환 (Hydration 오류 방지)
  }

  return auth;
};
