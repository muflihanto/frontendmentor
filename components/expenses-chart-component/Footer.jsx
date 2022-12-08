export default function Footer(props) {
  return (
    <footer className="text-[11px] text-center absolute bottom-3 md:bottom-2 w-full">
      Challenge by{" "}
      <a
        className="text-[hsl(228,45%,44%)]"
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a
        className="text-[hsl(228,45%,44%)]"
        href="https://github.com/muflihanto"
        target="_blank"
        rel="noreferrer"
      >
        Muflihanto
      </a>
      .
    </footer>
  );
}
