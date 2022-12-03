export default function ObjectMessage(props) {
  return (
    <a
      href={props.url}
      className="block p-3 border rounded-md border-slate-800/20 mt-2 text-slate-700 text-[14px] hover:bg-sky-200/50"
    >
      {props.message}
    </a>
  );
}
