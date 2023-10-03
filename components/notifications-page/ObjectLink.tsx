import type { Notifications } from "./Main";

export default function ObjectLink(props: Notifications[number]["object"]) {
  return (
    <a
      href={props.url}
      className={`ml-1 font-extrabold ${
        props.type === "group"
          ? "text-notif-primary-blue"
          : "text-notif-neutral-600 hover:text-notif-primary-blue"
      }`}
    >
      {props.content}
    </a>
  );
}
