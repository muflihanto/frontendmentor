// import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import requestIp from "request-ip";
import { z } from "zod";
import type { IpInfoResponse } from "./api/getIpInfo";

// const Slider = dynamic(() => import("../components/Slider"), { ssr: false });
const GeoMap = dynamic(() => import("../components/ip-address-tracker/Map"), {
  ssr: false,
});
const Layout = dynamic(
  () => import("../components/ip-address-tracker/Layout"),
  { ssr: false },
);

const locAtom = atom("");
const detailAtom = atom<IpInfoResponse | undefined>(undefined);
export const coordAtom = atom<{ lat: number; lng: number }>((get) => {
  const loc = get(locAtom);
  if (loc) {
    const [lat, lng] = loc.split(",").map((data) => Number.parseFloat(data));
    return { lat, lng };
  }
  return { lat: 43.73155840383045, lng: 7.414983972724603 };
});

// TODO: View the optimal layout for each page depending on their device's screen size

export const getServerSideProps: GetServerSideProps<{
  detail: IpInfoResponse;
}> = async ({ req }) => {
  const clientIp = requestIp.getClientIp(req);
  const token = process.env.IPINFO_TOKEN;
  const res = await fetch(`https://ipinfo.io/${clientIp}/?token=${token}`);
  const detail = (await res.json()) as IpInfoResponse;
  return { props: { detail } };
};

export default function IpAddressTracker({
  detail,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useHydrateAtoms([[detailAtom, detail]]);
  return (
    <Layout>
      <Main />
      <Footer />
      {/* <Slider
          basePath="/ip-address-tracker/design"
          absolutePath="/ip-address-tracker/design/active-states.jpg"
        /> */}
    </Layout>
  );
}

function Main() {
  const geoData = useAtomValue(coordAtom);
  return (
    <main className="contents" aria-labelledby="main-heading">
      <Intro />
      <GeoMap geoData={geoData} />
    </main>
  );
}

const zInputSchema = z.object({
  ipAddress: z
    .string()
    .min(1, "IP address is required")
    .ip("Please enter a valid IP address"),
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
    formState: { isSubmitSuccessful, errors },
  } = useForm<InputSchema>({ resolver: zodResolver(zInputSchema) });
  const [detail, setDetail] = useAtom(detailAtom);
  const setLoc = useSetAtom(locAtom);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onClick = handleSubmit(async (data) => {
    setApiError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/getIpInfo?ip=${data.ipAddress}`);
      if (!response.ok) throw new Error("API request failed");
      const result = (await response.json()) as { data: IpInfoResponse };
      setDetail(result.data);
    } catch (_error) {
      setApiError("Failed to fetch IP information");
    } finally {
      setIsLoading(false);
    }
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
        <h1
          className="w-full text-center text-[26px] leading-none tracking-[-.25px] text-white lg:text-[32px] lg:tracking-[-.4px]"
          id="main-heading"
        >
          IP Address Tracker
        </h1>

        <form
          noValidate
          className="mt-[31px] grid h-[58px] w-full grid-cols-[auto_58px] grid-rows-1 overflow-hidden rounded-[16px] bg-white lg:mt-[30px] lg:w-[555px]"
          aria-labelledby="main-heading"
        >
          <div className="contents relative">
            <input
              type="text"
              className={`w-full bg-white px-6 text-[18px] font-normal text-ip-address-200 placeholder:text-ip-address-100 transition-all rounded-l-[16px] ${
                errors.ipAddress
                  ? "border-2 border-red-500 bg-red-50 pr-12 ring-2 ring-red-200"
                  : "border-2 border-transparent"
              }`}
              {...register("ipAddress", { required: true })}
              placeholder="Search for any IP address or domain"
              aria-invalid={errors.ipAddress ? "true" : "false"}
              aria-describedby={
                errors.ipAddress ? "ip-address-error" : undefined
              }
              aria-required="true"
              disabled={isLoading}
            />
            {errors.ipAddress && (
              <div
                id="ip-address-error"
                role="alert"
                aria-live="polite"
                className="absolute top-40 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs font-medium py-2 px-3 rounded-lg shadow-lg z-20 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  role="graphic-symbol"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Please enter a valid IP address</span>
              </div>
            )}
          </div>
          <button
            onClick={onClick}
            className="flex w-[58px] items-center justify-center bg-black hover:bg-opacity-[75%]"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg
                className="w-[11px]"
                viewBox="0 0 11 14"
                aria-label="Submit"
                role="graphics-symbol"
              >
                <use href="/ip-address-tracker/images/icon-arrow.svg#icon-arrow" />
              </svg>
            )}
          </button>
        </form>

        <DetailCard detail={detail} />
      </div>

      {apiError && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-sm py-3 px-4 rounded-lg shadow-xl flex items-center gap-3 z-50 max-w-[90vw] mx-auto">
          <svg
            className="w-5 h-5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            role="graphic-symbol"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="flex-1">{apiError}</span>
          <button
            onClick={() => setApiError(null)}
            className="flex-shrink-0 text-white hover:text-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-500 rounded"
            aria-label="Dismiss error message"
            type="button"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              role="graphic-symbol"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * convert TZ identifier string (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) to utc offset (ex: UTC +07:00)
 */
function getTimezoneOffset(tz: string): string {
  const d1 = new Date(Date.now());
  d1.setMilliseconds(0); // for nice rounding
  const d1OffsetHrs = (d1.getTimezoneOffset() / 60) * -1;

  const d2LocaleStr = d1.toLocaleString("en-US", { timeZone: tz });
  const d2 = new Date(d2LocaleStr);

  const diffHrs = (d2.getTime() - d1.getTime()) / 1000 / 60 / 60;
  const d2OffsetHrs = d1OffsetHrs + diffHrs;

  let formattedOffset = "UTC ";
  switch (true) {
    case d2OffsetHrs < -9:
      formattedOffset += `${d2OffsetHrs}`;
      break;
    case d2OffsetHrs < 0:
      formattedOffset += `-0${d2OffsetHrs.toString()[1]}`;
      break;
    case d2OffsetHrs < 10:
      formattedOffset += `+0${d2OffsetHrs}`;
      break;
    default:
      formattedOffset += `+${d2OffsetHrs}`;
  }

  return `${formattedOffset}:00`;
}

function DetailCard({ detail }: { detail?: IpInfoResponse }) {
  const location = useMemo(() => {
    if (detail !== undefined && "country" in detail) {
      const { country, city, postal } = detail;
      if (!!country && !!city) {
        return `${country}, ${city}${postal !== undefined ? ` ${postal}` : ""}`;
      }
      if (country) return `${country}`;
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
          <ListDetail>
            {detail !== undefined && "timezone" in detail
              ? getTimezoneOffset(detail.timezone)
              : "-"}
          </ListDetail>
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
    <footer className="absolute bottom-3 z-10 w-full text-center text-[11px] text-ip-address-200 max-lg:bottom-5 [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
