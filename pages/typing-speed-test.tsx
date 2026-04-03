import dynamic from "next/dynamic";
import Head from "next/head";
import { sora } from "../utils/fonts/sora";

const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function TypingSpeedTest() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Typing Speed Test</title>
      </Head>
      <div
        className={`App relative min-h-[100svh] bg-white ${sora.variable} font-sora`}
      >
        <Main />
        <Footer />
        <Slider
          basePath="/typing-speed-test/design"
          absolutePath="/typing-speed-test/design/mobile-not-started.jpg"
        />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {/*
        Personal best: <!-- PB --> WPM

        WPM: <!-- WPM -->
        Accuracy: <!-- Accuracy -->
        Time: <!-- Time -->

        Difficulty:
        Easy
        Medium
        Hard

        Mode:
        Timed (60s)
        Passage

        <!-- Passage -->

        Start Typing Test
        Or click the text and start typing

        <!-- Test Complete Start -->

        Test Complete!
        Solid run. Keep pushing to beat your high score.

        WPM: <!-- WPM -->
        Accuracy: <!-- Accuracy -->
        Characters: <!-- Correct/Incorrect -->

        Go Again
        
        <!-- Test Complete End --> 
      */}
    </>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-black [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a href="https://github.com/muflihanto" target="_blank" rel="noreferrer">
        Muflihanto
      </a>
      .
    </footer>
  );
}
