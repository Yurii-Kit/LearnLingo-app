import css from "./FavoriteEmptyState.module.css";
import Container from "../Container/Container";

interface FavoriteEmptyStateProps {
  message: string;
  isError?: boolean;
}

export default function FavoriteEmptyState({
  message,
  isError = false,
}: FavoriteEmptyStateProps) {
  return (
    <section className={css.favoritePage}>
      <Container>
        <p className={isError ? css.error : css.noResults}>{message}</p>
      </Container>
    </section>
  );
}
