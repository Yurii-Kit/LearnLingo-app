// src/components/App.tsx
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

import HomePage from "../../pages/HomePage/HomePage";
import TeachersPage from "../../pages/TeachersPage";

import Layout from "../Layout/Layout";
import SvgSprite from "../Icon/SvgSprite/SvgSprite";

function App() {
  return (
    <>
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
