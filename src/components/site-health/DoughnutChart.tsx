import { cn } from "@/utils/tailwind/twUtils";
import React, { ComponentProps } from "react";
import { standardBg } from "../ui/twStrings";
import { crUxHistoryHexCodes } from "./CrUxHistoryGraph";
import CrUxHistoryKey from "./CrUxHistoryKey";
import { useQueryParamsNumber } from "@/utils/searchParamsURL";

interface DoughnutChartParams extends ComponentProps<"div"> {
  sections: { name: string; percentage: number }[];
}

export default function DoughnutChart({
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
      <div
        style={{
          background: `${generatePieGradient(sections, deviceSelected)}`,
        }}
        className={cn(
          "w-fit aspect-square rounded-full p-2 grid items-center mx-auto",
          className,
        )}
        onClick={() => {
          setDeviceSelected(-1);
        }}
      >
        <div
          className={`w-fit min-w-[6.25em] text-xs aspect-square rounded-full grid items-center p-4 ${standardBg}`}
        >
          <span className="block w-fit text-xs mx-auto">
            {percentageString || children}
          </span>
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
  let rotation = 0;
  const returnString = sections.reduce((acc, curr, index, arr) => {
    const colourString =
      deviceSelected === index || deviceSelected === -1
        ? crUxHistoryHexCodes[index]
        : `${crUxHistoryHexCodes[index]}55`;
    const currString = `${index !== 0 ? ", " : ""}${colourString} ${rotation}%, ${colourString} ${rotation + curr.percentage}%`;
    rotation += curr.percentage;
    return `${acc + currString}${index === arr.length - 1 ? ")" : ""}`;
  }, "conic-gradient("); //radial-gradient(circle at center, white 0, white 40%, transparent 40%, transparent 100%),
  return returnString;
}
