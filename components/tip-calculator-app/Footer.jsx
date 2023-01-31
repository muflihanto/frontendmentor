export default function Footer(props) {
  return (
    <div
      className="w-full mx-auto left-0 text-center text-[10px] absolute bottom-2 lg:bottom-4 [&_a]:text-tip-neutral-600 [&_a]:underline [&_a]:decoration-wavy
    "
    >
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a
        href="https://github.com/muflihanto"
        rel="noreferrer"
        target="_blank"
      >
        Muflihanto
      </a>
      .
    </div>
  );
}
