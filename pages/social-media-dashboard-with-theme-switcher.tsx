import dynamic from "next/dynamic";
import Head from "next/head";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

const data = {
  facebook: {
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
    followers: 1044,
    retweets: 117,
    likes: 507,
    statistics: {
      followers: 99,
      retweets: 303,
      likes: 553,
    },
  },
  instagram: {
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
    subscribers: 8239,
    likes: 107,
    views: 1407,
    statistics: {
      subscribers: -144,
      likes: -19,
      views: -12,
    },
  },
};

const SocialDashboard = () => {
  return (
    <div className="App">
      <Head>
        <title>Frontend Mentor | Social media dashboard with theme switcher</title>
      </Head>
      <Main />
      <Footer />
      <Slider
        basePath="/social-media-dashboard-with-theme-switcher/design/"
        absolutePath="/social-media-dashboard-with-theme-switcher/design/mobile-design-light.jpg"
      />
    </div>
  );
};

export default SocialDashboard;

function Main() {
  return (
    <div>
      {`
      Social Media Dashboard
      Total Followers: 23,004

      Dark Mode

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
