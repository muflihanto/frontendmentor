const Header: React.FC = () => {
  return (
    <header className="text-center bg-[url('/interactive-pricing-component/images/pattern-circles.svg')] bg-[center_top_calc(50%+2px)] lg:bg-center bg-no-repeat py-[40px]">
      <h1
        className="font-extrabold text-[20px] text-pricing-neutral-500 lg:text-[28px]"
        id="main-heading"
      >
        Simple, traffic-based pricing
      </h1>
      <div className="[&_p]:text-[13px] lg:[&_p]:text-[15.4px] [&_p]:font-medium [&_p]:text-pricing-neutral-400 [&_p]:lg:inline-block">
        <p className="mt-2 lg:mt-[9px]">Sign-up for our 30-day trial.</p>
        <p className="mt-1 lg:ml-[3px]">No credit card required.</p>
      </div>
    </header>
  );
};

export default Header;
