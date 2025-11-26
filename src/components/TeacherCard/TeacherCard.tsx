import { useState } from "react";
import type { Teacher } from "../../services/teachersApi";

import css from "./TeacherCard.module.css";

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={css.card}>
      <div className={css.avatarWrapper}>
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          className={css.avatar}
        />
      </div>

      <div className={css.content}>
        <div className={css.header}>
          <div>
            <p className={css.subtitle}>Languages</p>
            <h3 className={css.name}>
              {teacher.name} {teacher.surname}
            </h3>
          </div>
          <div className={css.stats}>
            <p className={css.statItem}>
              <span>Lessons online</span>
              <span className={css.statValue}>{teacher.lessons_done}</span>
            </p>
            <p className={css.statItem}>
              <span>Lessons done: {teacher.lessons_done}</span>
            </p>
            <p className={css.statItem}>
              <span>Rating: {teacher.rating}</span>
            </p>
            <p className={css.statItem}>
              <span>
                Price / 1 hour:{" "}
                <span className={css.price}>{teacher.price_per_hour}$</span>
              </span>
            </p>
          </div>
        </div>

        <div className={css.info}>
          <p className={css.infoItem}>
            <span className={css.infoLabel}>Speaks:</span>{" "}
            {teacher.languages.map((lang, index) => (
              <span key={lang}>
                {lang}
                {index < teacher.languages.length - 1 && ", "}
              </span>
            ))}
          </p>
          <p className={css.infoItem}>
            <span className={css.infoLabel}>Lesson Info:</span>{" "}
            {teacher.lesson_info}
          </p>
          <p className={css.infoItem}>
            <span className={css.infoLabel}>Conditions:</span>{" "}
            {teacher.conditions.join(" ")}
          </p>
        </div>

        {!showMore && (
          <button onClick={() => setShowMore(true)} className={css.readMoreBtn}>
            Read more
          </button>
        )}

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

            <div className={css.levels}>
              {teacher.levels.map((level) => (
                <span key={level} className={css.levelBadge}>
                  #{level}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
