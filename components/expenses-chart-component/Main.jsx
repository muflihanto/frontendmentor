import { useContext } from "react";
import { FontContext } from "../../pages/expenses-chart-component";
import Header from "./Header";
import Spending from "./Spending";

export default function Main(props) {
  const font = useContext(FontContext);
  return (
    <div className="flex flex-col pt-[calc(67/667*100vh)] min-h-screen px-4 bg-expenses-neutral-200">
      <Header />
      <Spending />
    </div>
  );
}
