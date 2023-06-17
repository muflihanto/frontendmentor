import Head from "next/head";
// import Image from "next/image";
import dynamic from "next/dynamic";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect } from "react";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });
const Map = dynamic(() => import("../components/ip-address-tracker/Map"), { ssr: false });

// TODO: View the optimal layout for each page depending on their device's screen size
// TODO: See hover states for all interactive elements on the page
// TODO: See their own IP address on the map on the initial page load
// TODO: Search for any IP addresses or domains and see the key information and location

export default function IpAddressTracker() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | IP Address Tracker</title>
      </Head>
      <div className="App font-rubiks relative min-h-[100dvh] font-medium">
        <Main />
        <Footer />
        {/* <Slider basePath="/ip-address-tracker/design" /> */}
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      <Intro />
      <Map />
    </>
  );
}

const zInputSchema = z.object({
  ipAddress: z.string().min(1, "").ip(""),
});
type InputSchema = z.infer<typeof zInputSchema>;

function Intro() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<InputSchema>({ resolver: zodResolver(zInputSchema), values: { ipAddress: "192.212.174.101" } });

  const onClick = handleSubmit((data) => {
    console.log(data);
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="relative mx-auto flex min-h-[300px] w-full max-w-screen-sm flex-col items-center bg-[url('/ip-address-tracker/images/pattern-bg-mobile.png')] bg-cover bg-no-repeat">
      <div className="absolute left-1/2 top-0 z-10 flex w-[calc(100vw-48px)] max-w-[calc(640px-48px)] -translate-x-1/2 flex-col items-center pt-[28px]">
        <h1 className="w-full text-center text-[26px] leading-none tracking-[-.25px] text-white">IP Address Tracker</h1>
        <form
          noValidate
          className="mt-[31px] grid h-[58px] w-full grid-cols-[auto_58px] grid-rows-1 overflow-hidden rounded-[16px] bg-white"
        >
          <input
            type="text"
            className="text-ip-address-200 w-full px-6 text-[18px] font-normal"
            {...register("ipAddress", { required: true })}
            placeholder="Search for any IP address or domain"
          />
          <button
            onClick={onClick}
            className="flex w-[58px] items-center justify-center bg-black"
          >
            <svg
              className="w-[11px]"
              viewBox="0 0 11 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke="#FFF"
                strokeWidth={3}
                d="M2 1l6 6-6 6"
              />
            </svg>
          </button>
        </form>

        <DetailCard />
      </div>
    </div>
  );
}

function DetailCard() {
  return (
    <div className="mt-6 h-[294px] w-full overflow-hidden rounded-[16px] bg-white">
      <ul className="flex flex-col items-center gap-[22px] py-[27px] pr-[2px]">
        <ListItem>
          <ListHeading>IP Address</ListHeading>
          <ListDetail>192.212.174.101</ListDetail>
        </ListItem>
        <ListItem>
          <ListHeading>Location</ListHeading>
          <ListDetail>Brooklyn, NY 10001</ListDetail>
        </ListItem>
        <ListItem>
          <ListHeading>Timezone</ListHeading>
          <ListDetail>UTC -05:00</ListDetail>
          {/* <!-- add offset value dynamically using the API --> */}
        </ListItem>
        <ListItem>
          <ListHeading>ISP</ListHeading>
          <ListDetail>SpaceX Starlink</ListDetail>
        </ListItem>
      </ul>
    </div>
  );
}

function ListItem({ children }: { children: ReactNode }) {
  return <li className="flex flex-col items-center gap-[5px]">{children}</li>;
}
function ListHeading({ children }: { children: ReactNode }) {
  return <div className="text-ip-address-100 text-[10px] font-bold uppercase leading-none tracking-[1.5px]">{children}</div>;
}
function ListDetail({ children }: { children?: ReactNode }) {
  return <div className="text-ip-address-200 text-[20px] tracking-[-.1px]">{children}</div>;
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
