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
      <div className="App font-rubiks bg-chat-app-secondary-200/50 relative h-[936px] min-h-[100svh]">
        <Main />
        <Footer />
        {/* <Slider basePath="/chat-app-css-illustration/design" /> */}
      </div>
    </>
  );
}

function Main() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="my-[64px] flex h-[505px] items-center justify-center">
        <div className="bg-chat-app-primary-gradients-magenta h-full w-[247px] rounded-xl"></div>
      </div>
      <div className="flex flex-col items-center px-9">
        <h1 className="text-chat-app-primary-text-mainhead text-center text-[40px] font-medium leading-[46px]">Simple booking</h1>
        <p className="text-chat-app-primary-text-paragraph mt-6 text-center leading-[28px]">Stay in touch with our dog walkers through the chat interface. This makes it easy to discuss arrangements and make bookings. Once the walk has been completed you can rate your walker and book again all through the chat.</p>
      </div>
      {/* {`
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
       
         
       
         
      `} */}
    </div>
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
