import Image from "next/image";

export default function ObjectPicture(props) {
  return (
    <a
      href=""
      className="ml-auto min-w-[39px] h-[39px] relative block md:min-w-[45px]
      md:h-[45px] md:my-[2px]"
    >
      <Image
        src={props.src}
        alt="Picture Post"
        fill
      />
    </a>
  );
}
