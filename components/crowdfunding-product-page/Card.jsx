export default function Card(props) {
  return <div className={`mx-auto bg-white w-[calc(100vw-48px)] rounded-lg shadow-sm ${props.className}`}>{props.children}</div>;
}
