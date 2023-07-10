import Head from "next/head";
import { useRef } from "react";
import { type AriaButtonProps, useToggleButton } from "react-aria";
// import { cn } from "../utils/cn";
import { useToggleState } from "react-stately";

function ToggleButton(props: AriaButtonProps) {
  let ref = useRef(null);
  let state = useToggleState(props);
  let { buttonProps, isPressed } = useToggleButton(props, state, ref);

  return (
    <button
      {...buttonProps}
      style={{
        background: isPressed ? (state.isSelected ? "darkgreen" : "gray") : state.isSelected ? "green" : "lightgray",
        color: state.isSelected ? "white" : "black",
        padding: 10,
        fontSize: 16,
        userSelect: "none",
        WebkitUserSelect: "none",
        border: "none",
      }}
      ref={ref}
    >
      {props.children}
    </button>
  );
}

export default function TestComponent() {
  return (
    <>
      <Head>
        <title>Test Component</title>
      </Head>
      <div className="min-h-[100dvh]">
        <h1>Test</h1>
        <ToggleButton>Click Me</ToggleButton>
      </div>
    </>
  );
}

// import Head from "next/head";
// import { useState } from "react";
// import Accordion from "../components/test-component/accordion";

// export default function Test(props) {
//   const [isOpen, setIsOpen] = useState(true);
//   return (
//     <div className="h-screen w-screen bg-white">
//       <header className="relative flex h-[75px] items-center justify-between bg-white px-4 lg:justify-start lg:gap-8">
//         <Head>
//           <title>Test Component</title>
//         </Head>
//         <div>Logo</div>
//         <nav className="hidden justify-between lg:flex lg:w-full lg:items-center">
//           <ul className="block lg:flex lg:h-fit lg:gap-5">
//             <li>
//               <Accordion />
//             </li>
//           </ul>
//         </nav>
//         <button className="ml-auto">Login</button>

//         <button
//           className={`absolute z-30 block p-2 ${isOpen ? "bg-slate-700 text-gray-50" : "bg-white"}  right-2 top-2 rounded-md lg:hidden`}
//           onClick={() => {
//             setIsOpen((prev) => !prev);
//           }}
//         >
//           {isOpen ? "Close" : "Open"}
//         </button>

//         {isOpen && (
//           <div
//             onClick={(e) => {
//               if (e.target === e.currentTarget) setIsOpen(false);
//             }}
//             onTouchStart={(e) => {
//               if (e.target === e.currentTarget) setIsOpen(false);
//             }}
//             className="bg-introdrop-neutral-200/50 fixed right-0 top-0 z-20 h-full w-full lg:hidden"
//           >
//             <nav className="text-introdrop-neutral-300 bg-introdrop-neutral-100 absolute right-0 top-0 h-full w-[60vw] px-5 py-5 pt-[70px] shadow-2xl">
//               <ul className="block lg:flex lg:h-fit lg:gap-5">
//                 <li>
//                   <Accordion />
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         )}
//       </header>
//       <div>
//         <svg>
//           <use
//             href="/index/logo.svg#easybank-logo"
//             className="text-[#2D314D]"
//           />
//         </svg>
//       </div>
//     </div>
//   );
// }
