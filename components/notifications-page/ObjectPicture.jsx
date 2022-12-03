import Image from "next/image";

export default function ObjectPicture(props) {
  return (
    <a href="">
      <Image
        src={props.src}
        alt="Picture Post"
        width={50}
        height={50}
        className="mt-1"
      />
    </a>
  );
}
