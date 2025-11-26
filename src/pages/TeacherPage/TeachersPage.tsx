import Select from "react-select";

import css from "./TeachersPage.module.css";
import Container from "../../components/Container/Container";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function TeachersPage() {
  return (
    <section className={css.teachersPage}>
      <Container className={css.filtersContainer}>
        <div className={css.filters}>
          <div className={css.filterWrapper}>
            <label className={css.filterLabel} htmlFor="language">
              Languages
            </label>
            <Select
              className={css.select}
              inputId="language"
              defaultValue={options[0]}
              options={options}
            />
          </div>
          <div className={css.filterWrapper}>
            <label className={css.filterLabel} htmlFor="language">
              Languages
            </label>
            <Select
              inputId="language"
              defaultValue={options[0]}
              options={options}
            />
          </div>
          <div className={css.filterWrapper}>
            <label className={css.filterLabel} htmlFor="language">
              Languages
            </label>
            <Select
              inputId="language"
              defaultValue={options[0]}
              options={options}
            />
          </div>
        </div>
        <section>fdjghdhgjdfhgkjfgh</section>
      </Container>
    </section>
  );
}
