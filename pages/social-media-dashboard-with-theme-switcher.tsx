import Head from "next/head";
import { createContext, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { inter } from "../utils/fonts/inter";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

type Theme = "dark" | "light";

type ThemeContext = {
  theme: Theme;
  update?: () => void;
};

type TSocialMedia = "facebook" | "instagram" | "youtube" | "twitter";

type SocialMediaData = {
  username: string;
  followers: number;
  views: number;
  likes: number;
  statistics: {
    followers: number;
    views: {
      display: string;
      value: number;
    };
    likes: {
      display: string;
      value: number;
    };
  };
};

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

const data: Record<TSocialMedia, SocialMediaData> = {
  facebook: {
    username: "@nathanf",
    followers: 1987,
    views: 87,
    likes: 52,
    statistics: {
      followers: 12,
      views: { display: "Page Views", value: 3 },
      likes: { display: "Likes", value: -2 },
    },
  },
  twitter: {
    username: "@nathanf",
    followers: 1044,
    views: 117,
    likes: 507,
    statistics: {
      followers: 99,
      views: { display: "Retweets", value: 303 },
      likes: { display: "Likes", value: 553 },
    },
  },
  instagram: {
    username: "@realnathanf",
    followers: 11734,
    views: 52000,
    likes: 5462,
    statistics: {
      followers: 1099,
      views: { display: "Profile Views", value: 1375 },
      likes: { display: "Likes", value: 2257 },
    },
  },
  youtube: {
    username: "Nathan F.",
    followers: 8239,
    likes: 107,
    views: 1407,
    statistics: {
      followers: -144,
      likes: { display: "Likes", value: -19 },
      views: { display: "Total Views", value: -12 },
    },
  },
};

const ThemeContext = createContext<ThemeContext>({
  theme: "light",
});
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
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      if (theme === "light") setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeProvider value={{ theme, update: toggle }}>
      <div
        className={`App relative bg-social-neutral-light-100 font-inter dark:bg-social-neutral-dark-500 ${inter.variable}`}
      >
        <Head>
          <title>
            Frontend Mentor | Social media dashboard with theme switcher
          </title>
        </Head>
        <Header />
        <Main />
        <Footer />
        {/* <Slider
          basePath="/social-media-dashboard-with-theme-switcher/design/"
          // absolutePath={`/social-media-dashboard-with-theme-switcher/design/mobile-design-dark.jpg`}
          absolutePath={`/social-media-dashboard-with-theme-switcher/design/desktop-design-dark.jpg`}
        /> */}
      </div>
    </ThemeProvider>
  );
};

export default SocialDashboard;

function Header() {
  const { update, theme } = useThemeContext();
  const [totalFollowers, setTotalFollowers] = useState("");

  useEffect(() => {
    setTotalFollowers(
      Array.from(Object.values(data))
        .reduce((acc, curr) => acc + curr.followers, 0)
        .toLocaleString(),
    );
  }, []);

  return (
    <div className="rounded-b-[20px] bg-social-neutral-light-200 px-6 pb-[84px] pt-[33px] dark:bg-social-neutral-dark-400 lg:flex lg:items-center lg:justify-between lg:pb-[152px] lg:pl-[162px] lg:pr-[165px] lg:pt-[34px]">
      <div>
        <h1 className="text-[24px] font-bold leading-[34px] text-social-neutral-light-500 dark:text-social-neutral-dark-100 lg:text-[28px] lg:leading-[37px]">
          Social Media Dashboard
        </h1>
        <p className="text-[14px] font-bold tracking-[0.25px] text-social-neutral-light-400 dark:text-social-neutral-dark-200">
          Total Followers: {totalFollowers}
        </p>
      </div>
      <hr className="mt-[22px] border-t-social-neutral-light-400 dark:border-t-social-neutral-dark-200/30 lg:hidden" />
      <div className="mt-[16px] flex justify-between rounded-md focus-within:outline focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-social-toggle-dark-blue lg:mb-1 lg:mt-0 lg:gap-[14px]">
        <label
          htmlFor="darkSwitch"
          className="text-[14px] font-bold text-social-neutral-light-400 dark:text-social-neutral-dark-200 lg:leading-[22px] lg:opacity-75"
          id="dark-label"
        >
          Dark Mode
        </label>
        <button
          className="flex h-[24px] w-[48px] items-center justify-end rounded-full bg-social-toggle-light bg-gradient-to-r pl-[3px] pr-[4px] focus-visible:outline-none dark:justify-start dark:from-social-toggle-dark-blue dark:to-social-toggle-dark-green lg:pr-[3px]"
          onClick={() => {
            update?.();
          }}
          type="button"
          id="darkSwitch"
          role="switch"
          aria-checked={theme === "dark"}
        >
          <span className="aspect-square h-[18px] rounded-full bg-social-neutral-light-300 dark:bg-social-neutral-dark-300" />
        </button>
      </div>
    </div>
  );
}

