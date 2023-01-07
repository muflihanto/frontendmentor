import Image from "next/image";

export default function Testimonials(props) {
  const testimonyData = [
    {
      avatar: "/sunnyside-agency-landing-page/images/image-emily.jpg",
      name: "Emily R.",
      title: "Marketing Director",
      testimony: "We put our trust in Sunnyside and they delivered, making sure our needs were met and deadlines were always hit.",
    },
    {
      avatar: "/sunnyside-agency-landing-page/images/image-thomas.jpg",
      name: "Thomas S.",
      title: "Chief Operating Officer",
      testimony: "Sunnyside’s enthusiasm coupled with their keen interest in our brand’s success made it a satisfying and enjoyable experience.",
    },
    {
      avatar: "/sunnyside-agency-landing-page/images/image-jennie.jpg",
      name: "Jennie F.",
      title: "Business Owner",
      testimony: "Incredible end result! Our sales increased over 400% when we worked with Sunnyside. Highly recommended!",
    },
  ];
  return (
    <section className="text-center pt-[64px] pb-[86px] bg-sunny-primary-red/[0.03] lg:pt-[158px] lg:pb-[162px]">
      <h3 className="text-[16px] uppercase font-fraunces font-bold tracking-[4.5px] text-sunny-neutral-200 lg:text-[20px] lg:font-extrabold lg:tracking-[5.3px]">Client testimonials</h3>
      <div className="flex flex-col mt-[62px] gap-[65px] lg:flex-row lg:gap-8 lg:px-[164px] lg:mt-[78px] lg:items-start">
        {testimonyData.map((el, index) => {
          return (
            <Testimony
              data={el}
              key={index}
            />
          );
        })}
      </div>
    </section>
  );
}

const Testimony = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center px-6 lg:flex-1 lg:px-0">
      <Image
        src={data.avatar}
        alt={`${data.name}'s Avatar`}
        width={72}
        height={72}
        className="rounded-full"
      />
      <p className="text-[18px] mt-8 -tracking-[0.1px] leading-[32px] font-bold lg:mt-[58px] lg:h-24">{data.testimony}</p>
      <h4 className="font-fraunces text-sunny-neutral-500 font-black mt-[31px] text-[18px] lg:mt-[67px] lg:pr-[17px]">{data.name}</h4>
      <p className="text-[14px] text-sunny-neutral-200 mt-2 lg:pr-[17px] font-medium">{data.title}</p>
    </div>
  );
};