import type { Teacher } from "../../types";
import css from "./FavoriteList.module.css";
import TeacherList from "../TeacherList/TeacherList";

interface FavoriteListProps {
  visibleTeachers: Teacher[];
  isLoading: boolean;
  visibleCount: number;
  totalCount: number;
  onLoadMore: () => void;
}

export default function FavoriteList({
  visibleTeachers,
  isLoading,
  visibleCount,
  totalCount,
  onLoadMore,
}: FavoriteListProps) {
  if (visibleTeachers.length === 0) {
    return (
      <p className={css.noResults}>No teachers match your selected filters.</p>
    );
  }

  return (
    <>
      <TeacherList visibleTeachers={visibleTeachers} isLoading={isLoading} />
      {visibleCount < totalCount && (
        <button className={css.loadMoreBtn} onClick={onLoadMore}>
          Load more
        </button>
      )}
    </>
  );
}
