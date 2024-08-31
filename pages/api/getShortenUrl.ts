import type { NextApiHandler } from "next";
import { z } from "zod";

export const CleanUriInput = z.object({
  url: z.string().url().min(1),
});
export type CleanUriInput = z.infer<typeof CleanUriInput>;

export const CleanUriResponse = z.object({
  result_url: z.string().min(1),
});
export type CleanUriResponse = z.infer<typeof CleanUriResponse>;

export const ShortenApiResponse = z.object({
  url: z.string().min(1),
  result_url: z.string().min(1),
});
export type ShortenApiResponse = z.infer<typeof ShortenApiResponse>;

// TODO: cleanup code

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(404).send("not found");
    return;
  }

  const parseBody = CleanUriInput.safeParse(JSON.parse(req.body as string));
  if (!parseBody.success) return res.status(404);
  console.log({ parseBodyData: parseBody.data });

  const result = await fetch("https://cleanuri.com/api/v1/shorten", {
    method: "POST",
    body: JSON.stringify(parseBody.data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  result
    .json()
    .then((dat) => {
      const parse = CleanUriResponse.safeParse(dat);
      if (!parse.success) {
        console.log(parse.error);
        res.status(400).send("invalid input");
        return;
      }

      res.status(200).json({
        url: parseBody.data.url,
        result_url: parse.data.result_url,
      });
    })
    .catch((err) => {
      res.status(404).json({ ...err });
    });
};

export default handler;
