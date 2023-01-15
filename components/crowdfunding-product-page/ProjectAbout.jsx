import Card from "./Card";
import supportType from "./supportType.json";

export default function About(props) {
  return (
    <Card className="px-[23px] pt-[38px] pb-[39px] mt-6">
      <h2 className="font-bold text-[18px]">About this project</h2>
      <p className="text-crowdfunding-neutral-100/75 font-medium text-[14px] mt-[22px] leading-[24px]">
        The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform that elevates your screen to a more comfortable viewing height. Placing your monitor at eye level has the potential to improve your posture and make you more comfortable while at work, helping you stay focused on the task at hand.
      </p>
      <p className="text-crowdfunding-neutral-100/75 font-medium text-[14px] mt-[25px] -tracking-[0.01px] leading-[24px]">Featuring artisan craftsmanship, the simplicity of design creates extra desk space below your computer to allow notepads, pens, and USB sticks to be stored under the stand.</p>
      <div className="mt-[34px] flex flex-col gap-[24px]">
        {supportType.map((el, index) => {
          if (index > 0) {
            return (
              <Reward
                key={index}
                data={el}
                value={index}
                openSelectionModal={props.openSelectionModal}
              />
            );
          }
        })}
      </div>
    </Card>
  );
}

function Reward({ data, value, openSelectionModal }) {
  const { name, startsFrom, details, stock } = data;
  return (
    <div className={`px-[23px] pt-[21px] border rounded-lg pb-[23px] ${stock === 0 && "opacity-50 select-none"}`}>
      <h3 className="font-bold text-[14px]">{name}</h3>
      <p className="font-medium text-crowdfunding-primary-100 text-[14px] mt-1">Pledge ${startsFrom} or more</p>
      <p className="text-[14px] text-crowdfunding-neutral-100/80 font-medium mt-[23px] leading-[24px]">{details}</p>
      <p className="flex items-center gap-[8px] mt-5">
        <span className="text-[32px] font-bold">{stock}</span>
        <span className="text-crowdfunding-neutral-100/75 text-[15px] font-medium">left</span>
      </p>
      <button
        className={`text-white/90 mt-[19px] rounded-full font-bold text-[14px] w-[157px] h-[48px] ${stock === 0 ? "bg-crowdfunding-neutral-100/75 cursor-default" : "bg-crowdfunding-primary-100"}`}
        value={value}
        onClick={openSelectionModal}
        disabled={stock === 0}
      >
        {stock === 0 ? "Out of Stock" : "Select Reward"}
      </button>
    </div>
  );
}
