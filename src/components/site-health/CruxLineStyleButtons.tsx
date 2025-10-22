"use client";
import { useQueryParamsToggle } from "@/utils/searchParamsURL";
import React from "react";

export default function CruxLineStyleButtons() {
  const [lineStyle, setLineStyle] = useQueryParamsToggle("ls", [
    "point",
    "cma",
    "line",
  ]);

  return (
    <div className="grid grid-cols-[auto_auto] gap-2 align-middle w-fit h-6 p-0 m-0 text-inherit bg-transparent border-none">
      <div className="flex gap-2">
        <LineStyleButton
          setLineStyle={setLineStyle}
          lineStyle={lineStyle}
          path={"M0,8 q 8,-3 16,1"}
          value={"cma"}
        />{" "}
        <LineStyleButton
          setLineStyle={setLineStyle}
          lineStyle={lineStyle}
          path={"M0,9 l 4,-4 l 4,6 l 4,-6 l 4,4"}
          value={"point"}
        />{" "}
        <LineStyleButton
          setLineStyle={setLineStyle}
          lineStyle={lineStyle}
          path={"M0,6 l 16,4"}
          value={"line"}
        />
      </div>
      <div
        // onClick={() => {
        //     setLineStyle();
        // }}
        className="grid align-middle w-[4.5em] h-6 m-0 p-1 bg-transparent rounded border-none  text-neutral-500 dark:text-neutral-400"
      >
        <span className="text-xs text-gray-700 transition dark:text-gray-300">
          {lineStyle === "cma"
            ? "Moving Avg."
            : lineStyle === "point"
              ? "Data Points"
              : "Trend Line"}
        </span>
      </div>
    </div>
  );
}
function LineStyleButton({
  setLineStyle,
  lineStyle,
  path,
  value,
}: {
  setLineStyle: (value?: string) => void;
  lineStyle: string;
  path: string;
  value: string;
}) {
  return (
    <button
      className="m-0 p-0 bg-transparent border-none focus-visible:border-none rounded-full w-6 h-6 scale-100 outline-none"
      onClick={() => {
        setLineStyle(value);
      }}
    >
      <svg
        tabIndex={0}
        viewBox="0 0 16 16"
        className={`stroke-current stroke-1 fill-none w-full h-full border  border-current rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition hover:text-gray-900 dark:hover:text-gray-50 ${lineStyle === value ? "text-black dark:text-white" : "text-neutral-500 dark:text-neutral-400"}`}
      >
        <path d={path} />
      </svg>
    </button>
  );
}
