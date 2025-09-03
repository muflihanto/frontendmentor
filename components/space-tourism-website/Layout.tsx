import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import type { PropsWithChildren, ReactElement } from "react";

import { barlow } from "../../utils/fonts/barlow";
import { barlowCondensed } from "../../utils/fonts/barlowCondensed";
import { bellefair } from "../../utils/fonts/bellefair";

const Header = dynamic(import("./Header"), { ssr: false });

export const pages = ["home", "destination", "crew", "technology"] as const;
export type Page = (typeof pages)[number];

export function Layout({ children }: PropsWithChildren) {
  const { pathname } = useRouter();

  return (
    <div
      className={`relative font-barlow-condensed ${barlow.variable} ${barlowCondensed.variable} ${bellefair.variable}`}
    >
      <Header
        currentPage={
          (pathname.split("/space-tourism-website/")[1] ?? "home") as Page
        }
      />
      {children}
    </div>
  );
}

export function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
}
