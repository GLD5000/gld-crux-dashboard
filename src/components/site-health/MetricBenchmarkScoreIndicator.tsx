import React from "react";
import { TypographyP } from "../ui/typography";

const ratings = ["GOOD", "NEEDS IMPROVEMENT", "POOR"];
const bgColours = ["bg-green-400", "bg-amber-400", "bg-red-400"];

export default function MetricBenchmarkScoreIndicator({
  goodThreshold,
  poorThreshold,
  unit,
  scores,
}: {
  goodThreshold: number;
  poorThreshold: number;
  unit: string;
  scores: { title: string; value: number }[];
}) {
  console.assert(unit !== undefined, `Unit: ${unit}`);
  return (
    <div className="grid grid-cols-3 w-full h-fit m-auto">
      <div className="relative w-full h-8 col-span-3">
        <div
          className={`w-fit h-fit translate-x-[-50%] bottom-[-4px] absolute box-border grid justify-center text-black dark:text-white`}
          style={{
            left: calculateLeftPercentage(
              goodThreshold,
              poorThreshold,
              scores[0].value,
            ),
          }}
        >
          <TypographyP className="my-0 text-inherit dark:text-inherit text-sm">
            {scores[0].title}
          </TypographyP>
          <div className="bg-current  w-[2px]  h-[8px] box-border mx-auto"></div>
          <div className="border-2 border-solid border-current rounded-full w-[8px] h-[8px] box-border bg-current mx-auto"></div>
        </div>
      </div>
      {ratings.map((text, index) => (
        <div
          key={`${index}-${text}`}
          className={`w-full h-6 m-auto grid ${bgColours[index]}`}
        ></div>
      ))}
      <div className="relative w-full h-8 col-span-3">
        <div
          className={`w-fit h-fit translate-x-[-50%]  top-[-4px] absolute box-border grid justify-center text-black dark:text-white`}
          style={{
            left: calculateLeftPercentage(
              goodThreshold,
              poorThreshold,
              scores[1].value,
            ),
          }}
        >
          <div className="border-2 border-solid border-current rounded-full w-[8px] h-[8px] box-border bg-current mx-auto"></div>
          <div className="bg-current  w-[2px]  h-[8px] box-border mx-auto"></div>
          <TypographyP className="my-0 text-inherit dark:text-inherit text-sm">
            {scores[1].title}
          </TypographyP>
        </div>
      </div>
      {/* <div className='w-full h-full m-auto bg-green-500 text-center align-middle'>Good</div>
          <div className='w-full h-full m-auto bg-orange-500 text-center align-middle'>Needs<br/> Improvement</div>
          <div className='w-full h-full m-auto bg-red-500 text-center align-middle'>Poor</div> */}
    </div>
  );
}

function calculateLeftPercentage(
  goodThreshold: number,
  poorThreshold: number,
  score: number,
) {
  let decimal;
  if (score <= goodThreshold) {
    decimal = score / goodThreshold / 3;
  } else if (score <= poorThreshold) {
    decimal =
      1 / 3 + (score - goodThreshold) / (poorThreshold - goodThreshold) / 3;
  } else {
    decimal =
      2 / 3 +
      (score - (goodThreshold + poorThreshold)) /
        (poorThreshold - goodThreshold) /
        3;
  }
  return `${Math.round(decimal * 100)}%`;
}
