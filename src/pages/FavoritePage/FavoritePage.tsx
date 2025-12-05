import { useEffect, useMemo, useState } from "react";
import css from "./FavoritePage.module.css";
import Container from "../../components/Container/Container";
import SelectorField from "../../components/SelectorField/SelectorField";
import TeacherList from "../../components/TeacherList/TeacherList";
import {
  fetchTeachers,
  getUniqueLanguages,
  getUniqueLevels,
  getPriceRange,
} from "../../lib/services/teachersApi";
import { useAuthStore } from "../../lib/store/authStore";
import { useOptionsStore } from "../../lib/store/optionsStore";
import type { Teacher } from "../../types";
import LoaderOverlay from "../../components/LoaderOverlay/LoaderOverlay";

export default function FavoritePage() {
  console.log("⭐ [FAVORITE PAGE] FavoritePage монтується");

  // AuthStore

  const favorites = useAuthStore((state) => state.favorites);
  const isAuthLoading = useAuthStore((state) => state.isLoading);

  // OptionsStore
  const languageOptions = useOptionsStore((state) => state.languageOptions);
  const levelOptions = useOptionsStore((state) => state.levelOptions);
  const priceOptions = useOptionsStore((state) => state.priceOptions);

  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  // Завантаження всіх вчителів та створення опцій фільтрів
  useEffect(() => {
    if (isAuthLoading) return;

    const loadTeachers = async () => {
      try {
        setIsLoading(true);
        const teachers = await fetchTeachers();
        setAllTeachers(teachers);

        // Створити опції для селектів
        const languages = getUniqueLanguages(teachers);
        useOptionsStore
          .getState()
          .setLanguageOptions(
            languages.map((lang) => ({ value: lang, label: lang }))
          );

        const levels = getUniqueLevels(teachers);
        useOptionsStore
          .getState()
          .setLevelOptions(
            levels.map((level) => ({ value: level, label: level }))
          );

        const prices = getPriceRange(teachers);
        useOptionsStore.getState().setPriceOptions(
          prices.map((price) => ({
            value: price.toString(),
            label: `${price}$`,
          }))
        );
      } catch (error) {
        console.error("Failed to load teachers:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadTeachers();
  }, [isAuthLoading]);

  // Фільтрувати тільки улюблених вчителів
  const favoriteTeachers = useMemo(() => {
    if (!favorites.length) return [];
    return allTeachers.filter((teacher) => favorites.includes(teacher.id));
  }, [allTeachers, favorites]);

  // Застосувати фільтри до улюблених вчителів
  const filteredTeachers = useMemo(() => {
    let filtered = [...favoriteTeachers];

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
  }, [favoriteTeachers, selectedLanguage, selectedLevel, selectedPrice]);

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

  if (isLoading) {
    return <LoaderOverlay />;
  }

  if (isError) {
    return (
      <section className={css.favoritePage}>
        <Container>
          <p className={css.error}>
            Failed to load favorites. Please try again later.
          </p>
        </Container>
      </section>
    );
  }

  // if (!user) {
  //   return (
  //     <section className={css.favoritePage}>
  //       <Container>
  //         <p className={css.noResults}>
  //           Please log in to view your favorite teachers.
  //         </p>
  //       </Container>
  //     </section>
  //   );
  // }

  if (!favoriteTeachers.length) {
    return (
      <section className={css.favoritePage}>
        <Container>
          <p className={css.noResults}>
            You haven't added any teachers to favorites yet.
          </p>
        </Container>
      </section>
    );
  }

  return (
    <section className={css.favoritePage}>
      <Container className={css.filtersContainer}>
        <SelectorField
          languageOptions={languageOptions}
          levelOptions={levelOptions}
          priceOptions={priceOptions}
          setSelectedLanguage={setSelectedLanguage}
          setSelectedLevel={setSelectedLevel}
          setSelectedPrice={setSelectedPrice}
        />
        {filteredTeachers.length === 0 ? (
          <p className={css.noResults}>
            No teachers match your selected filters.
          </p>
        ) : (
          <>
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
