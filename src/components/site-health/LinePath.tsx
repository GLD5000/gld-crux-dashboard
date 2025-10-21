import { getLinearRegressionLine } from "@/utils/dataUtils";
import React from "react";

export default function LinePath({
  xyArray,
  stroke,
  opacity,
  isThick = false,
  isTrendLine = false,
  fill,
}: {
  xyArray: string[][];
  stroke: string;
  opacity: string;
  isThick?: boolean;
  isTrendLine?: boolean;
  fill?: string;
}) {
  const coordString = getCoordsString(
    isTrendLine ? getLinearRegressionLine(xyArray) : xyArray,
  );
  return (
    <path
      fillOpacity="0.25"
      vectorEffect="non-scaling-stroke"
      className={`w-full h-auto p-0 m-0 ${isThick ? "stroke-[2.5px]" : "stroke-[1.5px]"} ${stroke} ${fill ? `${fill}` : "fill-none"} ${opacity}`}
      d={coordString}
    ></path>
  );
}
function getCoordsString(xyArray: string[][]) {
  let coordsString = "";
  xyArray.forEach((entry, index) => {
    const [xValue, yValue] = entry;
    coordsString += `${index ? " L " : "M "}${xValue},${yValue}`;
  });
  return coordsString;
}
