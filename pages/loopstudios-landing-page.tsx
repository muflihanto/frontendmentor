import Head from "next/head";
import dynamic from "next/dynamic";
import { Footer } from "../components/loopstudios-landing-page/Footer";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

import type { NextPage } from "next";
import Header from "../components/loopstudios-landing-page/Header";
import Hero from "../components/loopstudios-landing-page/Hero";
import Interactive from "../components/loopstudios-landing-page/Interactive";

const Loopstudios: NextPage = () => {
  return (
    <div className="relative App font-alata">
      <Head>
        <title>Frontend Mentor | Loopstudios landing page</title>
      </Head>
      <Header />
      <Hero />
      <Interactive />
      {`
        Our creations

        See all

        Deep earth
        Night arcade
        Soccer team VR
        The grid
        From up above VR
        Pocket borealis
        The curiosity
        Make it fisheye

        About
        Careers
        Events
        Products
        Support

        © 2021 Loopstudios. All rights reserved.
      `}
      <Footer />
      <Slider basePath="/loopstudios-landing-page/design/" />
    </div>
  );
};

export default Loopstudios;
