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

export const ShortenApiResponse = CleanUriInput.extend(CleanUriResponse.shape);
export type ShortenApiResponse = z.infer<typeof ShortenApiResponse>;

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed, Must be one of: POST" });
    return;
  }

  const parseBody = CleanUriInput.safeParse(JSON.parse(req.body as string));
  if (!parseBody.success) {
    res.status(400).json({ error: parseBody.error });
    return;
  }

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
        res.status(400).json({ error: parse.error });
        return;
      }

      res.status(200).json({
        url: parseBody.data.url,
        result_url: parse.data.result_url,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: JSON.stringify(err) });
    });
};

export default handler;
