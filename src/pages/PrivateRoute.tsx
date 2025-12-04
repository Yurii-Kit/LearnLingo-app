import { Navigate } from "react-router-dom";
import { useAuthStore } from "../lib/store/authStore";
import type { PrivateRouteProps } from "../types";

export default function PrivateRoute({ component }: PrivateRouteProps) {
  const isLoggedIn = useAuthStore((state) => !!state.user);

  console.log("🔒 [PRIVATE ROUTE] Перевірка доступу, isLoggedIn:", isLoggedIn);

  if (!isLoggedIn) {
    console.log("🔒 [PRIVATE ROUTE] Редірект на головну сторінку");
  }

  return isLoggedIn ? component : <Navigate to="/" />;
}
