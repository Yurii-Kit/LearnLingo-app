import { useState } from "react";
import type { TeacherCardProps } from "../../types";
import css from "./TeacherCard.module.css";
import Icon from "../Icon/Icon";

export default function TeacherCard({ teacher }: TeacherCardProps) {
  const [showMore, setShowMore] = useState(false);

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
                  <span>Lessons done: {teacher.lessons_done}</span>
                </li>
                <li className={css.statItem}>
                  <span>Rating: {teacher.rating}</span>
                </li>
                <li className={css.statItem}>
                  <span>
                    Price / 1 hour:
                    <span className={css.price}>{teacher.price_per_hour}$</span>
                  </span>
                </li>
              </ul>
              <button type="button" className={css.favoriteBtn}>
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
              <span className={css.infoLabel}>Speaks:</span>
              {teacher.languages.map((lang, index) => (
                <span key={lang}>
                  {lang}
                  {index < teacher.languages.length - 1 && ", "}
                </span>
              ))}
            </p>
            <p className={css.infoItem}>
              <span className={css.infoLabel}>Lesson Info:</span>
              {teacher.lesson_info}
            </p>
            <p className={css.infoItem}>
              <span className={css.infoLabel}>Conditions:</span>
              {teacher.conditions.join(" ")}
            </p>
          </div>

          {!showMore && (
            <button
              onClick={() => setShowMore(true)}
              className={css.readMoreBtn}
            >
              Read more
            </button>
          )}
        </div>

        <div className={css.levels}>
          {teacher.levels.map((level) => (
            <span key={level} className={css.levelBadge}>
              #{level}
            </span>
          ))}
        </div>

        {showMore && (
          <>
            <p className={css.experience}>{teacher.experience}</p>

            <div className={css.reviews}>
              {teacher.reviews.map((review, index) => (
                <div key={index} className={css.review}>
                  <div className={css.reviewHeader}>
                    <span className={css.reviewerName}>
                      {review.reviewer_name}
                    </span>
                    <span className={css.reviewRating}>
                      ★ {review.reviewer_rating}
                    </span>
                  </div>
                  <p className={css.reviewComment}>{review.comment}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
