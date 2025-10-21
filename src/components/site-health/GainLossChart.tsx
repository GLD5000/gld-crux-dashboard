import React from "react";
import { mutedBorderBottom, mutedBorderY } from "../ui/twStrings";
import { VerticalAxisSpan } from "./SparkLines";

export default function GainLossChart({
  input,
  xIndex,
  setXIndex,
}: {
  input: number[];
  xIndex?: number | undefined;
  setXIndex?: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
  const { min, max, range } = getMinMaxRange(input);
  const barWidth = `${100 / input.length}%`;
  return (
    <div className={`grid grid-cols-[auto_1fr] py-2 box-border`}>
      <div className="h-full w-fit row-start-1 col-start-1 relative grid align-middle group">
        <div className="h-full w-fit bg-none transition grid ml-auto align-top">
          <VerticalAxisSpan>{max}</VerticalAxisSpan>
        </div>
        <div className="h-full w-fit bg-none transition grid ml-auto align-middle">
          <VerticalAxisSpan>{0}</VerticalAxisSpan>
        </div>
        <div className="h-full w-fit bg-none transition grid ml-auto align-bottom">
          <VerticalAxisSpan> {min}</VerticalAxisSpan>
        </div>
      </div>
      <div
        className={`h-full w-full row-start-1 col-start-2 grid align-middle group p-0 m-0 border border-solid border-transparent ${mutedBorderY}`}
        style={{
          gridTemplateRows: `1fr 1fr`,
        }}
      >
        <div
          className={`h-full w-full bg-none grid p-0 m-0 border border-solid border-transparent ${mutedBorderBottom}`}
        ></div>
      </div>
      <div className="flex gap-[2px] md:gap-2 h-20 align-middle row-start-1 col-start-2 m-0 box-border">
        {input.map((value, index) => {
          const isPositive = value >= 0;
          const barHeight = `${100 * (Math.abs(value) / range)}%`;
          const top = isPositive ? "top-[unset]" : "top-[50%]";
          const bottom = isPositive ? "bottom-[50%]" : "bottom-[unset]";
          const bgColour = isPositive ? "bg-red-500" : "bg-green-500";
          return (
            <div
              className="relative h-full cursor-pointer"
              key={`${index}`}
              style={{ width: barWidth }}
              onClick={() => {
                if (xIndex === index && setXIndex) {
                  setXIndex(undefined);
                } else if (setXIndex) {
                  setXIndex(index);
                }
              }}
              onMouseOver={() => {
                if (xIndex === index && setXIndex) {
                  setXIndex(undefined);
                } else if (setXIndex) {
                  setXIndex(index);
                }
              }}
              onBlur={() => {
                if (setXIndex) setXIndex(undefined);
              }}
            >
              <div
                className={`absolute w-full ${bgColour} ${top} ${bottom} text-center text-black`}
                style={{ height: barHeight }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getMinMaxRange(numberArray: number[]) {
  const min = Math.min(...numberArray);
  const max = Math.max(...numberArray);
  const maxBound = Math.max(Math.abs(min), max);
  const range = maxBound * 2;
  return { min: 0 - maxBound, max: maxBound, range };
}
