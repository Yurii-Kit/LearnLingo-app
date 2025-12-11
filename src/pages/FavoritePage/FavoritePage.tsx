import { useEffect, useMemo, useState } from "react";
import css from "./FavoritePage.module.css";
import Container from "../../components/Container/Container";
import SelectorField from "../../components/SelectorField/SelectorField";
// import LoaderOverlay from "../../components/LoaderOverlay/LoaderOverlay";
import FavoriteEmptyState from "../../components/FavoriteEmptyState/FavoriteEmptyState";
import FavoriteList from "../../components/FavoriteList/FavoriteList";
import { useTeachersData } from "../../lib/hooks/useTeachersData";
import { useAuthStore } from "../../lib/store/authStore";

export default function FavoritePage() {
  const {
    teachers,
    isLoading,
    isError,
    languageOptions,
    levelOptions,
    priceOptions,
  } = useTeachersData();

  const favorites = useAuthStore((state) => state.favorites);

  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const favoriteTeachers = useMemo(() => {
    if (!favorites.length) return [];
    return teachers.filter((teacher) => favorites.includes(teacher.id));
  }, [teachers, favorites]);

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

  useEffect(() => {
    setVisibleCount(4);
  }, [selectedLanguage, selectedLevel, selectedPrice]);

  const visibleTeachers = useMemo(
    () => filteredTeachers.slice(0, visibleCount),
    [filteredTeachers, visibleCount]
  );

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <section className={css.favoritePage}>
      <Container className={css.filtersContainer}>
        {isLoading && <strong>Loading...</strong>}
        {isError && (
          <p className={css.error}>
            {isError && "Failed to load favorites. Please try again later."}
          </p>
        )}
        {!isLoading && !isError && !favorites.length && (
          <FavoriteEmptyState message="You haven't added any teachers to favorites yet." />
        )}

        {!isLoading && !isError && favoriteTeachers.length > 0 && (
          <>
            <SelectorField
              languageOptions={languageOptions}
              levelOptions={levelOptions}
              priceOptions={priceOptions}
              setSelectedLanguage={setSelectedLanguage}
              setSelectedLevel={setSelectedLevel}
              setSelectedPrice={setSelectedPrice}
            />
            <FavoriteList
              visibleTeachers={visibleTeachers}
              isLoading={isLoading ?? false}
              visibleCount={visibleCount}
              totalCount={filteredTeachers.length}
              onLoadMore={handleLoadMore}
            />
          </>
        )}
      </Container>
    </section>
  );
}
