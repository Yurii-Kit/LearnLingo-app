import css from "./TeachersPage.module.css";
import Container from "../../components/Container/Container";
import SelectorField from "../../components/SelectorField/SelectorField";
import SelectInput from "../../components/SelectInput/SelectInput";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function TeachersPage() {
  return (
    <section className={css.teachersPage}>
      <Container className={css.filtersContainer}>
        <SelectorField>
          <SelectInput label="Languages" options={options} />
          <SelectInput label="Level of knowledge" options={options} />
          <SelectInput label="Price" options={options} />
        </SelectorField>
        <section>fdjghdhgjdfhgkjfgh</section>
      </Container>
    </section>
  );
}
