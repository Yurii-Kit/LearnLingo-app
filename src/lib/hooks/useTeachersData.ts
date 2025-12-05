import { useEffect, useRef } from "react";
import {
  fetchTeachers,
  getUniqueLanguages,
  getUniqueLevels,
  getPriceRange,
} from "../services/teachersApi";
import { useTeachersStore } from "../store/teachersStore";
import { useOptionsStore } from "../store/optionsStore";
import { useAuthStore } from "../store/authStore";

/**
 * Спільний хук для завантаження даних вчителів та опцій фільтрів.
 * Завантажує дані один раз після завершення аутентифікації.
 */
export const useTeachersData = () => {
  // AuthStore
  const isAuthLoading = useAuthStore((state) => state.isLoading);

  // TeachersStore
  const teachers = useTeachersStore((state) => state.teachers);
  const isLoading = useTeachersStore((state) => state.isLoading);
  const isError = useTeachersStore((state) => state.isError);

  // OptionsStore
  const languageOptions = useOptionsStore((state) => state.languageOptions);
  const levelOptions = useOptionsStore((state) => state.levelOptions);
  const priceOptions = useOptionsStore((state) => state.priceOptions);

  // Використовуємо ref для відслідковування чи дані вже завантажені
  const hasLoadedRef = useRef(false);

  // Завантаження вчителів та опцій фільтрів
  useEffect(() => {
    // Чекати поки завершиться завантаження аутентифікації
    if (isAuthLoading) return;

    // Якщо дані вже завантажені в store, не завантажувати знову
    if (teachers.length > 0 || hasLoadedRef.current) return;

    const loadTeachersData = async () => {
      hasLoadedRef.current = true;

      try {
        useTeachersStore.getState().setIsLoading(true);

        // Завантажити всіх вчителів
        const allTeachers = await fetchTeachers();

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
        console.error("Failed to load teachers:", error);
        useTeachersStore.getState().setIsError(true);
      } finally {
        useTeachersStore.getState().setIsLoading(false);
      }
    };

    loadTeachersData();
  }, [isAuthLoading, teachers.length]);

  return {
    // Дані вчителів
    teachers,
    isLoading,
    isError,

    // Опції фільтрів
    languageOptions,
    levelOptions,
    priceOptions,

    // Стан аутентифікації
    isAuthLoading,
  };
};
