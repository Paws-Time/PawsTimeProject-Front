"use client";

import { decodeJWT } from "@/components/utils/jwt";
import { create } from "zustand";
import { getUserFromUserId } from "../lib/codegen/hooks/user-api/user-api";

interface AuthState {
  token: string | null;
  userId: string | null;
  nick: string | null;
  role: string | null;
  setToken: (token: string | null) => void;
  setUserId: (userId: string | null) => void;
  setNick: (nick: string | null) => void;
  setRole: (role: string | null) => void;
  restoreState: () => void;
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

  setUserId: (userId: string | null) => set({ userId }),

  setNick: (nick: string | null) => set({ nick }),

  setRole: (role: string | null) => set({ role }),

  restoreState: async () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decoded = decodeJWT(token) as { userId: string };
      if (decoded.userId) {
        set({ token, userId: decoded.userId });

        // userId를 이용해서 nick, email, role 가져오기
        try {
          const response = await getUserFromUserId(Number(decoded.userId));
          if (response.data) {
            set({
              nick: response.data.nick ?? null,
              role: response.data.role ?? null,
            });
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      }
    }
  },

  clearToken: () => {
    set({ token: null, userId: null, role: null });
    localStorage.removeItem("jwtToken");
  },

  logoutState: () => {
    set({ token: null, userId: null, role: null });
    localStorage.removeItem("jwtToken");
  },
}));
