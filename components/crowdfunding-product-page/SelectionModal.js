import { useState } from "react";
import Card from "./Card";
import supportType from "./supportType.json";

export default function SelectionModal(props) {
  const [selected, setSelected] = useState("");
  return (
    <div className="absolute top-0 left-0 flex pt-[121px] justify-center w-screen h-screen bg-black/50">
      <Card className="h-full px-6 py-[29px] overflow-scroll">
        <div>
          <h2 className="font-bold text-[18px]">Back this project</h2>
          <p className="text-[14px] font-medium mt-[22px] text-crowdfunding-neutral-100/75 leading-[24px]">Want to support us in bringing Mastercraft Bamboo Monitor Riser out in the world?</p>
        </div>
        <form className="flex flex-col mt-[25px] gap-[26px] group">
          {supportType.map((el, index) => {
            return (
              <div
                key={index}
                className={`px-[24px] pt-[21px] pb-[23px] rounded-lg first:pt-8 first:pb-[31px] ring-1 -outline-offset-1 group ${selected === index ? "outline ring-crowdfunding-primary-100 outline-crowdfunding-primary-100  ring-inset outline-2" : "ring-crowdfunding-neutral-100/30"}`}
                tabIndex={0}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    value={index}
                    name="reward"
                    id={`reward${index}`}
                    checked={index === selected}
                    className="hidden peer/reward"
                  />
                  <div className="flex items-center justify-center w-6 bg-white border rounded-full aspect-square peer-checked/reward:bg-crowdfunding-primary-100 peer-checked/reward:bg-clip-content peer-checked/reward:p-[5px]"></div>
                  <label
                    htmlFor={`reward${index}`}
                    className="hover:cursor-pointer"
                    onClick={() => {
                      setSelected(index);
                    }}
                  >
                    <h3 className="font-bold text-[14px]">{el.name}</h3>
                    {el.startsFrom > 0 && <p className="font-bold text-[14px] text-crowdfunding-primary-100/75 mt-1">Pledge ${el.startsFrom} or more</p>}
                  </label>
                </div>
                <p className="group-first:mt-[33px] mt-[22px] leading-[24px] text-[14px] font-medium text-crowdfunding-neutral-100/80">{el.details}</p>
                {el.stock >= 0 && (
                  <p className="flex gap-2 mt-[21px] items-center">
                    <span className="font-bold text-[18px]">{el.stock}</span>
                    <span className="font-medium text-crowdfunding-neutral-100/75 text-[15px]">left</span>
                  </p>
                )}
                {selected === index && (
                  <div className="mt-[22px]">
                    <hr className="border-t-2 w-[calc(100%+46px)] -translate-x-[23px]" />
                    <p className="text-center mt-[27px] text-[14px] text-crowdfunding-neutral-100/75 font-medium">Enter your pledge</p>
                    <div className="grid grid-rows-1 grid-cols-2 mt-[19px] h-[48px] items-center justify-between">
                      <label
                        htmlFor="pledge"
                        className="flex items-center h-full gap-2 rounded-full ring-2 place-self-start w-[100px] ring-crowdfunding-neutral-100/20 ring-inset"
                      >
                        <span className="pl-6 font-bold text-[14px] text-crowdfunding-neutral-100/75">$</span>
                        <input
                          id="pledge"
                          name="pledge"
                          type="number"
                          min={el.startsFrom}
                          defaultValue={el.startsFrom}
                          className="w-[50%] h-[24px] font-bold text-[14px] rounded-full focus-within:outline-none bg-none"
                        />
                      </label>
                      <button className="text-[14px] font-bold text-white/75 h-full rounded-full bg-crowdfunding-primary-100">Continue</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </form>
      </Card>
    </div>
  );
}
