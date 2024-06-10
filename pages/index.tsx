import { ThemeProvider, useTheme } from "next-themes";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ChangeEvent } from "react";
import { useIsClient } from "usehooks-ts";

// import getPages from "../utils/getPages";
// import type { InferGetServerSidePropsType } from "next";

// eslint-disable-next-line @typescript-eslint/require-await
// export async function getServerSideProps() {
//   return {
//     props: { ...getPages() },
//   };
// }

export const pages = [
  {
    title: "3 Column Preview Card Component",
    path: "3-column-preview-card-component",
  },
  { title: "Advice Generator App", path: "advice-generator-app" },
  { title: "Age Calculator App", path: "age-calculator-app" },
  {
    title: "Article Preview Component",
    path: "article-preview-component",
  },
  {
    title: "Base Apparel Coming Soon",
    path: "base-apparel-coming-soon",
  },
  { title: "Blog preview card", path: "blog-preview-card" },
  { title: "Blogr Landing Page", path: "blogr-landing-page" },
  { title: "Bookmark Landing Page", path: "bookmark-landing-page" },
  { title: "Calculator App", path: "calculator-app" },
  {
    title: "Chat App Css Illustration",
    path: "chat-app-css-illustration",
  },
  { title: "Clipboard Landing Page", path: "clipboard-landing-page" },
  {
    title: "Coding Bootcamp Testimonials Slider",
    path: "coding-bootcamp-testimonials-slider",
  },
  {
    title: "Crowdfunding Product Page",
    path: "crowdfunding-product-page",
  },
  { title: "Easybank Landing Page", path: "easybank-landing-page" },
  { title: "Ecommerce Product Page", path: "ecommerce-product-page" },
  {
    title: "Expenses Chart Component",
    path: "expenses-chart-component",
  },
  { title: "FAQ Accordion", path: "faq-accordion" },
  { title: "Faq Accordion Card", path: "faq-accordion-card" },
  {
    title: "Four Card Feature Section",
    path: "four-card-feature-section",
  },
  {
    title: "Fylo Dark Theme Landing Page",
    path: "fylo-dark-theme-landing-page",
  },
  {
    title: "Fylo Data Storage Component",
    path: "fylo-data-storage-component",
  },
  {
    title: "Fylo Landing Page With Two Column Layout",
    path: "fylo-landing-page-with-two-column-layout",
  },
  {
    title: "Huddle Landing Page With Alternating Feature Blocks",
    path: "huddle-landing-page-with-alternating-feature-blocks",
  },
  {
    title: "Huddle Landing Page With Curved Sections",
    path: "huddle-landing-page-with-curved-sections",
  },
  {
    title: "Huddle Landing Page With Single Introductory Section",
    path: "huddle-landing-page-with-single-introductory-section",
  },
  { title: "Insure Landing Page", path: "insure-landing-page" },
  {
    title: "Interactive Card Details Form",
    path: "interactive-card-details-form",
  },
  {
    title: "Interactive Comments Section",
    path: "interactive-comments-section",
  },
  {
    title: "Interactive Pricing Component",
    path: "interactive-pricing-component",
  },
  {
    title: "Interactive Rating Component",
    path: "interactive-rating-component",
  },
  {
    title: "Intro Component With Signup Form",
    path: "intro-component-with-signup-form",
  },
  {
    title: "Intro Section With Dropdown Navigation",
    path: "intro-section-with-dropdown-navigation",
  },
  { title: "Ip Address Tracker", path: "ip-address-tracker" },
  { title: "Launch Countdown Timer", path: "launch-countdown-timer" },
  {
    title: "Loopstudios Landing Page",
    path: "loopstudios-landing-page",
  },
  { title: "Manage Landing Page", path: "manage-landing-page" },
  { title: "Multi Step Form", path: "multi-step-form" },
  { title: "News Homepage", path: "news-homepage" },
  {
    title: "Newsletter Sign Up With Success Message",
    path: "newsletter-sign-up-with-success-message",
  },
  {
    title: "Nft Preview Card Component",
    path: "nft-preview-card-component",
  },
  { title: "Notifications Page", path: "notifications-page" },
  { title: "Order Summary Component", path: "order-summary-component" },
  { title: "Ping Coming Soon Page", path: "ping-coming-soon-page" },
  {
    title: "Pricing Component With Toggle",
    path: "pricing-component-with-toggle",
  },
  {
    title: "Product Preview Card Component",
    path: "product-preview-card-component",
  },
  { title: "Profile Card Component", path: "profile-card-component" },
  {
    title: "Project Tracking Intro Component",
    path: "project-tracking-intro-component",
  },
  { title: "Qr Code Component", path: "qr-code-component" },
  { title: "Recipe Page", path: "recipe-page" },
  {
    title: "Rest Countries Api With Color Theme Switcher",
    path: "rest-countries-api-with-color-theme-switcher",
  },
  {
    title: "Results Summary Component",
    path: "results-summary-component",
  },
  {
    title: "Rock Paper Scissors Bonus",
    path: "rock-paper-scissors-bonus",
  },
  { title: "Rock Paper Scissors", path: "rock-paper-scissors" },
  { title: "Room Homepage", path: "room-homepage" },
  {
    title: "Single Price Grid Component",
    path: "single-price-grid-component",
  },
  {
    title: "Social Links Profile",
    path: "social-links-profile",
  },
  {
    title: "Social Media Dashboard With Theme Switcher",
    path: "social-media-dashboard-with-theme-switcher",
  },
  { title: "Social Proof Section", path: "social-proof-section" },
  { title: "Space Tourism Website", path: "space-tourism-website" },
  { title: "Static Job Listings", path: "static-job-listings" },
  {
    title: "Stats Preview Card Component",
    path: "stats-preview-card-component",
  },
  {
    title: "Sunnyside Agency Landing Page",
    path: "sunnyside-agency-landing-page",
  },
  {
    title: "Testimonials Grid Section",
    path: "testimonials-grid-section",
  },
  { title: "Time Tracking Dashboard", path: "time-tracking-dashboard" },
  { title: "Tip Calculator App", path: "tip-calculator-app" },
  { title: "Todo App", path: "todo-app" },
  { title: "Url Shortening Api", path: "url-shortening-api" },
];

