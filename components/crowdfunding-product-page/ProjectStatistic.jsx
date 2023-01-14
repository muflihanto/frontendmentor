import Card from "./Card";

export default function Statistic(props) {
  const statisticData = [
    {
      h: "$89,914",
      p: "of $100,000 backed",
    },
    {
      h: "5,007",
      p: "total backers",
    },
    {
      h: "56",
      p: "days left",
    },
  ];
  return (
    <Card className="mt-[26px] py-[27px]">
      {statisticData.map((el, index) => (
        <Data
          value={el}
          key={index}
          hr={index < statisticData.length - 1}
        />
      ))}
      <Progress
        value="89914"
        target="100000"
      />
    </Card>
  );
}

const Data = (props) => {
  const { h, p } = props.value;
  return (
    <>
      <div className="text-center">
        <h1 className="font-bold text-[32px]">{h}</h1>
        <p className="text-[14px] mt-[3px] text-crowdfunding-neutral-100/70 font-medium">{p}</p>
      </div>
      {props.hr && <hr className="w-[80px] mx-auto border-t-2 mt-[22px] mb-[19px]" />}
    </>
  );
};

const Progress = (props) => {
  return (
    <div className="relative bg-crowdfunding-neutral-100/10 mt-[30px] mb-[12px] w-[calc(100%-48px)] rounded-full h-[12px] mx-auto overflow-hidden">
      <div
        className="absolute top-0 h-full bg-crowdfunding-primary-100 w-[200px] rounded-full"
        style={{
          width: `${(parseInt(props.value) / parseInt(props.target)) * 100}%`,
        }}
      ></div>
    </div>
  );
};
