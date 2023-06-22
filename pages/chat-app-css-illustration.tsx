import Head from "next/head";
// import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

// TODO: View the optimal layout for the component depending on their device's screen size
// TODO: **Bonus**: See the chat interface animate on the initial load

export default function ChatAppCssIllustration() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Chat app CSS illustration</title>
      </Head>
      <div className="App font-rubiks relative min-h-[100svh]">
        <Main />
        <Footer />
        <Slider basePath="/chat-app-css-illustration/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
         Samuel Green
         Available to Walk
       
         That sounds great. I’d be happy with that.
       
         Could you send over some pictures of your dog, please?
       
         Here are a few pictures. She’s a happy girl!
       
         Can you make it?
       
         She looks so happy! The time we discussed works. How long shall I take her out for?
       
         30 minute walk
         $29
       
         1 hour walk
         $49
       
         Type a message…
       
         Simple booking
       
         Stay in touch with our dog walkers through the chat interface. This makes it easy to 
         discuss arrangements and make bookings. Once the walk has been completed you can rate 
         your walker and book again all through the chat.
      `}
    </>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
