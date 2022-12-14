export default function Footer(props) {
  return (
    <footer className="attribution text-advice-primary-cyan absolute w-full text-center left-0 bottom-3">
      <span className="text-[11px]">Challenge by </span>
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
        className="text-advice-primary-green text-[11px]"
      >
        Frontend Mentor
      </a>
      <span className="text-[11px]">. Coded by </span>
      <a
        href="https://github.com/muflihanto"
        className="text-advice-primary-green text-[11px]"
        rel="noreferrer"
        target="_blank"
      >
        Muflihanto
      </a>
      <span className="text-[11px]">.</span>
    </footer>
  );
}
