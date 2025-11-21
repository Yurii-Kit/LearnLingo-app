import Header from "../Header/Header";
import css from "./Layout.module.css";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className={css.container}>
      <Header />
      {children}
    </div>
  );
}
