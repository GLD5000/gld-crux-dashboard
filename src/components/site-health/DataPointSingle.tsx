import React from "react";

export default function DataPointSingle({
  xyArray,
  fill,
  opacity,
  xIndex = 5,
}: {
  xyArray: string[][];
  fill: string;
  opacity: string;
  xIndex?: number;
}) {
  return (
    <>
      {xIndex !== undefined && xyArray[xIndex] && (
        <circle
          cx={Number(xyArray[xIndex][0])}
          cy={Number(xyArray[xIndex][1])}
          r={20}
          className={`w-full h-auto m-0 stroke-none ${fill} ${opacity}`}
        />
      )}
    </>
  );
}
