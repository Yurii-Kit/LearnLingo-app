// src/components/App.tsx
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

import HomePage from "../../pages/HomePage/HomePage";
import TeachersPage from "../../pages/TeachersPage";

import Layout from "../Layout/Layout";

function App() {
  return (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
