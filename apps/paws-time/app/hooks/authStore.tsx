"use client";

import { decodeJWT } from "@/components/utils/jwt";
import { create } from "zustand";

interface AuthState {
  token: string | null;
  email: string | null;
  setToken: (token: string | null) => void;
  setEmail: (email: string | null) => void;
  restoreState: () => void;
  clearToken: () => void;
  clearEmail: () => void;
  logoutState: () => void; // 상태 초기화만 수행
}

export const useAuthStore = create<AuthState>((set) => ({
  token:
    typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null,
  email: null,
  setToken: (token: string | null) => {
    set({ token });
    if (token) {
      localStorage.setItem("jwtToken", token);
    } else {
      localStorage.removeItem("jwtToken");
    }
  },
  setEmail: (email: string | null) => {
    set({ email });
  },
  restoreState: () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decoded = decodeJWT(token) as { email: string };
      if (decoded.email) {
        set({ token, email: decoded.email });
      }
    }
  },
  clearToken: () => {
    set({ token: null });
    localStorage.removeItem("jwtToken");
  },
  clearEmail: () => {
    set({ email: null });
  },
  logoutState: () => {
    set({ token: null, email: null });
    localStorage.removeItem("jwtToken");
  },
}));
