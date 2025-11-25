import { Navigate } from "react-router-dom";
import { useAuthStore } from "../lib/store/authStore";

interface Props {
  component: React.ReactElement;
}

export default function PrivateRoute({ component }: Props) {
  const isLoggedIn = useAuthStore((state) => !!state.user);

  return isLoggedIn ? component : <Navigate to="/" />;
}
