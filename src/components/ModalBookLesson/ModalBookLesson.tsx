import type { ModalBookLessonProps } from "../../types";
import ModalWindow from "../ModalWindow/ModalWindow";
import css from "./ModalBookLesson.module.css";

export default function ModalBookLesson({
  onClose,
  teacher,
}: ModalBookLessonProps) {
  const handleSubmit = (formData: FormData) => {
    const formValues = {
      ...Object.fromEntries(formData),
    };

    console.log(formValues);
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

      <form className={css.form} action={handleSubmit}>
        <div className={css.optionsGroup}>
          <label className={css.option}>
            <input
              type="radio"
              name="reason"
              value="Career and business"
              defaultChecked
            />
            Career and business
          </label>

          <label className={css.option}>
            <input type="radio" name="reason" value="Lesson for kids" />
            Lesson for kids
          </label>

          <label className={css.option}>
            <input type="radio" name="reason" value="Living abroad" />
            Living abroad
          </label>

          <label className={css.option}>
            <input type="radio" name="reason" value="Exams and coursework" />
            Exams and coursework
          </label>

          <label className={css.option}>
            <input
              type="radio"
              name="reason"
              value="Culture, travel or hobby"
            />
            Culture, travel or hobby
          </label>
        </div>

        <div className={css.inputs}>
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            className={css.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={css.input}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            className={css.input}
          />
        </div>

        <button type="submit" className={css.submitBtn}>
          Book
        </button>
      </form>
    </ModalWindow>
  );
}
