// src/components/App.tsx
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import PrivateRoute from "../../pages/PrivateRoute";
import Layout from "../Layout/Layout";
import SvgSprite from "../Icon/SvgSprite/SvgSprite";
import { Toaster } from "react-hot-toast";
import LoaderOverlay from "../LoaderOverlay/LoaderOverlay";
import { useCheckAuth } from "../../lib/hooks/checkAuth";
import { useAuthStore } from "../../lib/store/authStore";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const TeachersPage = lazy(() => import("../../pages/TeacherPage/TeachersPage"));
const Favorites = lazy(() => import("../../pages/FavoritePage/FavoritePage"));
const NotFoundPage = lazy(
  () => import("../../pages/NotFoundPage/NotFoundPage")
);

function App() {
  useCheckAuth();

  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) {
    return (
      <div>
        <LoaderOverlay />
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <SvgSprite />
      <Layout>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route
              path="/favorites"
              element={<PrivateRoute component={<Favorites />} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
