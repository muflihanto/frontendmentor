import dynamic from "next/dynamic";
import Head from "next/head";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
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
      <div className="App font-inter bg-social-neutral-light-100 dark:bg-social-neutral-dark-500">
        <Head>
          <title>Frontend Mentor | Social media dashboard with theme switcher</title>
        </Head>
        <Header />
        <Main />
        <Footer />
        <Slider
          basePath="/social-media-dashboard-with-theme-switcher/design/"
          absolutePath={`/social-media-dashboard-with-theme-switcher/design/mobile-design-light.jpg`}
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

function Card({ socialMedia = "facebook" }) {
  const styles = {
    accentColor: {
      facebook: "bg-social-primary-facebook",
      twitter: "bg-social-primary-twitter",
      instagram: "bg-gradient-to-r from-social-primary-instagram-yellow to-social-primary-instagram-pink",
      youtube: "bg-social-primary-youtube",
    },
  };

  const [followers] = useState(data[socialMedia].statistics.followers);

  return (
    <div className="bg-social-neutral-light-300 dark:bg-social-neutral-dark-300 relative h-[216px] w-full overflow-hidden rounded-md">
      <div className={`${styles.accentColor[socialMedia]} absolute top-0 h-1 w-full`} />
      <div className="flex flex-col items-center pt-[32px]">
        <div className="flex items-center justify-center gap-2">
          <div className="relative aspect-square w-5">
            <Image
              fill
              className="object-contain"
              src={`/social-media-dashboard-with-theme-switcher/images/icon-${socialMedia}.svg`}
              alt={`${socialMedia}'s icon`}
            />
          </div>
          <p className="text-social-neutral-light-400 dark:text-social-neutral-dark-200 text-[12px] font-bold">{data[socialMedia].username}</p>
        </div>
        <p className="mt-[24px] flex flex-col items-center">
          <span className="text-social-neutral-light-500 dark:text-social-neutral-dark-100 text-[56px] font-bold leading-none tracking-[-2px]">{data[socialMedia].followers < 10000 ? data[socialMedia].followers : String(Math.floor(data[socialMedia].followers / 1000)) + "k"}</span>
          <span className="text-social-neutral-light-400 dark:text-social-neutral-dark-200 mt-[3px] text-[12px] uppercase tracking-[4.9px]">{socialMedia === "youtube" ? "Subscribers" : "Followers"}</span>
        </p>
        <div className="mt-[25px] flex items-center justify-center gap-1">
          {followers !== 0 ? (
            <div className="relative aspect-[2/1] w-2">
              <Image
                src={`/social-media-dashboard-with-theme-switcher/images/icon-${followers > 0 ? "up" : "down"}.svg`}
                alt={`${followers > 0 ? "Up" : "Down"} Icon`}
                fill
                className="object-contain"
              />
            </div>
          ) : null}
          <p className={`${followers === 0 ? "text-social-neutral-light-400" : followers > 0 ? "text-social-primary-green" : "text-social-primary-red"} text-[12px] font-bold leading-none`}>{`${Math.abs(followers)} Today`}</p>
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="-mt-[44px] px-6 ">
      <div className="flex flex-col gap-6">
        {Array.from(Object.keys(data)).map((el, index) => {
          return (
            <Card
              socialMedia={el}
              key={index}
            />
          );
        })}
      </div>
      {`
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
