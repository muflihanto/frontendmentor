import Image from "next/image";

export default function ObjectPicture(props) {
  return (
    <a
      href=""
      className="ml-auto"
    >
      <Image
        src={props.src}
        alt="Picture Post"
        width={55}
        height={55}
        className="mt-0"
      />
    </a>
  );
}
