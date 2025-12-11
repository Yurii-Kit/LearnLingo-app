import { useState } from "react";
import type { TeacherCardProps } from "../../types";
import css from "./TeacherCard.module.css";
import { useAuthStore } from "../../lib/store/authStore";
import ModalRequaried from "../ModalRequired/ModalRequired";
import ModalBookLesson from "../ModalBookLesson/ModalBookLesson";
import TeacherAvatar from "../TeacherAvatar/TeacherAvatar";
import TeacherStats from "../TeacherStats/TeacherStats";
import TeacherInfo from "../TeacherInfo/TeacherInfo";
import TeacherReviews from "../TeacherReviews/TeacherReviews";
import TeacherLevels from "../TeacherLevels/TeacherLevels";

export default function TeacherCard({ teacher }: TeacherCardProps) {
  const [showMore, setShowMore] = useState(false);
  const [modalType, setModalType] = useState<"auth" | "bookLesson" | null>(
    null
  );
  const { favorites, addFavorite, removeFavorite, isLoggedIn } = useAuthStore();

  const openModal = (type: "auth" | "bookLesson") => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  const isFavorite = favorites.includes(teacher.id);

  const handleToggleFavorite = () => {
    if (!isLoggedIn) {
      openModal("auth");
      return;
    }
    isFavorite ? removeFavorite(teacher.id) : addFavorite(teacher.id);
  };

  return (
    <div className={css.card}>
      <TeacherAvatar
        avatarUrl={teacher.avatar_url}
        name={teacher.name}
        surname={teacher.surname}
      />

      <div className={css.content}>
        <div className={css.mainInfo}>
          <div className={css.headerInfo}>
            <div className={css.title}>
              <p className={css.subtitle}>Languages</p>
              <h3 className={css.name}>
                {teacher.name} {teacher.surname}
              </h3>
            </div>
            <TeacherStats
              lessonsDone={teacher.lessons_done}
              rating={teacher.rating}
              pricePerHour={teacher.price_per_hour}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>

          <TeacherInfo
            languages={teacher.languages}
            lessonInfo={teacher.lesson_info}
            conditions={teacher.conditions}
          />

          {!showMore ? (
            <button
              onClick={() => setShowMore(true)}
              className={css.readMoreBtn}
            >
              Read more
            </button>
          ) : (
            <p className={css.experience}>{teacher.experience}</p>
          )}
        </div>

        {showMore && <TeacherReviews reviews={teacher.reviews} />}

        <TeacherLevels levels={teacher.levels} />

        {showMore && (
          <button
            type="button"
            className={css.contactBtn}
            onClick={() => openModal("bookLesson")}
          >
            Book trial lesson
          </button>
        )}
      </div>
      {modalType === "auth" && <ModalRequaried onClose={closeModal} />}
      {modalType === "bookLesson" && (
        <ModalBookLesson onClose={closeModal} teacher={teacher} />
      )}
    </div>
  );
}
