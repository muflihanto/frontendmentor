import { useMemo, useEffect, useState, createContext, useRef } from "react";
import Header from "./Header";
import Notification from "./Notification";
import { plusJakartaFont } from "../../utils/fontLoader";

export const FontContext = createContext();

export default function Main() {
  const [notificationData, setNotificationData] = useState(null);
  const [count, setCount] = useState(null);
  const font = useRef(`${plusJakartaFont} font-plus-jakarta`);
  useEffect(() => {
    setNotificationData(notifications);
  }, []);
  useEffect(() => {
    if (notificationData) {
      setCount(notificationData.filter((notif) => notif.isNew).length);
    }
  }, [notificationData]);
  const markAsRead = () => {
    const marked = notificationData.map((notif) => ({ ...notif, isNew: false }));
    setNotificationData(marked);
  };

  const notificationElement = useMemo(() => {
    if (notificationData) {
      return notificationData.map((notif, index) => {
        return (
          <Notification
            key={index}
            {...notif}
          />
        );
      });
    }
  }, [notificationData]);

  return (
    <FontContext.Provider value={font.current}>
      <main className={`${font.current} px-4 md:max-w-[730px] md:px-[30px] md:py-[9px] md:mx-auto font-medium md:bg-notif-neutral-100 md:rounded-xl md:shadow-[0px_0px_30px_2px_rgba(0,0,0,.03)]`}>
        <Header
          notifCount={count}
          markAsRead={markAsRead}
        />
        <div className="notifications md:mt-5">{notificationElement}</div>
      </main>
    </FontContext.Provider>
  );
}

const notifications = [
  {
    subject: "Mark Webber",
    subjectAvatar: "/notifications-page/assets/images/avatar-mark-webber.webp",
    subjectUrl: "",
    actionType: "reacted to your recent post",
    object: {
      type: "link-post",
      content: "My first tournament today!",
      url: "",
    },
    time: "1m ago",
    isNew: true,
  },
  {
    subject: "Angela Gray",
    subjectAvatar: "/notifications-page/assets/images/avatar-angela-gray.webp",
    subjectUrl: "",
    actionType: "followed you",
    object: {
      type: null,
      content: "",
      url: "",
    },
    time: "5m ago",
    isNew: true,
  },
  {
    subject: "Jacob Thompson",
    subjectAvatar: "/notifications-page/assets/images/avatar-jacob-thompson.webp",
    subjectUrl: "",
    actionType: "has joined your group",
    object: {
      type: "link-group",
      content: "Chess Club",
      url: "",
    },
    time: "1 day ago",
    isNew: true,
  },
  {
    subject: "Rizky Hasanuddin",
    subjectAvatar: "/notifications-page/assets/images/avatar-rizky-hasanuddin.webp",
    subjectUrl: "",
    actionType: "sent you a private message",
    object: {
      type: "message",
      content: "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
      url: "",
    },
    time: "5 days ago",
    isNew: false,
  },
  {
    subject: "Kimberly Smith",
    subjectAvatar: "/notifications-page/assets/images/avatar-kimberly-smith.webp",
    subjectUrl: "",
    actionType: "commented on your picture",
    object: {
      type: "picture",
      content: "/notifications-page/assets/images/image-chess.webp",
      url: "",
    },
    time: "1 week ago",
    isNew: false,
  },
  {
    subject: "Nathan Peterson",
    subjectAvatar: "/notifications-page/assets/images/avatar-nathan-peterson.webp",
    subjectUrl: "",
    actionType: "reacted to your recent post",
    object: {
      type: "link-post",
      content: "5 end-game strategies to increase your win rate",
      url: "",
    },
    time: "2 weeks ago",
    isNew: false,
  },
  {
    subject: "Anna Kim",
    subjectAvatar: "/notifications-page/assets/images/avatar-anna-kim.webp",
    subjectUrl: "",
    actionType: "left the group",
    object: {
      type: "link-group",
      content: "Chess Club",
      url: "",
    },
    time: "2 weeks ago",
    isNew: false,
  },
];
