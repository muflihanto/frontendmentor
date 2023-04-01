import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function ClipboardLandingPage() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Clipboard landing page</title>
      </Head>
      <div className="App font-bai-jamjuree relative min-h-[100svh]">
        <Main />
        <Footer />
        <Slider basePath="/clipboard-landing-page/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
         A history of everything you copy

         Clipboard allows you to track and organize everything you 
         copy. Instantly access your clipboard on all your devices.
       
         Download for iOS
         Download for Mac
       
         Keep track of your snippets
       
         Clipboard instantly stores any item you copy in the cloud, 
         meaning you can access your snippets immediately on all your 
         devices. Our Mac and iOS apps will help you organize everything.
       
         Quick Search
       
         Easily search your snippets by content, category, web address, application, and more.
       
         iCloud Sync
       
         Instantly saves and syncs snippets across all your devices.
       
         Complete History
       
         Retrieve any snippets from the first moment you started using the app.
       
         Access Clipboard anywhere
       
         Whether you’re on the go, or at your computer, you can access all your Clipboard 
         snippets in a few simple clicks.
       
         Supercharge your workflow
       
         We’ve got the tools to boost your productivity.
       
         Create blacklists
       
         Ensure sensitive information never makes its way to your clipboard by excluding certain sources.
       
         Plain text snippets
       
         Remove unwanted formatting from copied text for a consistent look.
       
         Sneak preview
       
         Quick preview of all snippets on your Clipboard for easy access.
       
         Clipboard for iOS and Mac OS
       
         Available for free on the App Store. Download for Mac or iOS, sync with iCloud 
         and you’re ready to start adding to your clipboard.
       
         Download for iOS
         Download for Mac
       
         FAQs
         Contact Us
         Privacy Policy
         Press Kit
         Install Guide
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
