import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCountry, useBorders } from "../../utils/useCountries";
import { PropsWithChildren, useEffect, useMemo } from "react";
import { Footer, Header } from "../rest-countries-api-with-color-theme-switcher";

export default function Page() {
  const router = useRouter();
  const { data, isLoading, isFetching } = useCountry(router.query.country as string);
  const { data: borders, isLoading: isBorderLoading } = useBorders(data ? data[0].borders ?? [] : []);

  const nativeName = useMemo(() => {
    if (!data || !data[0].name.nativeName) {
      return "";
    }
    const nativeNames = Object.keys(data[0].name.nativeName);
    return data[0].name.nativeName[nativeNames[0]].common;
  }, [data]);

  useEffect(() => {
    if (!!data) {
      console.log(data);
    }
  }, [data]);

  if (isLoading)
    return (
      <Layout>
        <LoadingSkeleton />
      </Layout>
    );

  if (!data)
    return (
      <Layout>
        <div>Country not found</div>
      </Layout>
    );

  return (
    <Layout>
      <div className="mt-[62px] w-full">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src={data[0].flags.svg}
          alt={data[0].name.common}
          className="h-auto w-full shadow"
        />

        <h1 className="dark:text-rest-countries-gray-100 mt-[43px] text-[21px] font-extrabold">{data[0].name.common}</h1>

        <div className="text-rest-countries-darkblue-300 dark:text-rest-countries-gray-100 mt-[22px] space-y-[11px] text-[14px] [&_span]:font-semibold">
          <p>
            <span>Native Name: </span>
            {nativeName}
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
            {data[0].capital}
          </p>
        </div>

        <div className="text-rest-countries-darkblue-300 dark:text-rest-countries-gray-100 mt-[43px] space-y-[11px] text-[14px] [&_span]:font-semibold">
          <p>
            <span>Top Level Domain: </span>
            {data[0].tld?.join(", ") ?? ""}
          </p>
          <p>
            <span>Currencies: </span>
            {Object.values(data[0].currencies!) && (
              <>
                {Object.values(data[0].currencies!)
                  .map((c) => c.name)
                  .join(", ")}
              </>
            )}
          </p>
          <p>
            <span>Languages: </span>
            {Object.values(data[0].languages!) && <>{Object.values(data[0].languages!).join(", ")}</>}
          </p>
        </div>

        <div className="mt-[39px]">
          <h2 className="dark:text-rest-countries-gray-100 font-semibold">Border Countries: </h2>
          {isBorderLoading ? (
            <BordersSkeleton />
          ) : !!borders ? (
            <div className="mt-[14px] grid translate-x-[-2px] grid-cols-[repeat(3,99px)] gap-2">
              {borders.map((border, index) => {
                return (
                  <button
                    className="dark:text-rest-countries-gray-100 dark:bg-rest-countries-darkblue-100 dark:border-rest-countries-darkblue-200 dark:shadow-rest-countries-darkblue-300/20 h-[30px] w-[99px] truncate text-ellipsis rounded-sm border bg-white px-3 text-[12px] shadow-md"
                    key={index}
                    onClick={() => router.push({ pathname: `/rest-countries-api-with-color-theme-switcher/${border.name.common}` })}
                  >
                    {border.name.common}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}

function Layout({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <div className="App font-nunito-sans dark:bg-rest-countries-darkblue-200 relative min-h-[100svh] font-light">
      <Head>
        <title>Frontend Mentor | Rest Countries Api With Color Theme Switcher</title>
      </Head>

      <Header />

      <div className="bg-rest-countries-gray-200 dark:bg-rest-countries-darkblue-200 min-h-52 flex flex-col items-center px-7 pb-16 pt-[39px]">
        <button
          className="dark:shadow-rest-countries-darkblue-300/50 dark:bg-rest-countries-darkblue-100 dark:text-rest-countries-gray-100 dark:border-rest-countries-darkblue-200 flex h-[34px] w-[105px] items-center justify-center gap-3 self-start rounded-sm border bg-white px-3 py-0.5 text-[14px] shadow-md"
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
  return (
    <div className="mt-[62px] w-full">
      <div className="bg-rest-countries-gray-300 h-[280px] w-full animate-pulse rounded" />

      <h1 className="bg-rest-countries-gray-300 mt-[43px] w-52 animate-pulse"></h1>

      <div className="text-rest-countries-darkblue-300 dark:text-rest-countries-gray-100 mt-[22px] space-y-[11px] text-[14px] [&_span]:font-semibold">
        <p className="flex h-5 gap-1">
          <span className="bg-rest-countries-gray-300 w-20 animate-pulse" />
          <span className="bg-rest-countries-gray-300 w-40 animate-pulse" />
        </p>
        <p className="flex h-5 gap-1">
          <span className="bg-rest-countries-gray-300 w-24 animate-pulse" />
          <span className="bg-rest-countries-gray-300 w-40 animate-pulse" />
        </p>
        <p className="flex h-5 gap-1">
          <span className="bg-rest-countries-gray-300 w-28 animate-pulse" />
          <span className="bg-rest-countries-gray-300 w-36 animate-pulse" />
        </p>
        <p className="flex h-5 gap-1">
          <span className="bg-rest-countries-gray-300 w-24 animate-pulse" />
          <span className="bg-rest-countries-gray-300 w-40 animate-pulse" />
        </p>
      </div>

      <div className="text-rest-countries-darkblue-300 dark:text-rest-countries-gray-100 mt-[43px] space-y-[11px] text-[14px] [&_span]:font-semibold">
        <p className="flex h-5 gap-1">
          <span className="bg-rest-countries-gray-300 w-20 animate-pulse" />
          <span className="bg-rest-countries-gray-300 w-40 animate-pulse" />
        </p>
        <p className="flex h-5 gap-1">
          <span className="bg-rest-countries-gray-300 w-24 animate-pulse" />
          <span className="bg-rest-countries-gray-300 w-40 animate-pulse" />
        </p>
        <p className="flex h-5 gap-1">
          <span className="bg-rest-countries-gray-300 w-28 animate-pulse" />
          <span className="bg-rest-countries-gray-300 w-36 animate-pulse" />
        </p>
      </div>

      <div className="mt-[39px]">
        <h2 className="bg-rest-countries-gray-300 h-6 w-32 animate-pulse" />
        <BordersSkeleton />
      </div>
    </div>
  );
}

function BordersSkeleton() {
  return (
    <div className="mt-[14px] grid translate-x-[-2px] grid-cols-[repeat(3,99px)] gap-2">
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
