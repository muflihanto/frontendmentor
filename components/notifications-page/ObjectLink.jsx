export default function ObjectLink(props) {
  return (
    <a
      href={props.url}
      className={`font-bold ${props.type === "group" ? "text-indigo-800" : "text-slate-700 hover:text-indigo-800"}`}
    >
      {props.content}
    </a>
  );
}
