import { useEffect, useState } from "react";
import Image from "next/image";
import ObjectLink from "./ObjectLink";
import ObjectMessage from "./ObjectMessage";
import ObjectPicture from "./ObjectPicture";

export default function Notification(props) {
  const { object } = props;
  return (
    <>
      <div
        className={`mt-[11px] flex items-start justify-start gap-3 px-4 pt-4 pb-[14px] rounded-md first-of-type:mt-[9px] ${props.isNew && "bg-notif-neutral-200"}`}
        onClick={props.readNotif}
      >
        <Image
          src={props.subjectAvatar}
          alt={`${props.subject}'s Avatar`}
          width={39}
          height={39}
          className="mt-[0px]"
        />
        <div>
          <p className="text-[14px] leading-[18px]">
            <a
              href={props.subjectUrl}
              className="font-extrabold text-notif-neutral-700 hover:text-notif-primary-blue"
            >
              {props.subject}
            </a>{" "}
            <span className="ml-1 text-notif-neutral-600">{props.actionType}</span>{" "}
            {typeof object.type === "string" && object.type.startsWith("link") && (
              <ObjectLink
                type={object.type.split("-")[1]}
                url={object.url}
                content={object.content}
              />
            )}{" "}
            {props.isNew && <span className="inline-block w-2 h-2 ml-1 rounded-full bg-notif-primary-red"></span>}
          </p>
          <p className="text-notif-neutral-500 text-[14px] mt-[1px]">{props.time}</p>
          {object.type === "message" && (
            <ObjectMessage
              url={object.url}
              message={object.content}
            />
          )}
        </div>
        {object.type === "picture" && (
          <ObjectPicture
            src={object.content}
            url={object.url}
          />
        )}
      </div>
    </>
  );
}
