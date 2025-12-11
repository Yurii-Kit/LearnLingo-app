import { Navigate } from "react-router-dom";
import { useAuthStore } from "../lib/store/authStore";
import type { PrivateRouteProps } from "../types";

export default function PrivateRoute({ component }: PrivateRouteProps) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return isLoggedIn ? component : <Navigate to="/" />;
}
