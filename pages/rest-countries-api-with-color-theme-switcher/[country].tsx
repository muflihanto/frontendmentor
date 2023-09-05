import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCountry, useBorders } from "../../utils/useCountries";
import { PropsWithChildren, ReactElement, useEffect } from "react";
import { Footer, Header } from "./index";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../../components/SliderTs"), { ssr: false });

export default function Page() {
  const router = useRouter();
  const { data, isLoading } = useCountry(!!router.query.country ? (router.query.country as string).split("_").join(" ") : "");
  const { data: borders, isLoading: isBorderLoading } = useBorders(data ? data[0].borders ?? [] : []);

  // useEffect(() => {
  //   if (!!data) {
  //     console.log(data);
  //   }
  // }, [data]);

  if (isLoading) return <LoadingSkeleton />;

  if (!data) return <div className="text-rest-countries-darkblue-300 dark:text-rest-countries-gray-100 mt-[62px] text-[24px] font-bold lg:mt-20">Country not found</div>;

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
        <h1 className="dark:text-rest-countries-gray-100 text-[21px] font-extrabold lg:text-[32px]">{data[0].name.common}</h1>

        <div className="mt-[22px] lg:flex lg:flex-col lg:justify-between min-[1320px]:mt-[26px] min-[1320px]:flex-row">
          <div className="text-rest-countries-darkblue-300 dark:text-rest-countries-gray-100 space-y-[11px] text-[14px] lg:space-y-2 lg:text-[16px] min-[1320px]:max-w-[50%] [&_span]:font-semibold">
            <p>
              <span>Native Name: </span>
              {!!data[0].name.nativeName && !!Object.values(data[0].name.nativeName) && Array.from(new Set(Object.values(data[0].name.nativeName).map((c) => c.common))).join(", ")}
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

          <div className="text-rest-countries-darkblue-300 dark:text-rest-countries-gray-100 mt-[43px] space-y-[11px] text-[14px] lg:space-y-2 lg:text-[16px] min-[1320px]:mt-0 min-[1320px]:max-w-[50%] [&_span]:font-semibold">
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
              {!!data[0].languages && !!Object.values(data[0].languages) && Object.values(data[0].languages).join(", ")}
            </p>
          </div>
        </div>

        <div className="mt-[39px] min-[1420px]:mt-[70px] min-[1420px]:flex min-[1420px]:gap-4">
          <h2 className="dark:text-rest-countries-gray-100 font-semibold lg:leading-[30px]">Border Countries: </h2>
          {!!data[0].borders && data[0].borders.length > 0 && isBorderLoading ? (
            <BordersSkeleton />
          ) : !!borders ? (
            <div className="mt-[14px] grid translate-x-[-2px] grid-cols-[repeat(3,99px)] gap-2 min-[1200px]:grid-cols-[repeat(4,99px)] min-[1420px]:mt-0">
              {borders.map((border, index) => {
                return (
                  <button
                    className="dark:text-rest-countries-gray-100 dark:bg-rest-countries-darkblue-100 dark:border-rest-countries-darkblue-200 dark:shadow-rest-countries-darkblue-300/20 h-[30px] w-[99px] truncate text-ellipsis rounded-sm border bg-white px-3 text-[12px] shadow-md lg:px-1 lg:text-[14px]"
                    key={index}
                    onClick={() => router.push({ pathname: `/rest-countries-api-with-color-theme-switcher/${border.name.common.toLowerCase().split(" ").join("_")}` })}
                  >
                    {border.name.common}
                  </button>
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
    <div className="App font-nunito-sans dark:bg-rest-countries-darkblue-200 relative min-h-[100svh] font-light">
      <Head>
        <title>Frontend Mentor | Rest Countries Api With Color Theme Switcher</title>
      </Head>

      {/* <Slider
        basePath="/rest-countries-api-with-color-theme-switcher/design"
        absolutePath="/rest-countries-api-with-color-theme-switcher/design/desktop-design-detail-dark.jpg"
        // absolutePath="/rest-countries-api-with-color-theme-switcher/design/mobile-design-detail-light.jpg"
      /> */}

      <Header />

      <div className="bg-rest-countries-gray-200 dark:bg-rest-countries-darkblue-200 min-h-52 md:bg-rest-countries-gray-100 flex flex-col items-center px-7 pb-16 pt-[39px] md:px-20 md:pt-[79px]">
        <button
          className="dark:shadow-rest-countries-darkblue-300/50 dark:bg-rest-countries-darkblue-100 dark:text-rest-countries-gray-100 dark:border-rest-countries-darkblue-200 flex h-[34px] w-[105px] items-center justify-center gap-3 self-start rounded-sm border bg-white px-3 py-0.5 text-[14px] shadow-md  md:-ml-0.5 md:h-[42px] md:w-[137px] md:gap-[14px] md:rounded-lg md:text-base"
          onClick={() => router.push("/rest-countries-api-with-color-theme-switcher/")}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back</span>
        </button>

        {children}
      </div>

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
      <div className="bg-rest-countries-gray-300 dark:bg-rest-countries-darkblue-100 h-[280px] w-full animate-pulse rounded lg:h-[400px] lg:w-1/2 lg:min-w-[480px] lg:max-w-[560px] lg:shrink-0" />

      <div className="mt-[43px] lg:mt-[36px] lg:w-full lg:max-w-[600px]">
        <h1 className="bg-rest-countries-gray-300 dark:bg-rest-countries-darkblue-100 h-12 w-52 animate-pulse" />

        <div className="mt-[22px] lg:flex lg:flex-col lg:justify-between min-[1320px]:mt-[26px] min-[1320px]:flex-row">
          <div className="text-rest-countries-darkblue-300 dark:text-rest-countries-gray-100 space-y-[11px]  lg:space-y-2 min-[1320px]:max-w-[50%]">
            {widthData.slice(0, 5).map((el, index) => {
              return (
                <p
                  key={index}
                  className="flex h-[21px] gap-1 lg:h-6"
                >
                  <span className={`bg-rest-countries-gray-300 dark:bg-rest-countries-darkblue-100 ${el[0]} animate-pulse`} />
                  <span className={`bg-rest-countries-gray-300 dark:bg-rest-countries-darkblue-100 ${el[1]} animate-pulse`} />
                </p>
              );
            })}
          </div>

          <div className="text-rest-countries-darkblue-300 dark:text-rest-countries-gray-100 mt-[43px] space-y-[11px] lg:space-y-2 min-[1320px]:mt-0 min-[1320px]:max-w-[50%]">
            {widthData.slice(5).map((el, index) => {
              return (
                <p
                  key={index}
                  className="flex h-[21px] gap-1 lg:h-6"
                >
                  <span className={`bg-rest-countries-gray-300 dark:bg-rest-countries-darkblue-100 ${el[0]} animate-pulse`} />
                  <span className={`bg-rest-countries-gray-300 dark:bg-rest-countries-darkblue-100 ${el[1]} animate-pulse`} />
                </p>
              );
            })}
          </div>
        </div>

        <div className="mt-[39px] min-[1420px]:mt-[70px] min-[1420px]:flex min-[1420px]:gap-4">
          <h2 className="bg-rest-countries-gray-300 dark:bg-rest-countries-darkblue-100 h-6 w-32 animate-pulse lg:h-[30px]" />
          <BordersSkeleton />
        </div>
      </div>
    </div>
  );
}

function BordersSkeleton() {
  return (
    <div className="mt-[14px] grid translate-x-[-2px] grid-cols-[repeat(3,99px)] gap-2 min-[1200px]:grid-cols-[repeat(4,99px)] min-[1420px]:mt-0">
      {Array.from({ length: 3 }).map((_, a) => {
        return (
          <div
            key={a}
            className="dark:text-rest-countries-gray-100 dark:bg-rest-countries-darkblue-100 dark:border-rest-countries-darkblue-200 dark:shadow-rest-countries-darkblue-300/20 bg-rest-countries-gray-300 h-[30px] w-[99px] animate-pulse truncate text-ellipsis rounded-sm border px-3 text-[12px] shadow-md"
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
