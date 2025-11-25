import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ModalWindow from "../ModalWindow/ModalWindow";
import { FiEye, FiEyeOff } from "react-icons/fi";
import css from "./ModalLogin.module.css";

interface ModalLoginProps {
  onClose: () => void;
}

// 1. Типізація форми
interface IFormInputs {
  email: string;
  password: string;
}

// 2. Схема валидації з Yup
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function ModalLogin({ onClose }: ModalLoginProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // 3. Ініціалізація хука форми
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>({
    resolver: yupResolver(loginSchema), // Підключаємо Yup
    mode: "onBlur", // Валідація спрацює, коли користувач прибере фокус (або "onChange")
  });

  // 4. Функція сабміту отримує вже чисті дані
  const onSubmit = (data: IFormInputs) => {
    console.log(data); // Тут об'єкт { email: "...", password: "..." }
    reset(); // Очищення форми
    // Тут можна викликати onClose(), якщо логін успішний
  };

  return (
    <ModalWindow onClose={onClose}>
      <div className={css.titleContainer}>
        <h2 className={css.title}>Log In</h2>
        <p className={css.text}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for a teacher.
        </p>
      </div>

      {/* 5. handleSubmit обгортає функцію */}
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.passwordWrapper}>
          <input
            className={`${css.inputField} ${
              errors.email ? css.errorBorder : ""
            }`}
            type="text"
            placeholder="Email"
            // 6. Реєструємо поле (замінює name, onChange, onBlur, value)
            {...register("email")}
          />
          {/* 7. Виводимо помилки з об'єкта errors */}
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

        <button className={css.formBtn} type="submit">
          Log In
        </button>
      </form>
    </ModalWindow>
  );
}
