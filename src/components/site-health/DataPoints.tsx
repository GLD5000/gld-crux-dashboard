import React from "react";

export default function DataPoints({
  xyArray,
  fill,
  opacity,
  xIndex,
}: {
  xyArray: string[][];
  fill: string;
  opacity: string;
  xIndex?: number;
}) {
  return (
    <>
      {xyArray.map((coords, index) => {
        const [x, y] = coords;
        return (
          <circle
            key={`${index}-dot`}
            cx={x}
            cy={y}
            r={xIndex !== undefined && xIndex === index ? 3 : 1.5}
            className={`w-full h-auto m-0 stroke-none ${fill} ${opacity}`}
          />
        );
      })}
    </>
  );
}
