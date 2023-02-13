import dynamic from "next/dynamic";
import Head from "next/head";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

type Theme = "dark" | "light";

const data = {
  facebook: {
    username: "@nathanf",
    followers: 1987,
    views: 87,
    likes: 52,
    statistics: {
      followers: 12,
      views: 3,
      likes: -2,
    },
  },
  twitter: {
    username: "@nathanf",
    followers: 1044,
    views: 117,
    likes: 507,
    statistics: {
      followers: 99,
      views: 303,
      likes: 553,
    },
  },
  instagram: {
    username: "@realnathanf",
    followers: 11734,
    views: 52000,
    likes: 5462,
    statistics: {
      followers: 1099,
      views: 1375,
      likes: 2257,
    },
  },
  youtube: {
    username: "Nathan F.",
    followers: 8239,
    likes: 107,
    views: 1407,
    statistics: {
      followers: -144,
      likes: -19,
      views: -12,
    },
  },
};

const ThemeContext = createContext(null);
const ThemeProvider = ThemeContext.Provider;

function useThemeContext() {
  const themeMode = useContext(ThemeContext);
  return themeMode;
}

const SocialDashboard = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const toggle = () => {
    localStorage.theme = theme === "dark" ? "light" : "dark";
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeProvider value={{ theme, update: toggle }}>
      <div className="App font-inter bg-social-neutral-light-100">
        <Head>
          <title>Frontend Mentor | Social media dashboard with theme switcher</title>
        </Head>
        <Header />
        <Main />
        <Footer />
        <Slider
          basePath="/social-media-dashboard-with-theme-switcher/design/"
          absolutePath={`/social-media-dashboard-with-theme-switcher/design/mobile-design-dark.jpg`}
        />
      </div>
    </ThemeProvider>
  );
};

export default SocialDashboard;

function Header() {
  const { update } = useThemeContext();
  const [totalFollowers, setTotalFollowers] = useState("");

  useEffect(() => {
    setTotalFollowers(
      Array.from(Object.values(data))
        .reduce((acc, curr) => acc + curr.followers, 0)
        .toLocaleString()
    );
  }, []);

  return (
    <div className="bg-social-neutral-light-200 dark:bg-social-neutral-dark-400 rounded-b-[20px] px-6 pt-[33px] pb-[84px]">
      <h1 className="text-social-neutral-light-500 dark:text-social-neutral-dark-100 text-[24px] font-bold leading-[34px]">Social Media Dashboard</h1>
      <p className="text-social-neutral-light-400 dark:text-social-neutral-dark-200 text-[14px] font-bold tracking-[0.25px]">Total Followers: {totalFollowers}</p>
      <hr className="border-t-social-neutral-light-400 dark:border-t-social-neutral-dark-200/30 mt-[22px]" />
      <div className="mt-[16px] flex justify-between">
        <p className="text-social-neutral-light-400 dark:text-social-neutral-dark-200 text-[14px] font-bold ">Dark Mode</p>
        <button
          className="bg-social-toggle-light dark:from-social-toggle-dark-blue dark:to-social-toggle-dark-green flex h-[24px] w-[48px] items-center justify-end rounded-full bg-gradient-to-r pl-[3px] pr-[4px] focus-visible:outline-none dark:justify-start"
          onClick={() => {
            update();
          }}
        >
          <span className="bg-social-neutral-light-300 dark:bg-social-neutral-dark-300 aspect-square h-[18px] rounded-full" />
        </button>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div>
      {`

      @nathanf
      1987
      Followers
      12 Today

      @nathanf
      1044
      Followers
      99 Today

      @realnathanf
      11k
      Followers
      1099 Today

      Nathan F.
      8239
      Subscribers
      144 Today

      Overview - Today

      Page Views
      87
      3%

      Likes
      52
      2%

      Likes
      5462
      2257%

      Profile Views
      52k
      1375%

      Retweets
      117
      303%

      Likes
      507
      553%

      Likes
      107
      19%

      Total Views
      1407
      12%
    `}
    </div>
  );
}

function Footer() {
  return (
    <div className="text-center text-[11px] [&_a]:text-[hsl(228,45%,44%)]">
      Challenge by{" "}
      <a
        rel="noreferrer"
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
      >
        Frontend Mentor
      </a>
      . Coded by <a href="#">Your Name Here</a>.
    </div>
  );
}
