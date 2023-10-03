import { atom, useAtom, Provider, useAtomValue } from "jotai";
import type { ChangeEventHandler } from "react";
import Head from "next/head";

// Create your atoms and derivatives
const textAtom = atom("hello");
const countAtom = atom(0);
const globalCountAtom = atom(0);
const uppercaseAtom = atom((get) => get(textAtom).toUpperCase());

// Use them anywhere in your app
const Input = () => {
  const [text, setText] = useAtom(textAtom);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setText(e.target.value);

  return (
    <input
      value={text}
      onChange={handleChange}
      className="rounded border-2 px-1"
    />
  );
};

const Uppercase = () => {
  const [uppercase] = useAtom(uppercaseAtom);
  return <div>Uppercase: {uppercase}</div>;
};

function ChildComponent() {
  const [count, setCount] = useAtom(countAtom);
  const globalAtom = useAtomValue(globalCountAtom);
  return (
    <div className="flex gap-2">
      <p>{globalAtom}</p>
      <p>{count}</p>
      <button
        onClick={() => setCount((v) => v + 1)}
        className="rounded border px-1"
      >
        +
      </button>
    </div>
  );
}

// Other Component
function OtherComponent() {
  const [count, setCount] = useAtom(globalCountAtom);
  return (
    <div className="flex gap-2">
      <p>{count}</p>
      <button
        onClick={() => setCount((v) => v + 1)}
        className="rounded border px-1"
      >
        +
      </button>
    </div>
  );
}

// Now you have the components
export default function App() {
  return (
    <>
      <Head>
        <title>Jotai</title>
      </Head>
      <Provider>
        <div className="p-3">
          <Input />
          <Uppercase />
        </div>
        <div className="p-3">
          <OtherComponent />
        </div>
        <div className="p-3">
          <ChildComponent />
        </div>
        <div className="p-3">
          <ChildComponent />
        </div>
      </Provider>
    </>
  );
}
