import { useCallback, useEffect, useState } from "react";
import About from "./ProjectAbout";
import Overview from "./ProjectOverview";
import Statistic from "./ProjectStatistic";
import SelectionModal from "./SelectionModal";
import SuccessModal from "./SuccessModal";
import Modals from "./Modals";

export default function Main(props) {
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (isSelectionModalOpen || isSuccessModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSelectionModalOpen, isSuccessModalOpen]);

  const openSelectionModal = useCallback((e) => {
    setSelectedOption(parseInt(e.target.value));
    setIsSelectionModalOpen(true);
  }, []);

  return (
    <div className="relative -top-14">
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
            initialSelection={selectedOption}
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
  );
}
