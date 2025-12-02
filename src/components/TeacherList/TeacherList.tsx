import TeacherCard from "../TeacherCard/TeacherCard";
import type { TeacherListProps } from "../../types";
import css from "./TeacherList.module.css";

export default function TeacherList({ filteredTeachers }: TeacherListProps) {
  return (
    <section className={css.teachersList}>
      {filteredTeachers.length === 0 ? (
        <p className={css.noResults}>
          No teachers found with selected filters.
        </p>
      ) : (
        filteredTeachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))
      )}
    </section>
  );
}
