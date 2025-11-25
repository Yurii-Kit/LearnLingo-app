import { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalWindow from "../ModalWindow/ModalWindow";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAuthStore } from "../../lib/store/authStore";
import toast, { Toaster } from "react-hot-toast";

import css from "./ModalRegister.module.css";

interface ModalLoginProps {
  onClose: () => void;
}

interface IFormInputs {
  name: string;
  email: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function ModalRegister({ onClose }: ModalLoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: IFormInputs) => {
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: data.name,
      });
      console.log("Registered user:", user);

      // Оновлюємо глобальний стан
      setUser({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
      });
      console.log("GLOBAL USER:", useAuthStore.getState().user);

      reset();
      onClose();
      toast.success("Registration successful");
    } catch (error: any) {
      console.error("Error registering user:", error);
      toast.error("Registration failed");
    } finally {
      setIsLoading(false); // завершення загрузки
    }
  };
  return (
    <ModalWindow onClose={onClose}>
      <div className={css.titleContainer}>
        <h2 className={css.title}>Registration</h2>
        <p className={css.text}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>
      </div>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.passwordWrapper}>
          <input
            className={css.inputField}
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && (
            <div className={css.error}>{errors.name.message}</div>
          )}
        </div>
        <div className={css.passwordWrapper}>
          <input
            className={css.inputField}
            type="text"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <div className={css.error}>{errors.email.message}</div>
          )}
        </div>
        <div className={css.passwordWrapper}>
          <input
            className={css.inputField}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <div className={css.error}>{errors.password.message}</div>
          )}

          <button
            type="button"
            className={css.eyeBtn}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
          </button>
        </div>
        <button className={css.formBtn} type="submit" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </ModalWindow>
  );
}
