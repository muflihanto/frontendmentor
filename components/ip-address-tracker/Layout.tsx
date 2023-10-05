import Head from "next/head";
import type { PropsWithChildren } from "react";
import { rubik } from "../../utils/fonts/rubik";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>Frontend Mentor | IP Address Tracker</title>
      </Head>
      <div
        className={`App relative min-h-[100dvh] font-rubik font-medium ${rubik.variable}`}
      >
        {children}
      </div>
    </>
  );
}
