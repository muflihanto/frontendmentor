import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  fetch(`https://ipinfo.io/${req.query.ip}/?token=${process.env.IPINFO_TOKEN}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(404).json({ ...err });
    });
};

export default handler;
