import { useState } from "react";
import ModalWindow from "../ModalWindow/ModalWindow";
import ModalLogin from "../ModalLogin/ModalLogin";
import ModalRegister from "../ModalRegister/ModalRegister";
import type { ModalRequariedProps } from "../../types";

import css from "./ModalRequaried.module.css";

export default function ModalRequaried({ onClose }: ModalRequariedProps) {
  const [modalType, setModalType] = useState<"login" | "register" | null>(null);

  // Коли обрано логін/реєстрацію — показуємо відповідну модалку замість цієї
  if (modalType === "login") {
    return <ModalLogin onClose={onClose} />;
  }
  if (modalType === "register") {
    return <ModalRegister onClose={onClose} />;
  }

  return (
    <ModalWindow onClose={onClose}>
      <p className={css.message}>Please log in or register to add favorites.</p>
      <div className={css.wrapperBtn}>
        <button
          className={css.button}
          type="button"
          onClick={() => setModalType("login")}
        >
          Go to Login
        </button>
        <button
          className={css.button}
          type="button"
          onClick={() => setModalType("register")}
        >
          Go to Register
        </button>
      </div>
    </ModalWindow>
  );
}
