import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "modern-normalize";
import "./index.css";
import App from "./components/App/App";

console.log("🚀 [MAIN] Початок монтування додатку");

createRoot(document.getElementById("root") as HTMLDivElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

console.log("✅ [MAIN] Додаток змонтовано");
