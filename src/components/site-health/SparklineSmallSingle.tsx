import React from "react";
import LinePath from "./LinePath";
import DataPointSingle from "./DataPointSingle";

export default function SparklineSmallSingle({
  percentiles,
  stroke,
  fill,
  xIndex,
}: {
  percentiles: number[];
  stroke: string;
  fill: string;
  xIndex?: number | undefined;
}) {
  const width = 1500;
  const height = 100;
  const presentMaximum = Math.max(...percentiles);
  const presentMinimum = Math.min(...percentiles);

  const coordsArray = getCoordsArray(
    percentiles,
    presentMinimum,
    presentMaximum,
    width,
  );

  return (
    <svg
      className={`w-full h-fit px-4 m-0 overflow-visible`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <LinePath
        xyArray={coordsArray}
        stroke={stroke}
        fill={fill}
        opacity={"opacity-100"}
        isThick
      />
      <DataPointSingle
        xyArray={coordsArray}
        fill={fill}
        opacity={"opacity-100"}
        xIndex={xIndex}
      />
    </svg>
  );
}
function getCoordsArray(
  percentiles: number[],
  minimum: number,
  maximum: number,
  width: number,
) {
  const lengthOfSet = percentiles.length - 1;
  const coordsArray: string[][] = [];
  percentiles.forEach((yValue, index) => {
    const xPercentage = index
      ? getPercentage(index, lengthOfSet) * (width / 100)
      : 0;
    const yPercentage = 100 - getPercentage(yValue, maximum, minimum);
    coordsArray.push([`${xPercentage}`, `${yPercentage}`]);
  });
  return coordsArray;
}

function getPercentage(value: number, maximum: number, minimum = 0) {
  return Math.min(
    100,
    Math.max(0, ((value - minimum) / (maximum - minimum)) * 100),
  );
}
