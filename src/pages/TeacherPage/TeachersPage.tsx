import Select from "react-select";

import css from "./TeachersPage.module.css";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function TeachersPage() {
  return (
    <section className={css.teachersPage}>
      <div className={css.filters}>
        <Select defaultValue={options[0]} options={options} />
      </div>
    </section>
  );
}
