import { useState } from "react";
import type { TeacherCardProps } from "../../types";
import css from "./TeacherCard.module.css";
import Icon from "../Icon/Icon";
import { useAuthStore } from "../../lib/store/authStore";

import ModalWindow from "../ModalWindow/ModalWindow";
import { Link } from "react-router-dom";
import ModalRequared from "../ModalRequared/ModalRequared";

export default function TeacherCard({ teacher }: TeacherCardProps) {
  const [showMore, setShowMore] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isLoggedIn } = useAuthStore();

  const handleToggleFavorite = () => {
    if (!isLoggedIn) {
      setIsOpenModal(true);
      return;
    } else {
      console.log("Toggled favorite for teacher:", teacher.id);
    }
  };

  return (
    <div className={css.card}>
      <div className={css.avatarWrapper}>
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          className={css.avatar}
          width={96}
          height={96}
        />
        <Icon className={css.spot} name="Group-82" width={12} height={12} />
      </div>

      <div className={css.content}>
        <div className={css.mainInfo}>
          <div className={css.headerInfo}>
            <div className={css.title}>
              <p className={css.subtitle}>Languages</p>
              <h3 className={css.name}>
                {teacher.name} {teacher.surname}
              </h3>
            </div>
            <div className={css.stats}>
              <ul className={css.statsList}>
                <li className={css.statItem}>
                  <Icon
                    name="book-open-01"
                    width={16}
                    height={16}
                    className={css.bookOpen}
                  />
                  <p className={css.statText}>Lessons online</p>
                </li>

                <li className={css.statItem}>
                  <p className={css.statText}>
                    Lessons done: {teacher.lessons_done}
                  </p>
                </li>
                <li className={css.statItem}>
                  <Icon
                    name="star"
                    width={16}
                    height={16}
                    className={css.star}
                  />
                  <p className={css.statText}>Rating: {teacher.rating}</p>
                </li>
                <li className={css.statItem}>
                  <p className={css.statText}>
                    Price / 1 hour:
                    <span className={css.price}>
                      {" "}
                      {teacher.price_per_hour}$
                    </span>
                  </p>
                </li>
              </ul>
              <button
                type="button"
                className={css.favoriteBtn}
                onClick={handleToggleFavorite}
              >
                <Icon
                  name="heart"
                  width={26}
                  height={26}
                  className={css.heart}
                />
              </button>
            </div>
          </div>

          <div className={css.info}>
            <p className={css.infoItem}>
              Speaks:{" "}
              {teacher.languages.map((lang, index) => (
                <span key={lang} className={css.infoItemLang}>
                  {lang}
                  {index < teacher.languages.length - 1 && ", "}
                </span>
              ))}
            </p>
            <p className={css.infoItem}>
              Lesson Info:{" "}
              <span className={css.infoItemDesc}>{teacher.lesson_info}</span>
            </p>
            <p className={css.infoItem}>
              Conditions:{" "}
              <span className={css.infoItemDesc}>
                {teacher.conditions.join(" ")}
              </span>
            </p>
          </div>

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

        {showMore && (
          <>
            <div className={css.reviews}>
              {teacher.reviews.map((review, index) => (
                <div key={index} className={css.review}>
                  <div className={css.reviewUser}>
                    <div className={css.reviewHeader}>
                      <strong className={css.reviewUserImage}>
                        {review.reviewer_name[0].toUpperCase()}
                      </strong>
                      <div className={css.reviewerInfo}>
                        <span className={css.reviewerName}>
                          {review.reviewer_name}
                        </span>
                        <span className={css.reviewRating}>
                          <Icon name="star" width={16} height={16} />
                          {review.reviewer_rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className={css.reviewComment}>{review.comment}</p>
                </div>
              ))}
            </div>
          </>
        )}

        <ul className={css.levelsList}>
          {teacher.levels.map((level, index) => (
            <li key={index} className={css.levelBadge}>
              #{level}
            </li>
          ))}
        </ul>
        {showMore && (
          <button type="button" className={css.contactBtn}>
            Book trial lesson
          </button>
        )}
      </div>
      {isOpenModal && <ModalRequared onClose={() => setIsOpenModal(false)} />}
    </div>
  );
}
