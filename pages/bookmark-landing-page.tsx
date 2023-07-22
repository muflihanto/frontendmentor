import Head from "next/head";
// import Image from "next/image";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function BookmarkLandingPage() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Bookmark landing page</title>
      </Head>
      <div className="App relative min-h-[100svh]">
        <Main />
        <Footer />
        {/* <Slider basePath="/bookmark-landing-page/design" /> */}
      </div>
    </>
  );
}

function Main() {
  return (
    <div className="font-rubiks">
      <h1 className="text-bookmark-neutral-200 text-center text-[28px] font-medium leading-[40px]">A Simple Bookmark Manager</h1>

      {/* {`
         Features
         Pricing
         Contact
         Login
       
         A Simple Bookmark Manager
       
         A clean and simple interface to organize your favourite websites. Open a new 
         browser tab and see your sites load instantly. Try it for free.
       
         Get it on Chrome
         Get it on Firefox
       
         Features
       
         Our aim is to make it quick and easy for you to access your favourite websites. 
         Your bookmarks sync between your devices so you can access them on the go.
       
         Simple Bookmarking
         Speedy Searching
         Easy Sharing
       
         Bookmark in one click
       
         Organize your bookmarks however you like. Our simple drag-and-drop interface 
         gives you complete control over how you manage your favourite sites.
       
         More Info
       
         Intelligent search
       
         Our powerful search feature will help you find saved sites in no time at all. 
         No need to trawl through all of your bookmarks.
       
         More Info
       
         Share your bookmarks
       
         Easily share your bookmarks and collections with others. Create a shareable 
         link that you can send at the click of a button.
       
         More Info
       
         Download the extension
       
         We’ve got more browsers in the pipeline. Please do let us know if you’ve 
         got a favourite you’d like us to prioritize.
       
         Add to Chrome
         Minimum version 62
         Add & Install Extension
       
         Add to Firefox
         Minimum version 55
         Add & Install Extension
       
         Add to Opera
         Minimum version 46
         Add & Install Extension
       
         Frequently Asked Questions
         
         Here are some of our FAQs. If you have any other questions you’d like 
         answered please feel free to email us.
       
         <!-- Question 1 -->
         What is Bookmark?
       
         <!-- Answer 1 -->
         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt 
         justo eget ultricies fringilla. Phasellus blandit ipsum quis quam ornare mattis.
       
         <!-- Question 2 -->
         How can I request a new browser?
       
         <!-- Answer 2 -->
         Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. 
         Suspendisse imperdiet. Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, 
         ultricies non ligula. Suspendisse imperdie tVivamus luctus eros aliquet convallis ultricies. 
         Mauris augue massa, ultricies non ligula. Suspendisse imperdiet.
       
         <!-- Question 3 -->
         Is there a mobile app?
       
         <!-- Answer 3 -->
         Sed consectetur quam id neque fermentum accumsan. Praesent luctus vestibulum dolor, ut condimentum 
         urna vulputate eget. Cras in ligula quis est pharetra mattis sit amet pharetra purus. Sed 
         sollicitudin ex et ultricies bibendum.
       
         <!-- Question 4 -->
         What about other Chromium browsers?
       
         <!-- Answer 4 -->
         Integer condimentum ipsum id imperdiet finibus. Vivamus in placerat mi, at euismod dui. Aliquam 
         vitae neque eget nisl gravida pellentesque non ut velit.
       
         More Info
       
         35,000+ already joined
       
         Stay up-to-date with what we’re doing
       
         Contact Us
       
         Features
         Pricing
         Contact
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
