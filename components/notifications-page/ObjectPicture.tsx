import Image from "next/image";

export default function ObjectPicture(props: { src: string }) {
  return (
    <a
      href=""
      className="relative ml-auto block h-[39px] min-w-[39px] md:my-[2px] md:h-[45px] md:min-w-[45px]"
    >
      <Image src={props.src} alt="Picture Post" fill />
    </a>
  );
}
