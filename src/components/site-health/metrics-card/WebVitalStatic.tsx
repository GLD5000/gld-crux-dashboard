"use client";
import React from "react";
import { PsiCategory, PsiDistribution, PsiResults } from "../siteHealthTypes";
import { KIBIBYTE_MULTIPLIER } from "./siteHealthConstants";
import TricolourBarPlot from "./TricolourBarPlot";
import MetricScoreSectionVerbose from "./MetricScoreSectionVerbose";
import SparklineSmallSingle from "../SparklineSmallSingle";
import {
  crUxHistoryGraphFills,
  crUxHistoryGraphStrokes,
} from "../CrUxHistoryGraph";

export interface WebVitalStaticProps {
  percentiles: number[];
  distributions: PsiDistribution[];
  categories: PsiCategory[];
  xIndex: number | undefined;
}

export default function WebVitalStatic({
  metricScores,
  title,
}: {
  metricScores: WebVitalStaticProps;
  title: string;
}) {
  const { xIndex, percentiles, distributions, categories } = metricScores || {};
  const percentile =
    xIndex !== undefined
      ? Number(percentiles.at(xIndex))
      : Number(percentiles.at(-1));
  console.assert(typeof percentile === "number", percentile);
  const category =
    xIndex !== undefined ? categories.at(xIndex) : categories.at(-1);
  const distributionBars =
    typeof percentile === "number" ? getBars(distributions) : undefined;
  const titleString = title;
  const deviceIndexLookup: Record<string, number> = {
    UK: 0,
    ROW: 1,
    "UK Desktop": 3,
    "UK Phone": 1,
    "ROW Desktop": 3,
    "ROW Phone": 1,
  };
  return (
    <div className="bg-transparent text-black dark:text-white border-none text-base h-fit leading-[0.8] text-left py-0 px-1 gap-[3px] grid w-full max-w-150 md:max-w-[calc(50%-8px)] mx-auto">
      <div className="grid gap-[3px] bg-transparent border-none text-base leading-[0.8] text-left p-0 m-0">
        <MetricScoreSectionVerbose
          device={titleString}
          category={category}
          score={typeof percentile === "number" ? `${percentile}` : "N/A"}
        />
        <TricolourBarPlot bars={distributionBars} hideIndicator={true} />
        <SparklineSmallSingle
          percentiles={percentiles}
          stroke={crUxHistoryGraphStrokes[deviceIndexLookup[title]]}
          fill={crUxHistoryGraphFills[deviceIndexLookup[title]]}
          xIndex={xIndex}
        />
      </div>
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
function getBars(distIn: PsiDistribution[]) {
  return distIn.map((distribution) => distribution.proportion);
}
