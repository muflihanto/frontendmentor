import { useContext } from "react";
import { FontContext } from "../../pages/expenses-chart-component";
import Header from "./Header";
import Spending from "./Spending";
import { cn } from "../../utils/cn";

export default function Main() {
  const font = useContext(FontContext);
  return (
    <div className={cn(["mx-auto flex max-w-[572px] flex-1 flex-col px-4", font])}>
      <Header />
      <Spending />
    </div>
  );
}
