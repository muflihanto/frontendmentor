export default function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-news-homepage-neutral-400 [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
        className="font-extrabold text-[hsl(228,45%,44%)] hover:underline"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a
        href="https://github.com/muflihanto"
        target="_blank"
        rel="noreferrer"
        className="font-extrabold text-[hsl(228,45%,44%)] hover:underline"
      >
        Muflihanto
      </a>
      .
    </footer>
  );
}
