import type { NextApiHandler } from "next";

export type IpInfoResponse =
  | {
      ip: string;
      city: string;
      region: string;
      country: string;
      loc: string;
      org: string;
      timezone: string;
      hostname?: string;
      anycast?: boolean;
      postal?: string;
    }
  | {
      ip: string;
      bogon: boolean;
    };

const handler: NextApiHandler = (req, res) => {
  if (
    typeof req.query.ip === "string" &&
    typeof process.env.IPINFO_TOKEN === "string"
  ) {
    fetch(
      `https://ipinfo.io/${req.query.ip}/?token=${process.env.IPINFO_TOKEN}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((data: IpInfoResponse) => {
        console.log(data);
        res.status(200).json({ data });
      })
      .catch((err) => {
        res.status(404).json({ ...err });
      });
  }
};

export default handler;
