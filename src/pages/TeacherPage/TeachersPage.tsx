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
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        setIsLoading(true);
        // Завантажити вчителів
        const data = await fetchTeachers();
        setTeachers(data);
        setFilteredTeachers(data);

        // Створити опції для селектів
        const languages = getUniqueLanguages(data);
        setLanguageOptions(
          languages.map((lang) => ({ value: lang, label: lang }))
        );

        const levels = getUniqueLevels(data);
        setLevelOptions(
          levels.map((level) => ({ value: level, label: level }))
        );

        const prices = getPriceRange(data);
        setPriceOptions(
          prices.map((price) => ({
            value: price.toString(),
            label: `${price}$`,
          }))
        );

        setIsError(false);
      } catch (err) {
        setIsError(true);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTeachers();
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
      </Container>
    </section>
  );
}
