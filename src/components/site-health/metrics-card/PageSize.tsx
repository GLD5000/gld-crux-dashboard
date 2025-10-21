"use client";
import React from "react";
import { PsiResults } from "../siteHealthTypes";
import { KIBIBYTE_MULTIPLIER } from "./siteHealthConstants";
import useSizePercentage from "./usePercentage";
import TricolourBarPlot, { barColours } from "./TricolourBarPlot";
import { useQueryParams } from "@/utils/searchParamsURL";

export default function PageSize({ payloadNumber }: { payloadNumber: number }) {
  const [percentageString, incrementPercentageString] =
    useSizePercentage(payloadNumber);
  const [viewMode, setViewMode] = useQueryParams("view", "All");

  if (!payloadNumber) return null;
  const maxPercentageNumber = Math.round(
    (payloadNumber / (5000 * KIBIBYTE_MULTIPLIER)) * 100,
  );
  const ratingColour =
    maxPercentageNumber > 50
      ? barColours.poor
      : maxPercentageNumber > 32
        ? barColours.average
        : barColours.good;
  return (
    <div className="bg-transparent text-black dark:text-white border-none text-base w-full h-fit leading-[0.8] text-left py-0 px-1 gap-[3px] grid max-w-150 mx-auto">
      <button
        className="bg-transparent border-none text-base leading-[0.8] text-left p-0 m-0 "
        type="button"
        onClick={() => {
          if (viewMode === "Size") {
            setViewMode("All");
          } else {
            setViewMode("Size");
          }
        }}
      >
        <span className="mr-auto leading-none text-black dark:text-white">{`Page Size`}</span>
      </button>
      <button
        className="grid gap-[3px] bg-transparent border-none text-base leading-[0.8] text-left p-0 m-0"
        type="button"
        onClick={incrementPercentageString}
      >
        <div className="flex justify-between w-full align-middle">
          <div
            className={`${ratingColour} h-3 w-3 ${ratingColour === "bg-green-400" ? "rounded-full" : "rounded-none"}`}
          ></div>
          <span className="block ml-auto dark:text-neutral-400 text-neutral-500 leading-[0.7] mt-[0.2em]">
            {percentageString}
          </span>
        </div>
        <TricolourBarPlot
          bars={[0.32, 0.18, 0.5]}
          pointer={maxPercentageNumber}
        />
      </button>
    </div>
  );
}
export function getPayloadNumber(dataIn: PsiResults) {
  const payloadMatch = dataIn.audits
    ? dataIn.audits["total-byte-weight"]?.displayValue?.match(/([0-9,]+)/)
    : null;
  const payloadNumber = payloadMatch
    ? Number(payloadMatch[0].replaceAll(",", "")) * KIBIBYTE_MULTIPLIER
    : undefined;
  return payloadNumber;
}
