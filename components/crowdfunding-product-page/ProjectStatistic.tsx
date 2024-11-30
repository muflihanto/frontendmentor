import Card from "./Card";

export default function Statistic() {
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
    <Card className="mt-[26px] py-[27px] lg:px-12 lg:pb-[36px] lg:pt-[43px]">
      <div className="lg:flex lg:gap-12">
        {statisticData.map((el, index) => (
          <Data
            value={el}
            key={`${el.h} ${el.p}`}
            hr={index < statisticData.length - 1}
          />
        ))}
      </div>
      <Progress value="89914" target="100000" />
    </Card>
  );
}

type DataProps = {
  hr: boolean;
  value: {
    h: string;
    p: string;
  };
};
const Data = (props: DataProps) => {
  const { h, p } = props.value;
  return (
    <div className="text-center lg:flex lg:flex-1 lg:justify-between lg:text-left">
      <div>
        <h1 className="text-[32px] font-bold text-crowdfunding-neutral-200">
          {h}
        </h1>
        <p className="mt-[3px] text-[14px] font-medium text-crowdfunding-neutral-100/70 lg:mt-[2px] lg:text-[15px]">
          {p}
        </p>
      </div>
      {props.hr && (
        <hr className="mx-auto mb-[19px] mt-[22px] w-[80px] border-t-2 lg:m-0 lg:mt-1 lg:h-[64px] lg:w-[2px] lg:border-l-2 lg:border-t-0" />
      )}
    </div>
  );
};

type ProgressProps = { value: string; target: string };
const Progress = (props: ProgressProps) => {
  return (
    <div className="relative mx-auto mb-[12px] mt-[30px] h-[12px] w-[calc(100%-48px)] overflow-hidden rounded-full bg-crowdfunding-neutral-100/10 lg:mt-[34.5px] lg:w-full">
      <div
        className="absolute top-0 h-full w-[200px] rounded-full bg-crowdfunding-primary-100"
        style={{
          width: `${(Number(props.value) / Number(props.target)) * 100}%`,
        }}
      />
    </div>
  );
};
