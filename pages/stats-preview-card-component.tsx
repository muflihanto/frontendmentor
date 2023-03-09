import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

const StatsPreview = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Stats preview card component</title>
      </Head>
      <div className="App bg-stats-preview-primary-blue-200 font-inter relative flex min-h-[100svh] w-screen items-start justify-center pt-[88px] pb-[88.5px]">
        <Card />
        <Footer />
        {/* <Slider basePath="/stats-preview-card-component/design/" /> */}
      </div>
    </>
  );
};

function Card() {
  return (
    <div className="bg-stats-preview-primary-blue-100 text-stats-preview-neutral-100 shadow-stats-preview-primary-blue-100/20 flex w-full flex-col items-center overflow-hidden rounded-lg shadow-xl max-lg:max-w-[calc(375px-48px)] ">
      <header className="text-stats-preview-neutral-100 relative aspect-[327/240] w-full">
        <div className="bg-stats-preview-primary-violet absolute top-0 left-0 z-10 h-full w-full mix-blend-multiply" />
        <div className="bg-stats-preview-primary-violet/[.25] absolute top-0 left-0 z-20 h-full w-full" />
        <Image
          src="/stats-preview-card-component/images"
          loader={({ src, width }) => `${src}/image-header-${width > 1023 ? "desktop" : "mobile"}.jpg`}
          alt="Business Illustration"
          className="object-contain"
          fill
        />
      </header>
      <MainBody />
    </div>
  );
}

function MainBody() {
  return (
    <main className="px-[30px] pt-[40px] pb-[35px]">
      <h1 className="text-center text-[28px] font-bold leading-[32px]">
        Get <span className="text-stats-preview-primary-violet">insights</span> that help your business grow.
      </h1>
      <p className="text-stats-preview-neutral-300 mt-4 text-center text-[15px] leading-[25px]">Discover the benefits of data analytics and make better decisions regarding revenue, customer experience, and overall efficiency.</p>
      <ul className="[&_span:last-child]:font-lexend-deca [&_span:last-child]:text-stats-preview-neutral-300 mt-9 mr-[1px] flex flex-col items-center gap-[24px] uppercase [&_span:last-child]:text-[13px] [&_span:last-child]:tracking-[.3px] [&_span:first-child]:text-[24px]">
        <li className="lowe flex flex-col items-center justify-center gap-[1px]">
          <span className="font-bold lowercase">10k+</span>
          <span>companies</span>
        </li>
        <li className="flex flex-col   items-center justify-center gap-[1px]">
          <span className="font-bold">314</span>
          <span>templates</span>
        </li>
        <li className="-mt-[1px] flex flex-col items-center justify-center gap-[1px]">
          <span className="font-bold">12m+</span>
          <span>queries</span>
        </li>
      </ul>
    </main>
  );
}

function Footer() {
  return (
    <footer className="text-stats-preview-neutral-100 [&_a]:text-stats-preview-primary-violet absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
}
export default StatsPreview;
