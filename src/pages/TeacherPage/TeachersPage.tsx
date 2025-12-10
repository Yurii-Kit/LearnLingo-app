import { useEffect, useMemo, useState } from "react";
import css from "./TeachersPage.module.css";
import Container from "../../components/Container/Container";
import SelectorField from "../../components/SelectorField/SelectorField";
import TeacherList from "../../components/TeacherList/TeacherList";
import { useTeachersData } from "../../lib/hooks/useTeachersData";

export default function TeachersPage() {
  // Використовуємо спільний хук для завантаження даних
  const {
    teachers,
    isLoading,
    isError,
    languageOptions,
    levelOptions,
    priceOptions,
  } = useTeachersData();

  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  // Фільтрація вчителів через useMemo для оптимізації
  const filteredTeachers = useMemo(() => {
    let filtered = [...teachers];

    if (selectedLanguage) {
      filtered = filtered.filter((teacher) =>
        teacher.languages.includes(selectedLanguage)
      );
    }

    if (selectedLevel) {
      filtered = filtered.filter((teacher) =>
        teacher.levels.includes(selectedLevel)
      );
    }

    if (selectedPrice) {
      filtered = filtered.filter(
        (teacher) => teacher.price_per_hour === Number(selectedPrice)
      );
    }

    return filtered;
  }, [selectedLanguage, selectedLevel, selectedPrice, teachers]);

  // Скидання visibleCount після зміни фільтрів
  useEffect(() => {
    setVisibleCount(4);
  }, [selectedLanguage, selectedLevel, selectedPrice]);

  // Вчителі, які будуть видимі на сторінці
  const visibleTeachers = useMemo(
    () => filteredTeachers.slice(0, visibleCount),
    [filteredTeachers, visibleCount]
  );

  // Функція для завантаження наступної порції вчителів
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  // if (isLoading) {
  //   return <strong>Loading...</strong>;
  // }
  // if (isError) {
  //   return (
  //     <section className={css.teachersPage}>
  //       <Container>
  //         <p className={css.error}>
  //           {isError && "Failed to load teachers. Please try again later."}
  //         </p>
  //       </Container>
  //     </section>
  //   );
  // }

  return (
    <section className={css.teachersPage}>
      <Container className={css.filtersContainer}>
        {isLoading && <strong>Loading...</strong>}
        {isError && (
          <p className={css.error}>
            {isError && "Failed to load teachers. Please try again later."}
          </p>
        )}
        {!isLoading && !isError && visibleTeachers.length > 0 && (
          <>
            <SelectorField
              languageOptions={languageOptions}
              levelOptions={levelOptions}
              priceOptions={priceOptions}
              setSelectedLanguage={setSelectedLanguage}
              setSelectedLevel={setSelectedLevel}
              setSelectedPrice={setSelectedPrice}
            />
            <TeacherList
              visibleTeachers={visibleTeachers}
              isLoading={isLoading}
            />
            {visibleCount < filteredTeachers.length && (
              <button className={css.loadMoreBtn} onClick={handleLoadMore}>
                Load more
              </button>
            )}
          </>
        )}
      </Container>
    </section>
  );
}
