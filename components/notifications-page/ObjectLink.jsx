export default function ObjectLink(props) {
  return (
    <a
      href={props.url}
      className={`font-extrabold ml-1 ${props.type === "group" ? "text-notif-primary-blue" : "text-notif-neutral-600 hover:text-notif-primary-blue"}`}
    >
      {props.content}
    </a>
  );
}
