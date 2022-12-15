export default function Footer(props) {
  return (
    <div className="text-[11px] w-full absolute left-0 bottom-4 text-center">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
        className="font-bold text-tracking-neutral-200 hover:underline"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a
        href="https://github.com/muflihanto"
        target="_blank"
        rel="noreferrer"
        className="font-bold text-tracking-neutral-200 hover:underline"
      >
        Muflihanto
      </a>
      .
    </div>
  );
}
