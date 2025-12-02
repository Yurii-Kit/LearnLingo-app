import SelectInput from "../SelectInput/SelectInput";
import type { SelectorFieldProps } from "../../types";

import css from "./SelectorField.module.css";

export default function SelectorField({
  languageOptions,
  levelOptions,
  priceOptions,
  setSelectedLanguage,
  setSelectedLevel,
  setSelectedPrice,
}: SelectorFieldProps) {
  return (
    <div className={css.selectorField}>
      <SelectInput
        width="221px"
        label="Languages"
        options={languageOptions}
        onChange={(option) => setSelectedLanguage(option?.value || null)}
      />
      <SelectInput
        width="198px"
        label="Level of knowledge"
        options={levelOptions}
        onChange={(option) => setSelectedLevel(option?.value || null)}
      />
      <SelectInput
        width="124px"
        label="Price"
        options={priceOptions}
        onChange={(option) => setSelectedPrice(option?.value || null)}
      />
    </div>
  );
}