// export default function Home({
//   pages,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
export function Home() {
  const [input, setInput] = useState("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const filteredPages = useMemo(() => {
    if (!input) return pages;
    return pages.filter((page) => {
      return page.title.toLowerCase().includes(input.toLowerCase());
    });
  }, [input]);
  // }, [input, pages]);
  const { setTheme, resolvedTheme } = useTheme();
  const isClient = useIsClient();

  const iconProps = useMemo(() => {
    const alt = `Moon${
      resolvedTheme !== "dark" || !isClient ? " Outline" : ""
    }`;
    const name = alt.toLowerCase().split(" ").join("-");
    const src = `/rest-countries-api-with-color-theme-switcher/images/${name}.svg`;
    return { src, alt };
  }, [resolvedTheme, isClient]);

  return (
    <div>
      <Head>
        <title>Home | Frontendmentor</title>
        <meta
          name="description"
          content="Frontendmentor Challenge Portofolio"
        />
      </Head>
      <main className="flex min-h-screen flex-1 flex-col items-center justify-start bg-white px-16 py-8 duration-300 dark:bg-sky-950 [&_a]:transition-all">
        <h1 className="text-center text-[36px] font-bold text-slate-950 dark:text-slate-50 lg:text-[3rem]">
          Muf&apos;s Frontendmentor Challenge Solution
        </h1>
        <input
          type="text"
          value={input}
          onChange={onChange}
          className="mt-4 w-full rounded-md border px-3 py-2 focus-visible:outline focus-visible:outline-sky-600 dark:border-sky-800 dark:bg-sky-900 dark:text-sky-100 dark:focus-visible:outline dark:focus-visible:outline-sky-700 lg:max-w-screen-sm"
          placeholder="Type here..."
        />
        <ul className="mx-auto mt-8 grid max-w-screen-md grid-cols-1 items-center gap-4 self-start sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredPages.map((page) => {
            return (
              <li key={page.title}>
                <Link
                  href={page.path}
                  className="mb-2 flex h-[180px] min-w-[180px] items-center justify-center rounded-xl bg-sky-600 p-5 text-center text-[18px] font-semibold text-white shadow-md hover:bg-sky-600/80 hover:underline hover:underline-offset-2 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:bg-sky-900"
                >
                  {page.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <button
          className="fixed bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-md bg-sky-500 shadow transition-transform hover:bg-opacity-75 active:scale-95 dark:bg-sky-700 dark:hover:bg-opacity-75 lg:bottom-6 lg:right-8"
          onClick={() => {
            setTheme(resolvedTheme === "dark" ? "light" : "dark");
          }}
          type="button"
        >
          <Image
            src={iconProps.src}
            alt={iconProps.alt}
            width={20}
            height={20}
          />
        </button>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <ThemeProvider disableTransitionOnChange attribute="class" enableSystem>
      <Home />
    </ThemeProvider>
  );
}
