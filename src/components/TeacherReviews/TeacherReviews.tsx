import type { Review } from "../../types";
import css from "./TeacherReviews.module.css";
import Icon from "../Icon/Icon";

interface TeacherReviewsProps {
  reviews: Review[];
}

export default function TeacherReviews({ reviews }: TeacherReviewsProps) {
  return (
    <div className={css.reviews}>
      {reviews.map((review, index) => (
        <div key={index} className={css.review}>
          <div className={css.reviewUser}>
            <div className={css.reviewHeader}>
              <strong className={css.reviewUserImage}>
                {review.reviewer_name[0].toUpperCase()}
              </strong>
              <div className={css.reviewerInfo}>
                <span className={css.reviewerName}>{review.reviewer_name}</span>
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
  );
}
