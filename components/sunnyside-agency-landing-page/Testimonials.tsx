import Image from "next/image";

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

export default function Testimonials() {
  return (
    <section className="bg-sunny-primary-red/[0.03] pb-[86px] pt-[64px] text-center lg:pb-[162px] lg:pt-[158px]">
      <h3 className="font-fraunces text-sunny-neutral-200 text-[16px] font-bold uppercase tracking-[4.5px] lg:text-[20px] lg:font-extrabold lg:tracking-[5.3px]">Client testimonials</h3>
      <div className="mt-[62px] flex flex-col gap-[65px] lg:mt-[78px] lg:flex-row lg:items-start lg:gap-8 lg:px-[164px]">
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

const Testimony = ({ data }: { data: (typeof testimonyData)[number] }) => {
  return (
    <div className="flex flex-col items-center justify-center px-6 lg:flex-1 lg:px-0">
      <Image
        src={data.avatar}
        alt={`${data.name}'s Avatar`}
        width={72}
        height={72}
        className="rounded-full"
      />
      <p className="mt-8 text-[18px] font-bold leading-[32px] -tracking-[0.1px] lg:mt-[58px] lg:h-24">{data.testimony}</p>
      <h4 className="font-fraunces text-sunny-neutral-500 mt-[31px] text-[18px] font-black lg:mt-[67px] lg:pr-[17px]">{data.name}</h4>
      <p className="text-sunny-neutral-200 mt-2 text-[14px] font-medium lg:pr-[17px]">{data.title}</p>
    </div>
  );
};
