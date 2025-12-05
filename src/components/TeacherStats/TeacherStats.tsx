import css from "./TeacherStats.module.css";
import Icon from "../Icon/Icon";
import { clsx } from "clsx";

interface TeacherStatsProps {
  lessonsDone: number;
  rating: number;
  pricePerHour: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function TeacherStats({
  lessonsDone,
  rating,
  pricePerHour,
  isFavorite,
  onToggleFavorite,
}: TeacherStatsProps) {
  return (
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
          <p className={css.statText}>Lessons done: {lessonsDone}</p>
        </li>
        <li className={css.statItem}>
          <Icon name="star" width={16} height={16} className={css.star} />
          <p className={css.statText}>Rating: {rating}</p>
        </li>
        <li className={css.statItem}>
          <p className={css.statText}>
            Price / 1 hour:
            <span className={css.price}> {pricePerHour}$</span>
          </p>
        </li>
      </ul>
      <button
        type="button"
        className={css.favoriteBtn}
        onClick={onToggleFavorite}
      >
        <Icon
          name="heart"
          width={26}
          height={26}
          className={clsx(css.heart, { [css.heartActive]: isFavorite })}
        />
      </button>
    </div>
  );
}