function Card({ socialMedia }: { socialMedia: TSocialMedia }) {
  const styles = {
    accentColor: {
      facebook: "bg-social-primary-facebook",
      twitter: "bg-social-primary-twitter",
      instagram:
        "bg-gradient-to-r from-social-primary-instagram-yellow to-social-primary-instagram-pink",
      youtube: "bg-social-primary-youtube",
    },
  };

  const [followers] = useState(data[socialMedia].statistics.followers);

  return (
    <div className="relative h-[216px] w-full overflow-hidden rounded-md bg-social-neutral-light-300 dark:bg-social-neutral-dark-300">
      <div
        className={`${styles.accentColor[socialMedia]} absolute top-0 h-1 w-full`}
      />
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
          <p className="text-[12px] font-bold text-social-neutral-light-400 dark:text-social-neutral-dark-200">
            {data[socialMedia].username}
          </p>
        </div>
        <p className="mt-[24px] flex flex-col items-center">
          <span className="text-[56px] font-bold leading-none tracking-[-2px] text-social-neutral-light-500 dark:text-social-neutral-dark-100">
            {data[socialMedia].followers < 10000
              ? data[socialMedia].followers
              : `${String(Math.floor(data[socialMedia].followers / 1000))}k`}
          </span>
          <span className="mt-[3px] text-[12px] uppercase tracking-[4.9px] text-social-neutral-light-400 dark:text-social-neutral-dark-200">
            {socialMedia === "youtube" ? "Subscribers" : "Followers"}
          </span>
        </p>
        <div className="mt-[25px] flex items-center justify-center gap-1">
          {followers !== 0 ? (
            <div className="relative aspect-[2/1] w-2">
              <Image
                src={`/social-media-dashboard-with-theme-switcher/images/icon-${
                  followers > 0 ? "up" : "down"
                }.svg`}
                alt={`${followers > 0 ? "Up" : "Down"} Icon`}
                fill
                className="object-contain"
              />
            </div>
          ) : null}
          <p
            className={`${
              followers === 0
                ? "text-social-neutral-light-400"
                : followers > 0
                  ? "text-social-primary-green"
                  : "text-social-primary-red"
            } text-[12px] font-bold leading-none`}
          >{`${Math.abs(followers)} Today`}</p>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  summary,
  socialMedia,
}: {
  summary: [
    "views" | "likes",
    {
      display: string;
      value: number;
    },
  ];
  socialMedia: TSocialMedia;
}) {
  return (
    <div className="summary-card grid h-[125px] grid-cols-2 grid-rows-2 place-content-between content-between justify-between rounded-md bg-social-neutral-light-300 pb-[25px] pl-6 pr-[31px] pt-[26px] dark:bg-social-neutral-dark-300 lg:flex-1">
      <div className="text-[14px] font-bold leading-[18px] text-social-neutral-light-400 dark:text-social-neutral-dark-200">
        {summary[1].display}
      </div>
      <div className="relative aspect-square w-5 justify-self-end">
        <Image
          fill
          className="object-contain"
          src={`/social-media-dashboard-with-theme-switcher/images/icon-${socialMedia}.svg`}
          alt={`${socialMedia}'s icon`}
        />
      </div>
      <div className="text-[32px] font-bold text-social-neutral-light-500 dark:text-social-neutral-dark-100">
        {data[socialMedia][summary[0]] < 10000
          ? data[socialMedia][summary[0]]
          : `${String(Math.floor(data[socialMedia][summary[0]] / 1000))}k`}
      </div>
      <div className="flex gap-[3px] self-end justify-self-end">
        {summary[1].value !== 0 ? (
          <div className="relative aspect-[2/1] w-2">
            <Image
              src={`/social-media-dashboard-with-theme-switcher/images/icon-${
                summary[1].value > 0 ? "up" : "down"
              }.svg`}
              alt={`${summary[1].value > 0 ? "Up" : "Down"} Icon`}
              fill
              className="object-contain"
            />
          </div>
        ) : null}
        <div
          className={`text-[12px] font-bold leading-none ${
            summary[1].value === 0
              ? "text-social-neutral-light-400"
              : summary[1].value > 0
                ? "text-social-primary-green"
                : "text-social-primary-red"
          }`}
        >
          {Math.abs(summary[1].value)}%
        </div>
      </div>
    </div>
  );
}

function FollowersSection() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-[30px]">
      {Array.from(Object.keys(data)).map((el, index) => {
        return <Card socialMedia={el as TSocialMedia} key={`${index}-${el}`} />;
      })}
    </div>
  );
}

function SummarySection() {
  const [summaries] = useState(() => {
    return Object.entries(data).map(([key, value]) => {
      return {
        [key as TSocialMedia]: {
          views: value.statistics.views,
          likes: value.statistics.likes,
        },
      };
    });
  });

  return (
    <div className="mt-[48px] lg:mt-[49px]">
      <h2 className="text-[24px] font-bold leading-none text-social-neutral-light-400 dark:text-social-neutral-dark-100">
        Overview - Today
      </h2>
      <div className="mt-[30px] flex flex-col gap-4 lg:mt-[26px] lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-x-[30px] lg:gap-y-6">
        {summaries?.map((sum) => {
          return Object.entries(sum).map((el, idx) => {
            return (
              <div
                key={`${idx}-${el[0]}`}
                className={`flex ${
                  ["instagram", "youtube"].includes(el[0])
                    ? "flex-col-reverse lg:flex-row-reverse"
                    : "flex-col lg:flex-row"
                }  gap-4 lg:gap-[30px]`}
              >
                {(Object.entries(el[1]) as Entries<(typeof el)[1]>).map(
                  (el2, index) => {
                    return (
                      <SummaryCard
                        key={`${index}-${el2[0]}`}
                        summary={el2}
                        socialMedia={el[0] as TSocialMedia}
                      />
                    );
                  },
                )}
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="-mt-[44px] px-6 pb-[46px] lg:-mt-[108px] lg:px-[164px] lg:pb-[75px]">
      <FollowersSection />
      <SummarySection />
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bottom-3 left-0 w-full text-center text-[11px] text-social-neutral-light-500 dark:text-social-neutral-dark-200 [&_a:hover]:text-white [&_a]:font-bold [&_a]:text-[hsl(228,45%,44%)] [&_a]:underline [&_a]:decoration-social-primary-red [&_a]:decoration-wavy">
      Challenge by{" "}
      <a
        rel="noreferrer"
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a href="https://github.com/muflihanto" target="_blank" rel="noreferrer">
        Muflihanto
      </a>
      .
    </div>
  );
}
