// src/components/App.tsx
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

import HomePage from "../../pages/HomePage";
import TeachersPage from "../../pages/TeachersPage";
import RegisterPage from "../../pages/RegisterPage";
import LoginPage from "../../pages/LoginPage";

import Layout from "../Layout/Layout";

function App() {
  return (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
