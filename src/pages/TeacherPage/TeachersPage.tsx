import { useEffect, useState } from "react";
import css from "./TeachersPage.module.css";
import Container from "../../components/Container/Container";
import SelectorField from "../../components/SelectorField/SelectorField";
import TeacherList from "../../components/TeacherList/TeacherList";
import LoaderOverlay from "../../components/LoaderOverlay/LoaderOverlay";
import type { Teacher } from "../../types";
import {
  fetchTeachers,
  fetchTeachersPaginated,
  getUniqueLanguages,
  getUniqueLevels,
  getPriceRange,
} from "../../services/teachersApi";
import { useTeachersStore } from "../../lib/store/teachersStore";
import { useOptionsStore } from "../../lib/store/optionsStore";

export default function TeachersPage() {
  // TeachersStore
  const {
    teachers,
    setTeachers,
    isLoading,
    setIsLoading,
    isError,
    setIsError,
    lastKey,
    setLastKey,
    hasMore,
    setHasMore,
    isLoadingMore,
    setIsLoadingMore,
  } = useTeachersStore();

  // OptionsStore
  const {
    languageOptions,
    setLanguageOptions,
    levelOptions,
    setLevelOptions,
    priceOptions,
    setPriceOptions,
  } = useOptionsStore();

  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  // Початкове завантаження вчителів та опцій фільтрів
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);

        //  1. Завантажити ВСІ вчителі для створення опцій фільтрів
        const allTeachers = await fetchTeachers();

        // Створити опції для селектів
        const languages = getUniqueLanguages(allTeachers);
        setLanguageOptions(
          languages.map((lang) => ({ value: lang, label: lang }))
        );

        const levels = getUniqueLevels(allTeachers);
        setLevelOptions(
          levels.map((level) => ({ value: level, label: level }))
        );

        const prices = getPriceRange(allTeachers);
        setPriceOptions(
          prices.map((price) => ({
            value: price.toString(),
            label: `${price}$`,
          }))
        );

        //  2. Завантажити ПЕРШІ 4 вчителі з пагінацією
        const { teachers: initialTeachers, lastKey: newLastKey } =
          await fetchTeachersPaginated(4);

        setTeachers(initialTeachers);
        setFilteredTeachers(initialTeachers);
        setLastKey(newLastKey);
        setHasMore(newLastKey !== null); // Якщо є lastKey — є ще дані

        setIsError(false);
      } catch (err) {
        setIsError(true);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [
    setTeachers,
    setIsLoading,
    setIsError,
    setLanguageOptions,
    setLevelOptions,
    setPriceOptions,
    setLastKey,
    setHasMore,
  ]);

  // Фільтрація вчителів
  useEffect(() => {
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

    setFilteredTeachers(filtered);
  }, [
    selectedLanguage,
    selectedLevel,
    selectedPrice,
    teachers,
    setFilteredTeachers,
  ]);

  // Функція для завантаження наступної порції вчителів
  const handleLoadMore = async () => {
    // Якщо немає більше даних або вже завантажуємо — нічого не робимо
    if (!hasMore || isLoadingMore) return;

    try {
      setIsLoadingMore(true);

      // Завантажуємо наступні 4 вчителі, починаючи ПІСЛЯ lastKey
      const { teachers: moreTeachers, lastKey: newLastKey } =
        await fetchTeachersPaginated(4, lastKey!);

      // Додаємо нових вчителів до існуючих
      const updatedTeachers = [...teachers, ...moreTeachers];
      setTeachers(updatedTeachers);

      // Оновлюємо lastKey для наступного запиту
      setLastKey(newLastKey);

      // Якщо newLastKey === null — більше даних немає
      setHasMore(newLastKey !== null);
    } catch (err) {
      console.error("Error loading more teachers:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (isLoading) {
    return <LoaderOverlay />;
  }

  if (isError) {
    return (
      <section className={css.teachersPage}>
        <Container>
          <p className={css.error}>
            {isError && "Failed to load teachers. Please try again later."}
          </p>
        </Container>
      </section>
    );
  }

  return (
    <section className={css.teachersPage}>
      <Container className={css.filtersContainer}>
        <SelectorField
          languageOptions={languageOptions}
          levelOptions={levelOptions}
          priceOptions={priceOptions}
          setSelectedLanguage={setSelectedLanguage}
          setSelectedLevel={setSelectedLevel}
          setSelectedPrice={setSelectedPrice}
        />
        <TeacherList filteredTeachers={filteredTeachers} />
        {hasMore && (
          <button
            className={css.loadMoreBtn}
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            type="button"
          >
            {isLoadingMore ? "Loading..." : "Load more"}
          </button>
        )}
      </Container>
    </section>
  );
}
