import { useEffect, useState } from "react";
import css from "./TeachersPage.module.css";
import Container from "../../components/Container/Container";
import SelectorField from "../../components/SelectorField/SelectorField";
import TeacherList from "../../components/TeacherList/TeacherList";
import LoaderOverlay from "../../components/LoaderOverlay/LoaderOverlay";
import type { Teacher } from "../../types";
import {
  fetchTeachers,
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
  const [visibleCount, setVisibleCount] = useState(4);

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

        // Зберегти вчителів у store
        setTeachers(allTeachers);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

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
  }, [selectedLanguage, selectedLevel, selectedPrice, teachers]);

  const visibleTeachers = filteredTeachers.slice(0, visibleCount);

  // Функція для завантаження наступної порції вчителів
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
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
        <TeacherList visibleTeachers={visibleTeachers} />
        {visibleCount < filteredTeachers.length && (
          <button className={css.loadMoreBtn} onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </Container>
    </section>
  );
}
