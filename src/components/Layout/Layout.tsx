import Header from "../Header/Header";
import type { ChildrenProps } from "../../types";

export default function Layout({ children }: ChildrenProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
