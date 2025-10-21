import React from "react";
import { barColours } from "./TricolourBarPlot";

// export const barColours = {
//     good: 'bg-green-400',
//     average: 'bg-amber-400',
//     poor: 'bg-red-400',
// };
export default function TricolourBarPlotReverse({
  bars,
  pointer = 75,
}: {
  bars?: number[];
  pointer?: number;
}) {
  const barColoursArray = [
    barColours.poor,
    barColours.average,
    barColours.good,
  ];
  return (
    <div className="h-[20px] w-[96%] mx-auto relative grid  align-bottom">
      <div className="flex w-full h-[5px] gap-[2px] mb-[4px]">
        {bars ? (
          barColoursArray.map((colour, index) => (
            <div
              style={{ flexGrow: bars[index] }}
              key={`${colour}-${index}`}
              className={colour}
            ></div>
          ))
        ) : (
          <div
            style={{ flexGrow: 1 }}
            className="bg-neutral-300 dark:bg-neutral-200"
          ></div>
        )}
        <div
          style={{
            left: `${Math.min(pointer, 100)}%`,
          }}
          className={`w-[16px] h-[16px] translate-x-[-7px] top-0 absolute box-border grid justify-center ${pointer > 100 ? "text-red-600 dark:text-red-500 " : "text-[#00000067] dark:text-[#ffffffcc]"}`}
        >
          <div className="border-2 border-solid border-current rounded-full w-[8px] h-[8px] box-border"></div>
          <div className="bg-current  w-[2px]  h-[8px] box-border mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
