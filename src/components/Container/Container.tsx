import css from "./Container.module.css";
import type { ContainerProps } from "../../types";

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return <div className={`${css.container} ${className}`}>{children}</div>;
}
