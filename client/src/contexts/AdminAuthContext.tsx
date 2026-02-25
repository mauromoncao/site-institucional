import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { trpc } from "@/lib/trpc";

type AdminUser = {
  id: number;
  email: string;
  name: string;
  role: string;
};

type AdminAuthContextType = {
  admin: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const meQuery = trpc.adminAuth.me.useQuery(undefined, { retry: false });
  const loginMutation = trpc.adminAuth.login.useMutation();
  const googleLoginMutation = trpc.adminAuth.loginWithGoogle.useMutation();
  const logoutMutation = trpc.adminAuth.logout.useMutation();
  const utils = trpc.useUtils();

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
    await utils.adminAuth.me.invalidate();
  };

  const loginWithGoogle = async (idToken: string) => {
    await googleLoginMutation.mutateAsync({ idToken });
    await utils.adminAuth.me.invalidate();
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
    await utils.adminAuth.me.invalidate();
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin: meQuery.data ?? null,
        loading: meQuery.isLoading,
        login,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
