import { useContext } from "react";
import { FontContext } from "../../pages/expenses-chart-component";
import Header from "./Header";
import Spending from "./Spending";

export default function Main(props) {
  const font = useContext(FontContext);
  return (
    <div className="flex flex-col px-4 max-w-[572px] mx-auto flex-1">
      <Header />
      <Spending />
    </div>
  );
}
