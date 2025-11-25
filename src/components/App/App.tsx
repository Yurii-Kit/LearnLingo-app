// src/components/App.tsx
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

import HomePage from "../../pages/HomePage/HomePage";
import TeachersPage from "../../pages/TeachersPage";

import Layout from "../Layout/Layout";
import SvgSprite from "../Icon/SvgSprite/SvgSprite";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <SvgSprite />
      <Layout>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
