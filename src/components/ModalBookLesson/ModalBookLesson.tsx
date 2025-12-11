import type { ModalBookLessonProps, BookFormInputs } from "../../types";
import ModalWindow from "../ModalWindow/ModalWindow";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import css from "./ModalBookLesson.module.css";

// 2. Схема валидації з Yup
const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .trim()
    .required("Phone number is required")
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g, "Invalid phone number"),
  reason: Yup.string().required("Please choose a reason"),
});

export default function ModalBookLesson({
  onClose,
  teacher,
}: ModalBookLessonProps) {
  // 3. Ініціалізація хука форми
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookFormInputs>({
    resolver: yupResolver(loginSchema), // Підключаємо Yup
    defaultValues: {
      reason: "Career and business",
      username: "",
      email: "",
      phone: "",
    },
    mode: "onBlur", // Валідація спрацює, коли користувач прибере фокус (або "onChange")
  });

  const onSubmit = (data: BookFormInputs) => {
    console.log(data);
    toast.success("Lesson booked successfully");
    onClose();
    reset();
  };
  return (
    <ModalWindow onClose={onClose} className={css.modalBook}>
      <div className={css.titleContainer}>
        <h2 className={css.title}>Book trial lesson</h2>
        <p className={css.description}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>
      </div>
      <figure className={css.teacherBlock}>
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          className={css.avatar}
          width={44}
          height={44}
        />
        <figcaption className={css.teacherInfo}>
          <span className={css.teacherLabel}>Your teacher</span>
          <span className={css.teacherName}>
            {teacher.name} {teacher.surname}
          </span>
        </figcaption>
      </figure>
      <p className={css.text}>What is your main reason for learning English?</p>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.optionsGroup}>
          <label aria-label="Career and business" className={css.option}>
            <input
              type="radio"
              {...register("reason")}
              value="Career and business"
            />
            Career and business
          </label>

          <label aria-label="Lesson for kids" className={css.option}>
            <input
              type="radio"
              {...register("reason")}
              value="Lesson for kids"
            />
            Lesson for kids
          </label>

          <label aria-label="Living abroad" className={css.option}>
            <input type="radio" {...register("reason")} value="Living abroad" />
            Living abroad
          </label>

          <label aria-label="Exams and coursework" className={css.option}>
            <input
              type="radio"
              {...register("reason")}
              value="Exams and coursework"
            />
            Exams and coursework
          </label>

          <label aria-label="Culture, travel or hobby" className={css.option}>
            <input
              type="radio"
              {...register("reason")}
              value="Culture, travel or hobby"
            />
            Culture, travel or hobby
          </label>
        </div>

        <div className={css.inputs}>
          <div className={css.inputWrapper}>
            <label htmlFor="username" className={css.visuallyHidden}>
              Full Name
            </label>
            <input
              type="text"
              {...register("username")}
              placeholder="Full Name"
              className={`${css.input} ${
                errors.username ? css.errorBorder : ""
              }`}
            />
            {errors.username && (
              <div className={css.error}>{errors.username.message}</div>
            )}
          </div>
          <div className={css.inputWrapper}>
            <label htmlFor="email" className={css.visuallyHidden}>
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className={`${css.input} ${errors.email ? css.errorBorder : ""}`}
            />
            {errors.email && (
              <div className={css.error}>{errors.email.message}</div>
            )}
          </div>
          <div className={css.inputWrapper}>
            <label htmlFor="phone" className={css.visuallyHidden}>
              Phone number
            </label>
            <input
              type="tel"
              {...register("phone")}
              placeholder="Phone number"
              className={`${css.input} ${errors.phone ? css.errorBorder : ""}`}
            />
            {errors.phone && (
              <div className={css.error}>{errors.phone.message}</div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={css.submitBtn}
          disabled={isSubmitting}
          aria-label="book trial lesson"
        >
          Book
        </button>
      </form>
    </ModalWindow>
  );
}
