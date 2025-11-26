import css from "./SelectorField.module.css";
import type { SelectorFieldProps } from "../../types";

export default function SelectorField({ children }: SelectorFieldProps) {
  return <div className={css.selectorField}>{children}</div>;
}
