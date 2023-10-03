import Head from "next/head";
// import Image from "next/image";
import dynamic from "next/dynamic";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ReactNode, useEffect, useMemo } from "react";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useHydrateAtoms } from "jotai/utils";
import requestIp from "request-ip";
import type { IpInfoResponse } from "./api/getIpInfo";
// const Slider = dynamic(() => import("../components/Slider"), { ssr: false });
const Map = dynamic(() => import("../components/ip-address-tracker/Map"), {
  ssr: false,
});

const locAtom = atom("");
const detailAtom = atom<IpInfoResponse | undefined>(undefined);
export const coordAtom = atom<{ lat: number; lng: number }>((get) => {
  const loc = get(locAtom);
  if (!!loc) {
    const [lat, lng] = loc.split(",").map((data) => Number(data));
    return { lat, lng };
  }
  return { lat: 43.73155840383045, lng: 7.414983972724603 };
});

// TODO: View the optimal layout for each page depending on their device's screen size
// TODO: change timezone information to utc

export const getServerSideProps: GetServerSideProps<{
  detail: IpInfoResponse;
}> = async ({ req }) => {
  const clientIp = requestIp.getClientIp(req)!;
  const token = process.env.IPINFO_TOKEN!;
  const res = await fetch(`https://ipinfo.io/${clientIp}/?token=${token}`);
  const detail = (await res.json()) as IpInfoResponse;
  return { props: { detail } };
};

export default function IpAddressTracker({
  detail,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useHydrateAtoms([[detailAtom, detail]]);
  return (
    <>
      <Head>
        <title>Frontend Mentor | IP Address Tracker</title>
      </Head>
      <div className="App relative min-h-[100dvh] font-rubiks font-medium">
        <Main />
        <Footer />
        {/* <Slider
          basePath="/ip-address-tracker/design"
          absolutePath="/ip-address-tracker/design/active-states.jpg"
        /> */}
      </div>
    </>
  );
}

function Main() {
  const geoData = useAtomValue(coordAtom);
  return (
    <>
      <Intro />
      <Map geoData={geoData} />
    </>
  );
}

const zInputSchema = z.object({
  ipAddress: z.string().min(1, "").ip(""),
});
type InputSchema = z.infer<typeof zInputSchema>;
// type Detail = {
//   ip: string;
//   hostname: string;
//   anycast: boolean;
//   city: string;
//   region: string;
//   country: string;
//   loc: string;
//   org: string;
//   postal: string;
//   timezone: string;
// };

function Intro() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm<InputSchema>({ resolver: zodResolver(zInputSchema) });
  const [detail, setDetail] = useAtom(detailAtom);
  const setLoc = useSetAtom(locAtom);

  const onClick = handleSubmit(async (data) => {
    await fetch(`/api/getIpInfo?ip=${data.ipAddress}`)
      .then((res) => res.json())
      .then((data: { data: IpInfoResponse }) => {
        setDetail(data.data);
        // console.log(data);
      });
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (detail !== undefined && "loc" in detail) {
      setLoc(detail.loc);
    }
  }, [detail, setLoc]);

  return (
    <div className="relative flex min-h-[300px] w-full flex-col items-center bg-[url('/ip-address-tracker/images/pattern-bg-mobile.png')] bg-cover bg-no-repeat lg:min-h-[280px] lg:bg-[url('/ip-address-tracker/images/pattern-bg-desktop.png')]">
      <div className="absolute left-1/2 top-0 z-10 flex w-[calc(100vw-48px)] max-w-[calc(640px-48px)] -translate-x-1/2 flex-col items-center pt-[28px] lg:max-w-[calc(100vw-330px)] lg:pt-[32px]">
        <h1 className="w-full text-center text-[26px] leading-none tracking-[-.25px] text-white lg:text-[32px] lg:tracking-[-.4px]">
          IP Address Tracker
        </h1>
        <form
          noValidate
          className="mt-[31px] grid h-[58px] w-full grid-cols-[auto_58px] grid-rows-1 overflow-hidden rounded-[16px] bg-white lg:mt-[30px] lg:w-[555px]"
        >
          <input
            type="text"
            className="w-full px-6 text-[18px] font-normal text-ip-address-200"
            {...register("ipAddress", { required: true })}
            placeholder="Search for any IP address or domain"
          />
          <button
            onClick={onClick}
            className="flex w-[58px] items-center justify-center bg-black hover:bg-opacity-[75%]"
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

        <DetailCard detail={detail} />
      </div>
    </div>
  );
}

function DetailCard({ detail }: { detail?: IpInfoResponse }) {
  const location = useMemo(() => {
    if (detail !== undefined && "country" in detail) {
      const { country, city, postal } = detail;
      if (!!country && !!city) {
        return `${country}, ${city}${!!postal ? ` ${postal}` : ""}`;
      } else if (!!country) {
        return `${country}`;
      }
    }
    return null;
  }, [detail]);

  return (
    <div className="mt-6 h-[294px] w-full overflow-hidden rounded-[16px] bg-white lg:mt-12 lg:h-auto lg:min-h-[161px]">
      <ul className="flex flex-col items-center gap-[22px] py-[27px] pr-[2px] lg:flex-row lg:items-start lg:gap-[calc(22/1440*100vw)] lg:divide-x lg:py-[37px] lg:pr-[22px]">
        <ListItem>
          <ListHeading>IP Address</ListHeading>
          <ListDetail>{detail?.ip ?? "-"}</ListDetail>
        </ListItem>
        <ListItem>
          <ListHeading>Location</ListHeading>
          <ListDetail>{location ?? "-"}</ListDetail>
        </ListItem>
        <ListItem>
          <ListHeading>Timezone</ListHeading>
          {/* TODO: change timezone to utc */}
          <ListDetail>
            {detail !== undefined && "timezone" in detail
              ? detail.timezone
              : "-"}
          </ListDetail>
          {/* <!-- add offset value dynamically using the API --> */}
        </ListItem>
        <ListItem>
          <ListHeading>ISP</ListHeading>
          <ListDetail>
            {detail !== undefined && "org" in detail
              ? detail.org.split(" ").slice(1).join(" ")
              : "-"}
          </ListDetail>
        </ListItem>
      </ul>
    </div>
  );
}

function ListItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex flex-col items-center gap-[5px] lg:h-full lg:flex-1 lg:items-start lg:gap-[14px] lg:px-[calc(32/1440*100vw)]">
      {children}
    </li>
  );
}
function ListHeading({ children }: { children: ReactNode }) {
  return (
    <div className="text-[10px] font-bold uppercase leading-none tracking-[1.5px] text-ip-address-100 lg:text-[13px] lg:tracking-[1.2px]">
      {children}
    </div>
  );
}
function ListDetail({ children }: { children?: ReactNode }) {
  return (
    <div className="text-[20px] tracking-[-.1px] text-ip-address-200 lg:text-[26px] lg:leading-[30.5px] lg:tracking-[-.2px]">
      {children}
    </div>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 z-10 w-full text-center text-[11px] max-lg:bottom-5 [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
