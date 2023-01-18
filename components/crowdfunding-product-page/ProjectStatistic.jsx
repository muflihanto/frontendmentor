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
    <Card className="mt-[26px] py-[27px] lg:px-12 lg:pt-[43px] lg:pb-[36px]">
      <div className="lg:flex lg:gap-12">
        {statisticData.map((el, index) => (
          <Data
            value={el}
            key={index}
            hr={index < statisticData.length - 1}
          />
        ))}
      </div>
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
    <div className="text-center lg:text-left lg:flex-1 lg:justify-between lg:flex">
      <div>
        <h1 className="font-bold text-[32px]">{h}</h1>
        <p className="text-[14px] mt-[3px] text-crowdfunding-neutral-100/70 font-medium lg:text-[15px] lg:mt-[2px]">{p}</p>
      </div>
      {props.hr && <hr className="w-[80px] mx-auto border-t-2 mt-[22px] mb-[19px] lg:w-[2px] lg:border-t-0 lg:border-l-2 lg:m-0 lg:h-[64px] lg:mt-1" />}
    </div>
  );
};

const Progress = (props) => {
  return (
    <div className="relative bg-crowdfunding-neutral-100/10 mt-[30px] mb-[12px] w-[calc(100%-48px)] rounded-full h-[12px] mx-auto overflow-hidden lg:w-full lg:mt-[34.5px]">
      <div
        className="absolute top-0 h-full bg-crowdfunding-primary-100 w-[200px] rounded-full"
        style={{
          width: `${(parseInt(props.value) / parseInt(props.target)) * 100}%`,
        }}
      ></div>
    </div>
  );
};
