import Head from "next/head";
import dynamic from "next/dynamic";
import { z } from "zod";

const Slider = dynamic(() => import("../components/Slider"), { ssr: false });
const Main = dynamic(import("../components/interactive-comments-section/ClientWrapper"), { ssr: false });

const zUser = z.object({
  image: z.object({
    png: z.string().endsWith(".png"),
    webp: z.string().endsWith(".webp"),
  }),
  username: z.string(),
});

export const zBaseComment = z.object({
  id: z.number(),
  content: z.string(),
  createdAt: z.union([z.string(), z.number()]),
  score: z.number(),
  user: zUser,
});

const zReply = zBaseComment.extend({
  replyingTo: z.string(),
});

export type User = z.infer<typeof zUser>;
export type Reply = z.infer<typeof zReply> & {
  replies?: Reply[];
};
export type Comment = z.infer<typeof zBaseComment> & {
  replies?: Reply[];
};

export default function InteractiveCommentsSection() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Interactive comments section</title>
      </Head>
      <div className="App font-rubiks bg-interactive-comment-neutral-200 relative flex min-h-[100svh] flex-col items-center">
        <Main />
        <Footer />
        {/* <Slider basePath="/interactive-comments-section/design" /> */}
      </div>
    </>
  );
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