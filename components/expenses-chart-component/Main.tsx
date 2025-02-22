import Header from "./Header";
import Spending from "./Spending";

export default function Main() {
  return (
    <main
      className="mx-auto flex max-w-[572px] flex-1 flex-col px-4"
      aria-labelledby="main-heading"
    >
      <Header />
      <Spending />
    </main>
  );
}
