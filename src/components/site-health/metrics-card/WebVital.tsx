"use client";
import React from "react";
import {
  PsiDistribution,
  PsiMetricScores,
  PsiResults,
} from "../siteHealthTypes";
import { KIBIBYTE_MULTIPLIER } from "./siteHealthConstants";
import TricolourBarPlot from "./TricolourBarPlot";
import MetricScoreSection from "./MetricScoreSection";
import { useQueryParams, useQueryParamsToggle } from "@/utils/searchParamsURL";

export default function WebVital({
  metricScores,
  title,
  hideIndicator = false,
}: {
  metricScores: PsiMetricScores;
  title: string;
  hideIndicator?: boolean;
}) {
  const [viewMode, setViewMode] = useQueryParams("view", "All");
  const [vitalsMode, setVitalsMode] = useQueryParamsToggle("vitals", [
    "Score",
    "Rating",
  ]);
  const { percentile, distributions, category } = metricScores || {};
  const distributionBars =
    typeof percentile === "number" ? getBars(distributions) : undefined;
  const titleObject = title.split("_").reduce(titleReducer, {
    titleString: "",
    letterString: "",
  });
  const { letterString, titleString } = titleObject;
  return (
    <div className="bg-transparent text-black dark:text-white border-none text-base h-fit leading-[0.8] text-left py-0 px-1 gap-[3px] grid w-full max-w-150 mx-auto">
      <button
        className="bg-transparent text-black dark:text-white border-none text-base leading-[0.8] text-left p-0 cursor-pointer"
        type="button"
        onClick={() => {
          if (viewMode === letterString) {
            setViewMode("All");
          } else {
            setViewMode(letterString);
          }
        }}
      >
        <span className="block mr-auto leading-none">{titleString}</span>
      </button>
      <button
        className="grid gap-[3px] bg-transparent border-none text-base leading-[0.8] text-left p-0 m-0"
        type="button"
        onClick={() => {
          setVitalsMode();
        }}
      >
        <MetricScoreSection
          category={category}
          score={typeof percentile === "number" ? `${percentile}` : "N/A"}
          vitalsMode={vitalsMode}
        />
        <TricolourBarPlot
          bars={distributionBars}
          hideIndicator={hideIndicator}
        />
      </button>
    </div>
  );
}
export function getPayloadNumber(dataIn: PsiResults) {
  const payloadMatch = dataIn.audits
    ? dataIn.audits["total-byte-weight"].displayValue?.match(/([0-9,]+)/)
    : null;
  const payloadNumber = payloadMatch
    ? Number(payloadMatch[0].replaceAll(",", "")) * KIBIBYTE_MULTIPLIER
    : undefined;
  return payloadNumber;
}
function titleReducer(
  acc: {
    titleString: string;
    letterString: string;
  },
  curr: string,
  index: number,
  arr: string[],
) {
  const isInteractionTo = curr === "TO" && index === 1;
  const initial = isInteractionTo ? "" : curr[0];
  const titleWord =
    curr === "UK" || curr === "ROW"
      ? curr
      : isInteractionTo
        ? curr.toLocaleLowerCase()
        : initial + curr.slice(1).toLocaleLowerCase();
  if (curr === "EXPERIMENTAL" || curr === "MS" || curr === "SCORE") {
    return acc;
  } else if (index === arr.length - 1) {
    return {
      titleString: acc.titleString + " " + titleWord,
      letterString: acc.letterString + initial,
    };
  } else {
    acc.letterString += initial;
    acc.titleString += " " + titleWord;
  }

  return acc;
}

function getBars(distIn: PsiDistribution[]) {
  return distIn.map((distribution) => distribution.proportion);
}
