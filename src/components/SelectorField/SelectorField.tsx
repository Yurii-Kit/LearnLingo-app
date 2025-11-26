import css from "./SelectorField.module.css";

interface SelectorFieldProps {
  children: React.ReactNode;
}

export default function SelectorField({ children }: SelectorFieldProps) {
  return <div className={css.selectorField}>{children}</div>;
}
