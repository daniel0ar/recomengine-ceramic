"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RateMovies } from "./RateMovies";
import { ShowRecomm } from "./ShowRecomm";
import { Overview } from "./Overview";

const Process = () => {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const getComponent = () => {
    switch (step) {
      case 0:
        return <Overview></Overview>;
      case 1:
        return <RateMovies></RateMovies>;
      case 1:
        return <ShowRecomm></ShowRecomm>;
      default:
        return <></>;
    }
  };

  const handlePrevius = () => {
    setStep(step - 1);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  return (
        <div className="grid grod-rows-process h-[100vh]">
          {getComponent()}

          <footer
            className={`flex items-center px-20 pb-4 border-t-4 border-t-gray-300 ${
              step > 0 ? "justify-between" : "justify-end"
            }`}
          >
            {step >= 1 && (
              <button
                className="py-3 mt-5 px-10 text-d3prop-light-black shadow-inner shadow-slate-300 hover:bg-gray-800 text-base font-medium rounded-md"
                onClick={handlePrevius}
              >
                Back
              </button>
            )}
            {step !== 0 ? (
              <button
                className="bg-indigo-500 py-3 mt-5 px-10 text-white hover:bg-indigo-300  text-base font-medium rounded-md"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button
                className="bg-indigo-500 py-3 mt-5 px-5 text-white text-base font-medium rounded-md hover:bg-indigo-300"
                onClick={handleNext}
              >
                Start
              </button>
            )}
          </footer>
        </div>
  );
};

export default Process;
