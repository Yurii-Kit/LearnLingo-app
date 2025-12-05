import css from "./TeacherInfo.module.css";

interface TeacherInfoProps {
  languages: string[];
  lessonInfo: string;
  conditions: string[];
}

export default function TeacherInfo({
  languages,
  lessonInfo,
  conditions,
}: TeacherInfoProps) {
  return (
    <div className={css.info}>
      <p className={css.infoItem}>
        Speaks:{" "}
        {languages.map((lang, index) => (
          <span key={lang} className={css.infoItemLang}>
            {lang}
            {index < languages.length - 1 && ", "}
          </span>
        ))}
      </p>
      <p className={css.infoItem}>
        Lesson Info: <span className={css.infoItemDesc}>{lessonInfo}</span>
      </p>
      <p className={css.infoItem}>
        Conditions:{" "}
        <span className={css.infoItemDesc}>{conditions.join(" ")}</span>
      </p>
    </div>
  );
}
