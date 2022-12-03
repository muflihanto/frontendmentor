import Head from "next/head";
export default function NotificationPage(props) {
  return (
    <>
      <Head>
        <title>Notifications</title>
      </Head>
      <main>
        {`Notifications 3

          Mark all as read

          Mark Webber reacted to your recent post My first tournament today!
          1m ago

          Angela Gray followed you
          5m ago

          Jacob Thompson has joined your group Chess Club
          1 day ago

          Rizky Hasanuddin sent you a private message
          5 days ago
          Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and 
          I'm already having lots of fun and improving my game.

          Kimberly Smith commented on your picture
          1 week ago

          Nathan Peterson reacted to your recent post 5 end-game strategies to increase your win rate
          2 weeks ago

          Anna Kim left the group Chess Club
          2 weeks ago`}

        <footer className="text-[11px] text-center">
          Challenge by{" "}
          <a
            href="https://www.frontendmentor.io?ref=challenge"
            target="_blank"
            rel="noreferrer"
            className="text-[hsl(228,45%,44%)]"
          >
            Frontend Mentor
          </a>
          . Coded by{" "}
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="text-[hsl(228,45%,44%)]"
          >
            Your Name Here
          </a>
          .
        </footer>
      </main>
    </>
  );
}
