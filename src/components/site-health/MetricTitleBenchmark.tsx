import React from "react";
import { TypographyP } from "../ui/typography";

const ratings = ["GOOD", "NEEDS IMPROVEMENT", "POOR"];
const bgColours = ["bg-green-400", "bg-amber-400", "bg-red-400"];

export default function MetricTitleBenchmark({
  goodThreshold = "2500ms",
  poorThreshold = "4000ms",
}: {
  goodThreshold?: string;
  poorThreshold?: string;
}) {
  return (
    <div className="grid grid-cols-3 w-fit h-fit m-auto">
      {ratings.map((text, index) => (
        <div
          key={`${index}-${text}`}
          className={`w-full h-full m-auto grid ${bgColours[index]}`}
        >
          <TypographyP className="grid h-fit my-auto mx-auto py-2 px-1 md:px-2 text-xs md:text-sm">
            {text.split(" ").map((word) => (
              <span
                className="w-fit h-fit block text-center mx-auto text-black font-bold leading-[1.1]"
                key={`${word}`}
              >
                {word}
              </span>
            ))}
          </TypographyP>
        </div>
      ))}
      <div className="relative w-full h-12 col-span-3">
        <div
          className={`w-[16px] h-[16px] translate-x-[-50%] left-[33.3%] top-[-4px] absolute box-border grid justify-center text-black dark:text-white`}
        >
          <div className="border-2 border-solid border-current rounded-full w-[8px] h-[8px] box-border bg-current mx-auto"></div>
          <div className="bg-current  w-[2px]  h-[8px] box-border mx-auto"></div>
          <TypographyP className="my-0 text-inherit dark:text-inherit">
            {goodThreshold}
          </TypographyP>
        </div>
        <div
          className={`w-[16px] h-[16px] translate-x-[-50%] left-[66.6%] top-[-4px] absolute box-border grid justify-center text-black dark:text-white`}
        >
          <div className="border-2 border-solid border-current rounded-full w-[8px] h-[8px] box-border bg-current mx-auto"></div>
          <div className="bg-current  w-[2px]  h-[8px] box-border mx-auto"></div>
          <TypographyP className="my-0 text-inherit dark:text-inherit">
            {poorThreshold}
          </TypographyP>
        </div>
      </div>
      {/* <div className='w-full h-full m-auto bg-green-500 text-center align-middle'>Good</div>
          <div className='w-full h-full m-auto bg-orange-500 text-center align-middle'>Needs<br/> Improvement</div>
          <div className='w-full h-full m-auto bg-red-500 text-center align-middle'>Poor</div> */}
    </div>
  );
}
