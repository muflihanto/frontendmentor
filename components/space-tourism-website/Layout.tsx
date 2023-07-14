import { PropsWithChildren, ReactElement } from "react";
import { useRouter } from "next/router";
import Header from "./Header";

export const pages = ["home", "destination", "crew", "technology"] as const;
export type Page = (typeof pages)[number];

export function Layout({ children }: PropsWithChildren) {
  const { pathname } = useRouter();

  return (
    <div className="font-barlow-condensed relative">
      <Header currentPage={(!!pathname.split("/space-tourism-website/")[1] ? pathname.split("/space-tourism-website/")[1] : "home") as Page} />
      {children}
    </div>
  );
}

export function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
}
