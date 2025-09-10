/* eslint-disable @typescript-eslint/ban-types */
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Provider } from "jotai";
import "../styles/globals.css";
config.autoAddCss = false;

// import "../styles/fontface.css";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { type ReactElement, type ReactNode, useState } from "react";

// biome-ignore lint/complexity/noBannedTypes: Next.js page type requires empty object types for proper typing
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,
      @typescript-eslint/no-unsafe-member-access */}
      <Hydrate state={pageProps.dehydratedState}>
        <Provider>{getLayout(<Component {...pageProps} />)}</Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
