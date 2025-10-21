"use client";
import { useQueryParamsToggle } from "@/utils/searchParamsURL";
import React from "react";
import LinePath from "./LinePath";
import DataPoints from "./DataPoints";

export default function SparklineSingle({
  dataSet,
  maximum,
  minimum,
  stroke = "stroke-blue-500",
  fill = "fill-blue-500",
  opacity = "opacity-100",
  width,
  xIndex,
  showPoints,
}: {
  dataSet: number[];
  maximum?: number;
  minimum?: number;
  stroke?: string;
  fill?: string;
  opacity?: string;
  width: number;
  xIndex?: number;
  showPoints: boolean;
}) {
  const [lineStyle] = useQueryParamsToggle("ls", ["point", "cma", "line"]);
  const presentMaximum = maximum || Math.max(...dataSet);
  const presentMinimum = minimum || 0;
  const coordsArray = getCoordsArray(
    lineStyle === "cma" ? getCumulativeMovingAverage(dataSet) : dataSet,
    presentMinimum,
    presentMaximum,
    width,
  );
  const coordsArrayPoints = getCoordsArray(
    dataSet,
    presentMinimum,
    presentMaximum,
    width,
  );
  return (
    <>
      <LinePath
        xyArray={coordsArray}
        stroke={stroke}
        opacity={opacity}
        isThick={false}
        isTrendLine={lineStyle === "line"}
      />
      {(lineStyle === "point" || showPoints) && (
        <DataPoints
          xyArray={coordsArrayPoints}
          fill={fill}
          opacity={opacity}
          xIndex={xIndex}
        />
      )}
    </>
  );
}

function getCoordsArray(
  dataSet: number[],
  minimum: number,
  maximum: number,
  width: number,
) {
  const lengthOfSet = dataSet.length - 1;
  const coordsArray: string[][] = [];
  dataSet.forEach((yValue, index) => {
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
function getCumulativeMovingAverage(numberArray: number[]) {
  return numberArray.reduce(
    (acc, curr, index) => {
      acc.total += Number(curr);
      const average = acc.total / (index + 1);
      acc.array.push(average);

      return acc;
    },
    { array: [] as number[], total: 0 },
  ).array;
}
