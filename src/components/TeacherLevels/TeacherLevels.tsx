import css from "./TeacherLevels.module.css";

interface TeacherLevelsProps {
  levels: string[];
}

export default function TeacherLevels({ levels }: TeacherLevelsProps) {
  return (
    <ul className={css.levelsList}>
      {levels.map((level, index) => (
        <li key={index} className={css.levelBadge}>
          #{level}
        </li>
      ))}
    </ul>
  );
}
