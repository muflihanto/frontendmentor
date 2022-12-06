import Image from "next/image";
import ObjectLink from "./ObjectLink";
import ObjectMessage from "./ObjectMessage";
import ObjectPicture from "./ObjectPicture";

export default function Notification(props) {
  const { object } = props;
  return (
    <>
      <div className={`${props.isNew && "bg-notif-neutral-200"} mt-[11px] flex items-start justify-start gap-[12px] pl-4 pr-3 pt-4 pb-[14px] rounded-md first-of-type:mt-[9px] md:px-5 md:pt-[16px] md:pb-[17px] md:mt-[7px] md:gap-[19px]`}>
        <div className="min-w-[39px] h-[39px] md:min-w-[45px] md:h-[45px] relative md:mt-[2px]">
          <Image
            src={props.subjectAvatar}
            alt={`${props.subject}'s Avatar`}
            fill
          />
        </div>
        <div>
          <p className="text-[14px] leading-[18px] md:text-[1rem] md:leading-[24px]">
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
          <p className="text-notif-neutral-500 text-[14px] mt-[1px] md:mt-[0px] md:text-[1rem]">{props.time}</p>
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
