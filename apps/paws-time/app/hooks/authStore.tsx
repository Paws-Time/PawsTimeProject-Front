"use client";

import { decodeJWT } from "@/components/utils/jwt";
import { create } from "zustand";
import { getUserFromUserId } from "../lib/codegen/hooks/user-api/user-api";
import { useEffect } from "react";

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
}

export const useAuthStore = create<AuthState>((set) => ({
  token:
    typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null,
  userId: null,
  nick: null,
  role: null,

  setToken: (token: string | null) => {
    set({ token });
    if (token) {
      localStorage.setItem("jwtToken", token);
    } else {
      localStorage.removeItem("jwtToken");
    }
  },

  setUserId: (userId: number | null) => set({ userId }),

  setNick: (nick: string | null) => set({ nick }),

  setRole: (role: string | null) => set({ role }),

  restoreState: async () => {
    try {
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
    localStorage.removeItem("jwtToken");
  },

  logoutState: () => {
    set({ token: null, userId: null, role: null, nick: null });
    localStorage.removeItem("jwtToken");
  },
}));

// ✅ `useAuth` 훅 추가 (자동으로 로그인 상태 복원)
export const useAuth = () => {
  const auth = useAuthStore();

  useEffect(() => {
    auth.restoreState();
  }, []);

  return auth;
};
