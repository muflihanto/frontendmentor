import Image from "next/image";
import Transform from "./Transform";

export default function Main() {
  return (
    <>
      <Transform />
      {`
      Stand out to the right audience

      Using a collaborative formula of designers, researchers, photographers, videographers, and copywriters, we’ll build and extend your brand in digital places. 

      Learn more

      Graphic design
      Great design makes you memorable. We deliver artwork that underscores your brand message and captures potential clients’ attention.

      Photography
      Increase your credibility by getting the most stunning, high-quality photos that improve your business image.

      Client testimonials

      We put our trust in Sunnyside and they delivered, making sure our needs were met and deadlines were always hit.
      Emily R.
      Marketing Director

      Sunnyside’s enthusiasm coupled with their keen interest in our brand’s success made it a satisfying and enjoyable experience.
      Thomas S.
      Chief Operating Officer

      Incredible end result! Our sales increased over 400% when we worked with Sunnyside. Highly recommended!
      Jennie F.
      Business Owner

      About
      Services
      Projects
      Contact
    `}
    </>
  );
}

// {
//   /* <Image
//           src="/sunnyside-agency-landing-page/images/mobile/image-header.jpg"
//           alt="Header Image"
//           className="object-contain"
//           fill
//         /> */
// }
