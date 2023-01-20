const Footer: React.FC = () => {
  return (
    <footer className="text-[11px] text-center [&_a]:text-[hsl(228,45%,44%)] [&_a]:font-bold [&_a]:underline [&_a]:decoration-wavy [&_a]:decoration-pricing-primary-red-200 py-6">
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
        target="_blank"
        rel="noreferrer"
      >
        Muflihanto
      </a>
      .
    </footer>
  );
};

export default Footer;
