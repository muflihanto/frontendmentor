import Head from "next/head";
import dynamic from "next/dynamic";
import { Footer } from "../components/loopstudios-landing-page/Footer";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

import type { NextPage } from "next";

const Loopstudios: NextPage = () => {
  return (
    <div className="App font-alata">
      <Head>
        <title>Frontend Mentor | Loopstudios landing page</title>
      </Head>
      {`
        About
        Careers
        Events
        Products
        Support

        Immersive experiences that deliver

        The leader in interactive VR

        Founded in 2011, Loopstudios has been producing world-class virtual reality 
        projects for some of the best companies around the globe. Our award-winning 
        creations have transformed businesses through digital experiences that bind 
        to their brand.

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
