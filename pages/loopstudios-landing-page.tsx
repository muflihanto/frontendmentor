import Head from "next/head";
import dynamic from "next/dynamic";
import { Footer } from "../components/loopstudios-landing-page/Footer";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

import { type InferGetStaticPropsType, GetStaticProps } from "next";
import type { NextPage } from "next";
import Header from "../components/loopstudios-landing-page/Header";
import Hero from "../components/loopstudios-landing-page/Hero";
import Interactive from "../components/loopstudios-landing-page/Interactive";
import Creations from "../components/loopstudios-landing-page/Creations";

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      creations: [
        {
          bgMobile: "bg-[url('/loopstudios-landing-page/images/mobile/image-deep-earth.jpg')]",
          bgDesktop: "lg:bg-[url('/loopstudios-landing-page/images/desktop/image-deep-earth.jpg')]",
          title: "Deep earth",
        },
        {
          bgMobile: "bg-[url('/loopstudios-landing-page/images/mobile/image-night-arcade.jpg')]",
          bgDesktop: "lg:bg-[url('/loopstudios-landing-page/images/desktop/image-night-arcade.jpg')]",
          title: "Night arcade",
        },
        {
          bgMobile: "bg-[url('/loopstudios-landing-page/images/mobile/image-soccer-team.jpg')]",
          bgDesktop: "lg:bg-[url('/loopstudios-landing-page/images/desktop/image-soccer-team.jpg')]",
          title: "Soccer team VR",
        },
        {
          bgMobile: "bg-[url('/loopstudios-landing-page/images/mobile/image-grid.jpg')]",
          bgDesktop: "lg:bg-[url('/loopstudios-landing-page/images/desktop/image-grid.jpg')]",
          title: "The grid",
        },
        {
          bgMobile: "bg-[url('/loopstudios-landing-page/images/mobile/image-from-above.jpg')]",
          bgDesktop: "lg:bg-[url('/loopstudios-landing-page/images/desktop/image-from-above.jpg')]",
          title: "From up above VR",
        },
        {
          bgMobile: "bg-[url('/loopstudios-landing-page/images/mobile/image-pocket-borealis.jpg')]",
          bgDesktop: "lg:bg-[url('/loopstudios-landing-page/images/desktop/image-pocket-borealis.jpg')]",
          title: "Pocket borealis",
        },
        {
          bgMobile: "bg-[url('/loopstudios-landing-page/images/mobile/image-curiosity.jpg')]",
          bgDesktop: "lg:bg-[url('/loopstudios-landing-page/images/desktop/image-curiosity.jpg')]",
          title: "The curiosity",
        },
        {
          bgMobile: "bg-[url('/loopstudios-landing-page/images/mobile/image-fisheye.jpg')]",
          bgDesktop: "lg:bg-[url('/loopstudios-landing-page/images/desktop/image-fisheye.jpg')]",
          title: "Make it fisheye",
        },
      ],
    },
  };
};

export type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Loopstudios: NextPage = ({ creations }: PageProps) => {
  return (
    <div className="relative App font-alata">
      <Head>
        <title>Frontend Mentor | Loopstudios landing page</title>
      </Head>
      <Header />
      <Hero />
      <Interactive />
      <Creations creations={creations} />
      <Footer />
      <Slider basePath="/loopstudios-landing-page/design/" />
    </div>
  );
};

export default Loopstudios;
