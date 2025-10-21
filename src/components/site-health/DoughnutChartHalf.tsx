import { cn } from "@/utils/tailwind/twUtils";
import React, { ComponentProps } from "react";
import { standardBg } from "../ui/twStrings";
import { crUxHistoryHexCodes } from "./CrUxHistoryGraph";
import CrUxHistoryKey from "./CrUxHistoryKey";
import { useQueryParamsNumber } from "@/utils/searchParamsURL";

interface DoughnutChartParams extends ComponentProps<"div"> {
  sections: { name: string; percentage: number }[];
}

export default function DoughnutChartHalf({
  sections,
  className,
  children,
  ...props
}: DoughnutChartParams) {
  const [deviceSelected, setDeviceSelected] = useQueryParamsNumber("dds", -1);
  const percentageString =
    deviceSelected !== -1
      ? `${sections[deviceSelected].percentage}%` //${sections[deviceSelected].name} -
      : undefined;
  const sectionsArray = sections.map((entry) => entry.name);
  return (
    <div className="w-fit mx-auto grid gap-2 p-2 items-centre" {...props}>
      <div className="h-12 w-24 mx-auto overflow-clip p-0">
        <div
          style={{
            background: `${generatePieGradient(sections, deviceSelected)}`,
          }}
          className={cn(
            "w-fit h-auto aspect-square rounded-full p-2 grid items-center mx-auto overflow-clip",
            className,
          )}
          onClick={() => {
            setDeviceSelected(-1);
          }}
        >
          <div
            className={`w-fit h-auto min-w-[6.25em] text-xs aspect-square rounded-full grid items-center p-4 ${standardBg}`}
          >
            <span className="block w-fit text-xs mx-auto pb-4">
              {percentageString || children}
            </span>
          </div>
        </div>
      </div>
      <CrUxHistoryKey
        names={sectionsArray}
        deviceSelected={deviceSelected}
        setDeviceSelected={setDeviceSelected}
      />
    </div>
  );
}
function generatePieGradient(
  sections: { name: string; percentage: number }[],
  deviceSelected: number,
) {
  let rotation = 50;
  const returnString = sections.reduce((acc, curr, index, arr) => {
    const colourString =
      deviceSelected === index || deviceSelected === -1
        ? crUxHistoryHexCodes[index]
        : `${crUxHistoryHexCodes[index]}55`;
    const currString = `${index !== 0 ? ", " : ""}${colourString} ${rotation}%, ${colourString} ${rotation + curr.percentage / 2}%`;
    rotation += curr.percentage / 2;
    return `${acc + currString}${index === arr.length - 1 ? ")" : ""}`;
  }, "conic-gradient(from 90deg, rgb(0, 0, 0,0) 0%, rgb(0, 0, 0,0) 50%, "); //radial-gradient(circle at center, black 0, black 56%, transparent 58%, transparent 100%),
  return returnString;
}
