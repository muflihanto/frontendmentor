import { useEffect, useState } from "react";
import Image from "next/image";
import ObjectLink from "./ObjectLink";
import ObjectMessage from "./ObjectMessage";
import ObjectPicture from "./ObjectPicture";

export default function Notification(props) {
  const { object } = props;
  return (
    <>
      <div className={`mt-3 flex items-start justify-start gap-3 px-4 py-3 rounded-md ${props.isNew && "bg-sky-200/50"}`}>
        <Image
          src={props.subjectAvatar}
          alt={`${props.subject}'s Avatar`}
          width={40}
          height={40}
          className="mt-1"
        />
        <div>
          <p className="leading-[22px] text-[14px]">
            <a
              href={props.subjectUrl}
              className="font-bold hover:text-indigo-800"
            >
              {props.subject}
            </a>{" "}
            <span>{props.actionType}</span>{" "}
            {typeof object.type === "string" && object.type.startsWith("link") && (
              <ObjectLink
                type={object.type.split("-")[1]}
                url={object.url}
                content={object.content}
              />
            )}{" "}
            {props.isNew && <span className="inline-block w-2 h-2 bg-red-400 rounded-full"></span>}
          </p>
          <p className="text-slate-500 text-[12px] mt-1">{props.time}</p>
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
