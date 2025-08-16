import Image from "next/image";
import type { Notifications } from "./Main";
import ObjectLink from "./ObjectLink";
import ObjectMessage from "./ObjectMessage";
import ObjectPicture from "./ObjectPicture";

export default function Notification(
  props: Notifications[number] & { labelId: string },
) {
  const { object } = props;
  return (
    <div
      className={`${
        props.isNew && "bg-notif-neutral-200"
      } mt-[11px] flex items-start justify-start gap-[12px] rounded-md pb-[14px] pl-4 pr-3 pt-4 first-of-type:mt-[9px] md:mt-[7px] md:gap-[19px] md:px-5 md:pb-[17px] md:pt-[16px]`}
    >
      <div className="relative h-[39px] min-w-[39px] md:mt-[2px] md:h-[45px] md:min-w-[45px]">
        <Image
          src={props.subjectAvatar}
          alt={`${props.subject}'s Avatar`}
          fill
        />
      </div>
      <div>
        <p
          className="text-[14px] leading-[18px] md:text-[1rem] md:leading-[24px]"
          id={`notification-${props.labelId}`}
        >
          <a
            href={props.subjectUrl}
            className="font-extrabold text-notif-neutral-700 hover:text-notif-primary-blue"
          >
            {props.subject}
          </a>{" "}
          <span className="ml-1 text-notif-neutral-600">
            {props.actionType}
          </span>{" "}
          {typeof object.type === "string" &&
            object.type.startsWith("link") && (
              <ObjectLink
                type={object.type.split("-")[1]}
                url={object.url}
                content={object.content}
              />
            )}{" "}
          {props.isNew && (
            <span
              className="ml-1 inline-block h-2 w-2 rounded-full bg-notif-primary-red"
              aria-hidden="true"
            />
          )}
        </p>
        <p className="mt-[1px] text-[14px] text-notif-neutral-500 md:mt-[0px] md:text-[1rem]">
          {props.time}
        </p>
        {object.type === "message" && (
          <ObjectMessage url={object.url} message={object.content} />
        )}
      </div>
      {object.type === "picture" && <ObjectPicture src={object.content} />}
    </div>
  );
}
