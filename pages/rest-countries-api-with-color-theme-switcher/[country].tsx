import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { PropsWithChildren, ReactElement } from "react";
import { nunitoSans } from "../../utils/fonts/nunitoSans";
import { useBorders, useCountry } from "../../utils/useCountries";
import { Footer, Header } from "./index";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../../components/SliderTs"), { ssr: false });

export default function Page() {
  const router = useRouter();
  const { data, isLoading } = useCountry(
    router.query.country !== undefined
      ? (router.query.country as string).split("_").join(" ")
      : "",
  );
  const { data: borders, isLoading: isBorderLoading } = useBorders(
    data ? (data[0].borders ?? []) : [],
  );

  // useEffect(() => {
  //   if (!!data) {
  //     console.log(data);
  //   }
  // }, [data]);

  if (isLoading) return <LoadingSkeleton />;

  if (!data)
    return (
      <h1
        className="mt-[62px] text-[24px] font-bold text-rest-countries-darkblue-300 dark:text-rest-countries-gray-100 lg:mt-20"
        id="country"
      >
        Country not found
      </h1>
    );

  return (
    <div className="mt-[62px] w-full lg:mt-[79px] lg:flex lg:gap-[120px]">
      <Image
        width={0}
        height={0}
        sizes="100vw"
        src={data[0].flags.svg}
        alt={data[0].flags.alt ?? `Flag of ${data[0].name.common}`}
        className="h-fit w-full shadow lg:w-1/2 lg:min-w-[480px] lg:max-w-[560px] lg:shrink-0"
      />

      <div className="mt-[43px] lg:mt-[36px] lg:w-full lg:max-w-[600px]">
        <h1
          className="text-[21px] font-extrabold text-rest-countries-darkblue-300 dark:text-rest-countries-gray-100 lg:text-[32px]"
          id="country"
        >
          {data[0].name.common}
        </h1>

        <div className="mt-[22px] lg:flex lg:flex-col lg:justify-between min-[1320px]:mt-[26px] min-[1320px]:flex-row">
          <div className="space-y-[11px] text-[14px] text-rest-countries-darkblue-300 dark:text-rest-countries-gray-100 lg:space-y-2 lg:text-[16px] min-[1320px]:max-w-[50%] [&_span]:font-semibold">
            <p>
              <span>Native Name: </span>
              {!!data[0].name.nativeName &&
                !!Object.values(data[0].name.nativeName) &&
                Array.from(
                  new Set(
                    Object.values(data[0].name.nativeName).map((c) => c.common),
                  ),
                ).join(", ")}
            </p>
            <p>
              <span>Population: </span>
              {data[0].population.toLocaleString("en-GB")}
            </p>
            <p>
              <span>Region: </span>
              {data[0].region}
            </p>
            <p>
              <span>Sub Region: </span>
              {data[0].subregion}
            </p>
            <p>
              <span>Capital: </span>
              {data[0].capital?.join(", ")}
            </p>
          </div>

          <div className="mt-[43px] space-y-[11px] text-[14px] text-rest-countries-darkblue-300 dark:text-rest-countries-gray-100 lg:space-y-2 lg:text-[16px] min-[1320px]:mt-0 min-[1320px]:max-w-[50%] [&_span]:font-semibold">
            <p>
              <span>Top Level Domain: </span>
              {data[0].tld?.join(", ") ?? ""}
            </p>
            <p>
              <span>Currencies: </span>
              {!!data[0].currencies &&
                !!Object.values(data[0].currencies) &&
                Object.values(data[0].currencies)
                  .map((c) => c.name)
                  .join(", ")}
            </p>
            <p>
              <span>Languages: </span>
              {!!data[0].languages &&
                !!Object.values(data[0].languages) &&
                Object.values(data[0].languages).join(", ")}
            </p>
          </div>
        </div>

        <div className="mt-[39px] min-[1420px]:mt-[70px] min-[1420px]:flex min-[1420px]:gap-4">
          <h2 className="font-semibold text-rest-countries-darkblue-300 dark:text-rest-countries-gray-100 lg:leading-[30px]">
            Border Countries:{" "}
          </h2>
          {!!data[0].borders &&
          data[0].borders.length > 0 &&
          isBorderLoading ? (
            <BordersSkeleton />
          ) : borders !== undefined ? (
            <div className="mt-[14px] grid translate-x-[-2px] grid-cols-[repeat(3,99px)] gap-2 min-[1200px]:grid-cols-[repeat(4,99px)] min-[1420px]:mt-0">
              {borders.map((border, index) => {
                return (
                  <Link
                    className="h-[30px] w-[99px] truncate text-ellipsis rounded-sm border bg-white px-3 text-center text-[12px] leading-[30px] text-rest-countries-darkblue-300 shadow-md dark:border-rest-countries-darkblue-200 dark:bg-rest-countries-darkblue-100 dark:text-rest-countries-gray-100 dark:shadow-rest-countries-darkblue-300/20 lg:px-1 lg:text-[14px]"
                    key={`${index}-${border.name.common}`}
                    href={`/rest-countries-api-with-color-theme-switcher/${border.name.common
                      .toLowerCase()
                      .split(" ")
                      .join("_")}`}
                  >
                    {border.name.common}
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Layout({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <div
      className={`App relative min-h-[100svh] ${nunitoSans.variable} font-nunito-sans font-light dark:bg-rest-countries-darkblue-200`}
    >
      <Head>
        <title>
          Frontend Mentor | Rest Countries Api With Color Theme Switcher
        </title>
      </Head>

      {/* <Slider
        basePath="/rest-countries-api-with-color-theme-switcher/design"
        absolutePath="/rest-countries-api-with-color-theme-switcher/design/desktop-design-detail-dark.jpg"
        // absolutePath="/rest-countries-api-with-color-theme-switcher/design/mobile-design-detail-light.jpg"
      /> */}

      <Header />

      <main
        className="flex min-h-52 flex-col items-center bg-rest-countries-gray-200 px-7 pb-16 pt-[39px] dark:bg-rest-countries-darkblue-200 md:bg-rest-countries-gray-100 md:px-20 md:pt-[79px]"
        aria-labelledby="country"
      >
        <button
          className="flex h-[34px] w-[105px] items-center justify-center gap-3 self-start rounded-sm border bg-white px-3 py-0.5 text-[14px] text-rest-countries-darkblue-300 shadow-md dark:border-rest-countries-darkblue-200 dark:bg-rest-countries-darkblue-100 dark:text-rest-countries-gray-100  dark:shadow-rest-countries-darkblue-300/50 md:-ml-0.5 md:h-[42px] md:w-[137px] md:gap-[14px] md:rounded-lg md:text-base"
          onClick={() =>
            router.push("/rest-countries-api-with-color-theme-switcher/")
          }
          type="button"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back</span>
        </button>

        {children}
      </main>

      <Footer />
    </div>
  );
}

function LoadingSkeleton() {
  const widthData = [
    ["w-[102px]", "w-40"],
    ["w-[87px]", "w-40"],
    ["w-[60px]", "w-40"],
    ["w-[92px]", "w-36"],
    ["w-[60px]", "w-40"],
    ["w-[140px]", "w-5"],
    ["w-[85px]", "w-24"],
    ["w-[88px]", "w-24"],
  ];

  return (
    <div className="mt-[62px] w-full lg:mt-[79px] lg:flex lg:gap-[120px]">
      <div className="h-[280px] w-full animate-pulse rounded bg-rest-countries-gray-300 dark:bg-rest-countries-darkblue-100 lg:h-[400px] lg:w-1/2 lg:min-w-[480px] lg:max-w-[560px] lg:shrink-0" />

      <div className="mt-[43px] lg:mt-[36px] lg:w-full lg:max-w-[600px]">
        <div className="h-12 w-52 animate-pulse bg-rest-countries-gray-300 dark:bg-rest-countries-darkblue-100" />

        <div className="mt-[22px] lg:flex lg:flex-col lg:justify-between min-[1320px]:mt-[26px] min-[1320px]:flex-row">
          <div className="space-y-[11px] text-rest-countries-darkblue-300 dark:text-rest-countries-gray-100  lg:space-y-2 min-[1320px]:max-w-[50%]">
            {widthData.slice(0, 5).map((el, index) => {
              return (
                <p
                  key={`${index}-${el[0]}`}
                  className="flex h-[21px] gap-1 lg:h-6"
                >
                  <span
                    className={`bg-rest-countries-gray-300 dark:bg-rest-countries-darkblue-100 ${el[0]} animate-pulse`}
                  />
                  <span
                    className={`bg-rest-countries-gray-300 dark:bg-rest-countries-darkblue-100 ${el[1]} animate-pulse`}
                  />
                </p>
              );
            })}
          </div>

          <div className="mt-[43px] space-y-[11px] text-rest-countries-darkblue-300 dark:text-rest-countries-gray-100 lg:space-y-2 min-[1320px]:mt-0 min-[1320px]:max-w-[50%]">
            {widthData.slice(5).map((el, index) => {
              return (
                <p
                  key={`${index}-${el[0]}`}
                  className="flex h-[21px] gap-1 lg:h-6"
                >
                  <span
                    className={`bg-rest-countries-gray-300 dark:bg-rest-countries-darkblue-100 ${el[0]} animate-pulse`}
                  />
                  <span
                    className={`bg-rest-countries-gray-300 dark:bg-rest-countries-darkblue-100 ${el[1]} animate-pulse`}
                  />
                </p>
              );
            })}
          </div>
        </div>

        <div className="mt-[39px] min-[1420px]:mt-[70px] min-[1420px]:flex min-[1420px]:gap-4">
          <div className="h-6 w-32 animate-pulse bg-rest-countries-gray-300 dark:bg-rest-countries-darkblue-100 lg:h-[30px]" />
          <BordersSkeleton />
        </div>
      </div>
    </div>
  );
}

function BordersSkeleton() {
  return (
    <div className="mt-[14px] grid translate-x-[-2px] grid-cols-[repeat(3,99px)] gap-2 min-[1200px]:grid-cols-[repeat(4,99px)] min-[1420px]:mt-0">
      {Array.from({ length: 3 }).map((x, a) => {
        return (
          <div
            key={`${x as string}-${a}`}
            className="h-[30px] w-[99px] animate-pulse truncate text-ellipsis rounded-sm border bg-rest-countries-gray-300 px-3 text-[12px] shadow-md dark:border-rest-countries-darkblue-200 dark:bg-rest-countries-darkblue-100 dark:text-rest-countries-gray-100 dark:shadow-rest-countries-darkblue-300/20"
          />
        );
      })}
    </div>
  );
}

function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
}

Page.getLayout = getLayout;
