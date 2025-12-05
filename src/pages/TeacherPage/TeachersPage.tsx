import { useEffect, useMemo, useState, useRef } from "react";
import css from "./TeachersPage.module.css";
import Container from "../../components/Container/Container";
import SelectorField from "../../components/SelectorField/SelectorField";
import TeacherList from "../../components/TeacherList/TeacherList";
// import LoaderOverlay from "../../components/LoaderOverlay/LoaderOverlay";
import {
  fetchTeachers,
  getUniqueLanguages,
  getUniqueLevels,
  getPriceRange,
} from "../../lib/services/teachersApi";
import { useTeachersStore } from "../../lib/store/teachersStore";
import { useOptionsStore } from "../../lib/store/optionsStore";
import { useAuthStore } from "../../lib/store/authStore";
import LoaderOverlay from "../../components/LoaderOverlay/LoaderOverlay";

export default function TeachersPage() {
  console.log("👨‍🏫 [TEACHERS PAGE] TeachersPage монтується");

  // AuthStore - використовуємо окремі селектори
  const isAuthLoading = useAuthStore((state) => state.isLoading);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  console.log(
    "👨‍🏫 [TEACHERS PAGE] isAuthLoading:",
    isAuthLoading,
    "isLoggedIn:",
    isLoggedIn
  );

  // TeachersStore - використовуємо окремі селектори
  const teachers = useTeachersStore((state) => state.teachers);
  const isLoading = useTeachersStore((state) => state.isLoading);
  const isError = useTeachersStore((state) => state.isError);

  // OptionsStore - використовуємо окремі селектори
  const languageOptions = useOptionsStore((state) => state.languageOptions);
  const levelOptions = useOptionsStore((state) => state.levelOptions);
  const priceOptions = useOptionsStore((state) => state.priceOptions);

  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  // Використовуємо ref для відслідковування чи дані вже завантажені
  const hasLoadedRef = useRef(false);

  // Початкове завантаження вчителів та опцій фільтрів
  useEffect(() => {
    console.log("📚 [TEACHERS PAGE] useEffect - початкове завантаження");
    console.log(
      "📚 [TEACHERS PAGE] isAuthLoading:",
      isAuthLoading,
      "hasLoadedRef.current:",
      hasLoadedRef.current
    );

    // Чекати поки завершиться завантаження аутентифікації
    if (isAuthLoading) return;

    // Якщо дані вже завантажені, не завантажувати знову
    if (hasLoadedRef.current) return;

    const loadInitialData = async () => {
      hasLoadedRef.current = true; // Встановлюємо прапорець перед завантаженням

      try {
        console.log("📚 [TEACHERS PAGE] Починаємо завантаження вчителів...");
        useTeachersStore.getState().setIsLoading(true);

        //  1. Завантажити ВСІ вчителі для створення опцій фільтрів
        const allTeachers = await fetchTeachers();
        console.log(
          "📚 [TEACHERS PAGE] Завантажено вчителів:",
          allTeachers.length
        );

        // Створити опції для селектів
        const languages = getUniqueLanguages(allTeachers);
        useOptionsStore
          .getState()
          .setLanguageOptions(
            languages.map((lang) => ({ value: lang, label: lang }))
          );

        const levels = getUniqueLevels(allTeachers);
        useOptionsStore
          .getState()
          .setLevelOptions(
            levels.map((level) => ({ value: level, label: level }))
          );

        const prices = getPriceRange(allTeachers);
        useOptionsStore.getState().setPriceOptions(
          prices.map((price) => ({
            value: price.toString(),
            label: `${price}$`,
          }))
        );

        // Зберегти вчителів у store
        useTeachersStore.getState().setTeachers(allTeachers);
      } catch (error) {
        useTeachersStore.getState().setIsError(true);
      } finally {
        useTeachersStore.getState().setIsLoading(false);
      }
    };

    loadInitialData();
  }, [isAuthLoading]);

  // Фільтрація вчителів через useMemo замість useEffect
  const filteredTeachers = useMemo(() => {
    console.log("🔍 [TEACHERS PAGE] useMemo - фільтрація");
    console.log(
      "🔍 [TEACHERS PAGE] selectedLanguage:",
      selectedLanguage,
      "selectedLevel:",
      selectedLevel,
      "selectedPrice:",
      selectedPrice
    );

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

    console.log("🔍 [TEACHERS PAGE] Відфільтровано вчителів:", filtered.length);
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
        <TeacherList visibleTeachers={visibleTeachers} isLoading={isLoading} />
        {visibleCount < filteredTeachers.length && (
          <button className={css.loadMoreBtn} onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </Container>
    </section>
  );
}
