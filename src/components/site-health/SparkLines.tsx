"use client";
import { useQueryParamsBoolean } from "@/utils/searchParamsURL";
import React, { MouseEvent, ReactNode } from "react";
import SparklineSingle from "./SparklineSingle";
import {
  crUxHistoryGraphFills,
  crUxHistoryGraphStrokes,
} from "./CrUxHistoryGraph";
import { mutedBorderBottom, mutedBorderY, mutedText } from "../ui/twStrings";

export default function SparkLines({
  dataSets,
  maximum,
  average,
  slow,
  deviceSelected,
  setDeviceSelected,
  ratingsArray,
  xyIndex,
  setXyIndex,
}: {
  dataSets: number[][];
  maximum: number;
  average: number;
  slow: number;
  deviceSelected: number;
  setDeviceSelected: (value: number) => void;  
  ratingsArray: string[];
  xyIndex?: number[];
  setXyIndex: React.Dispatch<React.SetStateAction<number[] | undefined>>;
}) {
  const [zoom] = useQueryParamsBoolean("zs", true);
  const maxNumber = zoom
    ? dataSets.reduce((acc, curr) => {
        const max = Math.max(...curr);
        if (max > acc) {
          acc = max;
        }
        return acc;
      }, 0)
    : maximum;
  const minNumber = zoom
    ? dataSets.reduce((acc, curr) => {
        const min = Math.min(...curr);
        if (min < acc) {
          acc = min;
        }
        return acc;
      }, 10000)
    : 0;
  const width = 300;
  const height = 100;
  const hideSlowGridline = maxNumber < slow;
  const hideAverageGridline = maxNumber < average;
  const hideFastRating = minNumber >= average;
  const averageHeight = hideAverageGridline
    ? 0
    : height - ((average - minNumber) / (maxNumber - minNumber)) * height;
  const slowHeight = hideSlowGridline
    ? 0
    : height - ((slow - minNumber) / (maxNumber - minNumber)) * height;
  return (
    <div
      className={`grid grid-cols-[auto_1fr_auto]  w-full h-auto overflow-clip border border-solid ${mutedBorderY} border-x-transparent py-2`}
    >
      {zoom ? (
        <div className="h-full w-fit row-start-1 col-start-1 relative grid align-middle group">
          <div className="h-full w-fit bg-none transition grid ml-auto align-top">
            <VerticalAxisSpan>{maxNumber}</VerticalAxisSpan>
          </div>
          <div className="h-full w-fit bg-none transition grid ml-auto align-middle">
            <VerticalAxisSpan>
              {maxNumber < 1
                ? Math.round(
                    100 * (0.5 * (maxNumber - minNumber) + minNumber),
                  ) / 100
                : Math.round(0.5 * (maxNumber - minNumber) + minNumber)}
            </VerticalAxisSpan>
          </div>
          <div className="h-full w-fit bg-none transition grid ml-auto align-bottom">
            <VerticalAxisSpan> {minNumber}</VerticalAxisSpan>
          </div>
        </div>
      ) : (
        <div
          className="h-full w-fit row-start-1 col-start-1 relative grid align-middle group"
          style={{
            gridTemplateRows: `${slowHeight}% ${averageHeight - slowHeight}% 1fr`,
          }}
        >
          <div className="h-full w-fit bg-none transition grid align-bottom ml-auto">
            <VerticalAxisSpan> {slow}</VerticalAxisSpan>
          </div>
          <div className="h-full w-fit bg-none transition grid align-bottom ml-auto">
            <VerticalAxisSpan> {average}</VerticalAxisSpan>
          </div>
          <div className="h-full w-fit bg-none transition grid align-bottom ml-auto">
            <VerticalAxisSpan> {minNumber}</VerticalAxisSpan>
          </div>
        </div>
      )}
      <div
        className="h-full w-full row-start-1 col-start-2 grid align-middle group p-0 m-0"
        style={{
          gridTemplateRows: `${slowHeight}% ${averageHeight - slowHeight}% 1fr`,
        }}
      >
        <div
          className={`h-full w-full bg-none grid p-0 m-0 ${hideSlowGridline ? "border-none" : `border border-solid border-transparent ${mutedBorderBottom}`}`}
        ></div>
        <div
          className={`h-full w-full bg-none grid p-0 m-0 ${hideAverageGridline ? "border-none" : `border border-solid border-transparent ${mutedBorderBottom}`}`}
        ></div>
        <div className="h-full w-full bg-none grid p-0 m-0 "></div>
      </div>

      <svg
        className={`w-full h-auto p-0 m-0 row-start-1 col-start-2 col-span-1 overflow-visible cursor-crosshair`}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        onMouseDown={(e) => {
          const overrideIndex = getOverrideIndex(
            e,
            minNumber,
            maxNumber,
            dataSets,
          );
          setDeviceSelected(overrideIndex[1]);
          setXyIndex(overrideIndex);
        }}
        // onMouseMove={(e) => {
        //     const overrideIndex = getOverrideIndex(
        //         e,
        //         minNumber,
        //         maxNumber,
        //         dataSets
        //     );
        //     setDeviceSelected(overrideIndex[1]);
        //     setXyIndex(overrideIndex);
        // }}
      >
        {dataSets.map((dataSet, index) => (
          <SparklineSingle
            width={width}
            key={`${index}-sparkline`}
            dataSet={dataSet}
            stroke={crUxHistoryGraphStrokes[index]}
            fill={crUxHistoryGraphFills[index]}
            opacity={
              deviceSelected !== -1 && deviceSelected !== index
                ? "opacity-30"
                : "opacity-100"
            }
            maximum={maxNumber}
            minimum={minNumber}
            xIndex={xyIndex && xyIndex[1] === index ? xyIndex[0] : undefined}
            showPoints={!!xyIndex}
          />
        ))}
      </svg>
      <div
        className="h-full w-fit row-start-1 col-start-3 relative grid align-middle group"
        style={{
          gridTemplateRows: `${slowHeight}% ${averageHeight - slowHeight}% 1fr`,
        }}
      >
        <div className="h-full w-fit bg-none transition grid mr-auto align-middle">
          <VerticalAxisSpan>
            {!hideSlowGridline && ratingsArray[0]}
          </VerticalAxisSpan>
        </div>
        <div className="h-full w-fit bg-none transition grid mr-auto align-middle">
          <VerticalAxisSpan>
            {!hideAverageGridline && ratingsArray[1]}
          </VerticalAxisSpan>
        </div>
        <div className="h-full w-fit bg-none transition grid mr-auto align-middle">
          <VerticalAxisSpan>
            {!hideFastRating && ratingsArray[2]}
          </VerticalAxisSpan>
        </div>
      </div>
    </div>
  );
}

function getOverrideIndex(
  e: MouseEvent,
  minimum: number,
  maximum: number,
  dataSets: number[][],
) {
  const [x, y] = getXyDecimal(e);
  const yValue = minimum + y * (maximum - minimum);
  const dataLength = dataSets[0].length;
  const xIndex = Math.round((dataLength - 1) * x);
  const yIndex = getYIndex(dataSets, xIndex, yValue);
  return [xIndex, yIndex];
}
function getXyDecimal(e: MouseEvent) {
  const rect = e.currentTarget.getBoundingClientRect();
  const y = (rect.height - (e.clientY - rect.top)) / rect.height;
  const x = (e.clientX - rect.left) / rect.width;
  return [x, y];
}
function getYIndex(dataSets: number[][], xIndex: number, yValue: number) {
  const yValues = dataSets.map((set) => set[xIndex]);
  const yDiffs = yValues.map((value) => Math.abs(yValue - value));
  const minDiffIndex = yDiffs.indexOf(Math.min(...yDiffs));
  return minDiffIndex;
}
export function VerticalAxisSpan({ children }: { children: ReactNode }) {
  return (
    <span
      className={`block w-fit px-[3px] h-fit ${mutedText} transition text-xs`}
    >
      {children}
    </span>
  );
}
