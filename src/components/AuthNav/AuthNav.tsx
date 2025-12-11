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
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        className={css.whatsappLink}
        aria-label="Contact us on WhatsApp"
      >
        <Icon name="whatsapp" width={28} height={28}></Icon>
      </a>
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
