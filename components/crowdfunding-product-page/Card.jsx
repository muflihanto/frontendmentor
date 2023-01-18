export default function Card(props) {
  return <div className={`mx-auto bg-white w-[calc(100vw-48px)] rounded-lg shadow-sm lg:w-[730px] ${props.className}`}>{props.children}</div>;
}
