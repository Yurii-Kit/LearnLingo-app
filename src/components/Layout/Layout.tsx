import Header from "../Header/Header";
import type { ChildrenProps } from "../../types";

export default function Layout({ children }: ChildrenProps) {
  console.log("🎨 [LAYOUT] Layout рендериться");

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
