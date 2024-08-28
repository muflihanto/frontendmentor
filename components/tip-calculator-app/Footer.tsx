export default function Footer() {
  return (
    <div className="absolute bottom-2 left-0 mx-auto w-full text-center text-[10px] text-tip-neutral-500 lg:bottom-4 [&_a]:text-tip-neutral-600 [&_a]:underline [&_a]:decoration-wavy">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a href="https://github.com/muflihanto" rel="noreferrer" target="_blank">
        Muflihanto
      </a>
      .
    </div>
  );
}
