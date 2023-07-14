import Head from "next/head";
import { getLayout } from "../../components/space-tourism-website/Layout";

export default function Tech() {
  return (
    <>
      <Head>
        <title>Space Tourism Website | Destination</title>
      </Head>

      <div className="text-space-tourism-white min-h-[850px] bg-[url('/space-tourism-website/assets/destination/background-destination-mobile.jpg')] pt-28">
        {`
        
        `}
      </div>
    </>
  );
}

Tech.getLayout = getLayout;
