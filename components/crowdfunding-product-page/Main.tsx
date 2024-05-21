import {
  type MouseEvent,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
  createContext,
} from "react";
import About from "./ProjectAbout";
import Overview from "./ProjectOverview";
import Statistic from "./ProjectStatistic";
import SelectionModal from "./SelectionModal";
import SuccessModal from "./SuccessModal";
import Modals from "./Modals";

export type SuppportContext =
  | {
      selectedOption: number | undefined;
      setSelectedOption: Dispatch<SetStateAction<number | undefined>>;
    }
  | undefined;
const SuppporContext = createContext<SuppportContext>(undefined);

export default function Main() {
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number>();

  useEffect(() => {
    if (isSelectionModalOpen || isSuccessModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSelectionModalOpen, isSuccessModalOpen]);

  const openSelectionModal = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const targetValue = e.currentTarget.value;
    targetValue !== "" && setSelectedOption(Number(targetValue));
    setIsSelectionModalOpen(true);
  }, []);

  return (
    <SuppporContext.Provider value={{ selectedOption, setSelectedOption }}>
      <div className="relative -top-14 lg:-top-[92px] lg:pb-[33px]">
        <Overview openSelectionModal={openSelectionModal} />
        <Statistic />
        <About openSelectionModal={openSelectionModal} />
        <Modals>
          {isSelectionModalOpen && (
            <SelectionModal
              close={() => {
                setIsSelectionModalOpen(false);
              }}
              submit={(e) => {
                e.preventDefault();
                setIsSelectionModalOpen(false);
                setIsSuccessModalOpen(true);
              }}
              {...{ selectedOption, setSelectedOption }}
            />
          )}
          {isSuccessModalOpen && (
            <SuccessModal
              close={() => {
                setIsSuccessModalOpen(false);
              }}
            />
          )}
        </Modals>
      </div>
    </SuppporContext.Provider>
  );
}
