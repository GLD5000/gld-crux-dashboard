import React from "react";

const colourStrings: Record<string, string> = {
  grey: "bg-neutral-400 dark:bg-neutral-400",
  green: "bg-green-400",
  yellow: "bg-amber-400",
  red: "bg-red-400",
};

export const barColours: Record<string, string> = {
  "n/a": colourStrings.grey,
  passed: colourStrings.green,
  progressing: colourStrings.green,
  fast: colourStrings.green,
  good: colourStrings.green,
  regressing: colourStrings.yellow,
  average: colourStrings.yellow,
  failed: colourStrings.red,
  slow: colourStrings.red,
  poor: colourStrings.red,
};
export default function TricolourBarPlot({
  bars,
  pointer = 75,
  hideIndicator = false,
}: {
  bars?: number[];
  pointer?: number;
  hideIndicator?: boolean;
}) {
  const barColoursArray = [
    barColours.good,
    barColours.average,
    barColours.poor,
  ];
  return (
    <div className="h-[20px] w-[96%] mx-auto relative grid  items-end">
      <div className="flex w-full h-[5px] gap-[2px] mb-[4px]">
        {bars && !bars.some((value) => isNaN(value)) ? (
          barColoursArray.map((colour, index) => (
            <div
              style={{ flexGrow: bars[index] }}
              key={`${colour}-${index}`}
              className={colour}
            ></div>
          ))
        ) : (
          <div style={{ flexGrow: 1 }} className="bg-neutral-500"></div>
        )}
        {!hideIndicator && (
          <div
            style={{
              left: `${Math.min(pointer, 100)}%`,
            }}
            className={`w-[16px] h-[16px] translate-x-[-7px] top-0 absolute box-border grid justify-center ${pointer > 100 ? "text-red-600 dark:text-red-500 " : "text-[#00000067] dark:text-[#ffffffcc]"}`}
          >
            <div className="border-2 border-solid border-current rounded-full w-[8px] h-[8px] box-border"></div>
            <div className="bg-current  w-[2px]  h-[8px] box-border mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
}
