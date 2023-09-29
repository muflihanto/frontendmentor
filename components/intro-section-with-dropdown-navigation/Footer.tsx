import { epilogueVar } from "../../utils/fontLoader";

export default function Footer() {
  return (
    <footer className={`${epilogueVar} font-epilogue font-semibold text-[11px] text-center absolute bottom-3 w-full left-0`}>
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
        className="text-[hsl(228,45%,44%)] font-bold hover:underline"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a
        href="https://github.com/muflihanto"
        className="text-[hsl(228,45%,44%)] font-bold hover:underline"
      >
        Muflihanto
      </a>
      .
    </footer>
  );
}
