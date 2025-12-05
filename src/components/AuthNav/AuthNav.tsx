import { useState } from "react";
import css from "./AuthNav.module.css";
import ModalLogin from "../ModalLogin/ModalLogin";
import ModalRegister from "../ModalRegister/ModalRegister";
import Icon from "../Icon/Icon";

export default function AuthNav() {
  const [modalType, setModalType] = useState<"login" | "register" | null>(null);

  const openModal = (type: "login" | "register") => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <div className={css.authNav}>
      <button
        type="button"
        className={css.loginButton}
        onClick={() => openModal("login")}
      >
        <Icon name="log-in-01" width={20} height={20}></Icon>
        Log in
      </button>
      <button
        type="button"
        className={css.registerButton}
        onClick={() => openModal("register")}
      >
        Registration
      </button>
      {modalType === "login" && <ModalLogin onClose={closeModal} />}

      {modalType === "register" && <ModalRegister onClose={closeModal} />}
    </div>
  );
}
