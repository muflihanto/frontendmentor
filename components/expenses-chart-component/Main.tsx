import Header from "./Header";
import Spending from "./Spending";

export default function Main() {
  return (
    <div className="mx-auto flex max-w-[572px] flex-1 flex-col px-4">
      <Header />
      <Spending />
    </div>
  );
}
