import { useState } from "react";
import Card from "./Card";
import supportType from "./supportType.json";

export default function SelectionModal(props) {
  const [selected, setSelected] = useState(props.initialSelection || "");
  const [pledge, setPledge] = useState(props.initialSelection ? supportType[props.initialSelection].startsFrom : 0);

  return (
    <div
      className="font-commissioner fixed top-0 left-0 flex pt-[121px] pb-[120px] justify-center w-screen h-full bg-black/50 lg:py-[min(184px,calc(184/800*100vh))] overflow-scroll"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          props.close();
        }
      }}
    >
      <Card className="px-6 pt-[29px] pb-[32px] overflow-visible h-fit lg:px-12 lg:pt-[45.5px] lg:pb-[49px]">
        <CardHeader handleClose={props.close} />
        <form
          className="flex flex-col mt-[25px] gap-[26px] group lg:mt-[36px]"
          onSubmit={props.submit}
        >
          {supportType.map((el, index) => {
            return (
              <div
                key={index}
                className={`px-[24px] pt-[21px] rounded-lg first:pt-8 first:pb-[31px] ring-1 -outline-offset-1 group lg:px-[28px] lg:first:pt-[30px] lg:pt-[30px] lg:pb-[31.5px] ${el.stock !== 0 && index === selected ? "outline ring-crowdfunding-primary-100 outline-crowdfunding-primary-100 ring-inset outline-2 pb-[23px] lg:pb-[23px]" : "ring-crowdfunding-neutral-100/30 pb-[29px]"} ${
                  el.stock === 0 && "opacity-50"
                }`}
              >
                <div className="flex flex-col justify-between items-start lg:grid lg:grid-cols-[repeat(2,minmax(0,1fr))_auto] lg:grid-flow-row lg:auto-rows-auto">
                  <RadioInput
                    el={el}
                    index={index}
                    selected={selected}
                    onChange={() => {
                      setSelected(index);
                      setPledge(el.startsFrom);
                    }}
                  />
                  <Details>{el.details}</Details>
                  {el.stock >= 0 && <Stock value={el.stock} />}
                </div>
                {el.stock !== 0 && index === selected && (
                  <Continue
                    el={el}
                    pledge={pledge}
                    onChange={(e) => {
                      setPledge(parseInt(e.target.value));
                    }}
                  />
                )}
              </div>
            );
          })}
        </form>
      </Card>
    </div>
  );
}

const Details = ({ children }) => {
  return <p className="group-first:mt-[33px] mt-[22px] leading-[24px] text-[14px] font-medium text-crowdfunding-neutral-100/80 lg:pl-[48px] lg:text-[15px] lg:group-first:mt-[10px] lg:mt-[10px] lg:leading-[28px] lg:tracking-[-0.025px] lg:col-start-1 lg:col-span-3">{children}</p>;
};

const CardHeader = ({ handleClose }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-[18px] lg:text-[24px]">Back this project</h2>
        <button
          className="pt-[1px] lg:-translate-y-[25px] lg:translate-x-[17px]"
          onClick={handleClose}
        >
          <svg
            width="15"
            height="15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.314 0l2.828 2.828L9.9 7.071l4.243 4.243-2.828 2.828L7.07 9.9l-4.243 4.243L0 11.314 4.242 7.07 0 2.828 2.828 0l4.243 4.242L11.314 0z"
              fill="#000"
              fillRule="evenodd"
              opacity=".4"
            />
          </svg>
        </button>
      </div>
      <p className="text-[14px] font-medium mt-[22px] text-crowdfunding-neutral-100/75 leading-[24px] lg:mt-[15px] lg:text-[16px]">Want to support us in bringing Mastercraft Bamboo Monitor Riser out in the world?</p>
    </div>
  );
};

const Stock = ({ value }) => {
  return (
    <p className="flex gap-2 mt-[21px] items-center lg:mt-0 lg:row-start-1 lg:col-start-3 lg:-translate-y-1">
      <span className="font-bold text-[18px]">{value}</span>
      <span className="font-medium text-crowdfunding-neutral-100/75 text-[15px]">left</span>
    </p>
  );
};

const RadioInput = ({ el, index, selected, onChange }) => {
  return (
    <label
      htmlFor={`reward${index}`}
      className={`${el.stock !== 0 && "hover:cursor-pointer"} flex items-center gap-4 lg:gap-6 lg:items-start lg:col-span-2 group/label`}
    >
      <input
        type="radio"
        value={index}
        name="reward"
        id={`reward${index}`}
        checked={el.stock && el.stock > 0 && index === selected}
        className="hidden peer/reward"
        onChange={onChange}
        disabled={el.stock === 0}
      />
      <div className={`flex items-center justify-center w-6 bg-white border rounded-full aspect-square peer-checked/reward:before:rounded-full peer-checked/reward:before:h-3 peer-checked/reward:before:w-3 peer-checked/reward:before:bg-crowdfunding-primary-100 lg:mt-[4px] ${el.stock !== 0 && "group-hover/label:text-crowdfunding-primary-100"}`} />
      <div className="lg:flex lg:items-center lg:gap-4">
        <h3 className={`font-bold text-[14px] lg:text-[16px] ${el.stock !== 0 && "group-hover/label:text-crowdfunding-primary-100"}`}>{el.name}</h3>
        {el.startsFrom > 0 && <p className={`font-bold text-[14px] text-crowdfunding-primary-100/75 mt-1 lg:mt-0 lg:text-[16px] ${el.stock !== 0 && "group-hover/label:text-crowdfunding-primary-100"}`}>Pledge ${el.startsFrom} or more</p>}
      </div>
    </label>
  );
};

const Continue = ({ el, pledge, onChange }) => {
  return (
    <div className="mt-[22px] lg:mt-[31px]">
      <hr className="border-t-2 w-[calc(100%+46px)] -translate-x-[23px]" />
      <div className="lg:flex lg:justify-between lg:items-center lg:mt-[24px]">
        <p className="text-center mt-[27px] text-[14px] text-crowdfunding-neutral-100/75 font-medium lg:text-[15px] lg:mt-0">Enter your pledge</p>
        <div className="grid grid-rows-1 grid-flow-col auto-cols-auto mt-[19px] h-[48px] items-center justify-between lg:gap-4 lg:mt-0">
          <label
            htmlFor="pledge"
            className="flex items-center h-full gap-2 rounded-full ring-2 place-self-start w-[100px] ring-crowdfunding-neutral-100/20 ring-inset lg:w-[102px] focus-within:ring-crowdfunding-primary-100/50"
          >
            <span className="pl-6 font-bold text-[14px] text-crowdfunding-neutral-100/75">$</span>
            <input
              id="pledge"
              name="pledge"
              type="number"
              min={el.startsFrom}
              value={pledge}
              onChange={onChange}
              className="w-[50%] h-[24px] font-bold text-[14px] rounded-full focus-within:outline-none bg-none"
            />
          </label>
          <button className="text-[14px] font-bold text-white/75 h-full rounded-full bg-crowdfunding-primary-100 w-[115px] pb-[2px] lg:w-[107px] hover:bg-crowdfunding-primary-200">Continue</button>
        </div>
      </div>
    </div>
  );
};
