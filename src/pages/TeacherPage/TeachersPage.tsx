import { useEffect, useState } from "react";
import css from "./TeachersPage.module.css";
import Container from "../../components/Container/Container";
import SelectorField from "../../components/SelectorField/SelectorField";
import SelectInput from "../../components/SelectInput/SelectInput";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
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
        <SelectorField>
          <SelectInput
            label="Languages"
            options={languageOptions}
            onChange={(option) => setSelectedLanguage(option?.value || null)}
          />
          <SelectInput
            label="Level of knowledge"
            options={levelOptions}
            onChange={(option) => setSelectedLevel(option?.value || null)}
          />
          <SelectInput
            label="Price"
            options={priceOptions}
            onChange={(option) => setSelectedPrice(option?.value || null)}
          />
        </SelectorField>

        <section className={css.teachersList}>
          {filteredTeachers.length === 0 ? (
            <p className={css.noResults}>
              No teachers found with selected filters.
            </p>
          ) : (
            filteredTeachers.map((teacher, index) => (
              <TeacherCard key={teacher.id || index} teacher={teacher} />
            ))
          )}
        </section>
      </Container>
    </section>
  );
}
