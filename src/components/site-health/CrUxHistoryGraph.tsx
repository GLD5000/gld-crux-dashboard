"use client";
import React from "react";
import { CrUxHistoryJson, MetricHistogram } from "./CruxHistoryTypes";
import SparkLines from "./SparkLines";
import CrUxHistoryControls from "./CrUxHistoryControls";
import CrUxHistoryXScale from "./CrUxHistoryXScale";
export const crUxHistoryGraphStrokes = [
  "stroke-blue-500",
  "stroke-cyan-500",
  "stroke-fuchsia-500",
  "stroke-emerald-500",
];
export const crUxHistoryGraphFills = [
  "fill-blue-500",
  "fill-cyan-500",
  "fill-fuchsia-500",
  "fill-emerald-500",
];
export const crUxHistoryGraphBgs = [
  "bg-blue-500",
  "bg-cyan-500",
  "bg-fuchsia-500",
  "bg-emerald-500",
];
export const crUxHistoryHexCodes = ["#3b82f6", "#06b6d4", "#d946ef", "#10b981"];

export default function CrUxHistoryGraph({
  dataSet,
  metricKey = "largest_contentful_paint",
  deviceSelected,
  setDeviceSelected,
  deviceSet,
  metricSet,
  xyIndex,
  setXyIndex,
}: {
  dataSet: CrUxHistoryJson;
  metricKey: string;
  deviceSelected: number;
  setDeviceSelected: (value: number) => void;  
  deviceSet: string[];
  metricSet: MetricHistogram[];
  xyIndex?: number[];
  setXyIndex: React.Dispatch<React.SetStateAction<number[] | undefined>>;
}) {
  if (!dataSet || dataSet === null) return null;
  const { average, slow, maximum } = getThresholds(metricSet[0]);
  const collectionPeriods = dataSet[0].record.collectionPeriods;
  const isCls = metricKey === "cumulative_layout_shift";
  const ratingsArray = isCls
    ? ["Poor", "Avg", "Good"]
    : ["Slow", "Avg", "Fast"];
  return (
    <div
      onMouseLeave={() => {
        if (xyIndex !== undefined) setDeviceSelected(-1);
        setXyIndex(undefined);
      }}
    >
      <CrUxHistoryControls
        names={deviceSet}
        deviceSelected={deviceSelected}
        setDeviceSelected={setDeviceSelected}
        setXyIndex={setXyIndex}
      />
      <SparkLines
        deviceSelected={deviceSelected}
        setDeviceSelected={setDeviceSelected}
        dataSets={getDataSetArray(metricSet)}
        maximum={maximum}
        average={average}
        slow={slow}
        ratingsArray={ratingsArray}
        xyIndex={xyIndex}
        setXyIndex={setXyIndex}
      />

      <CrUxHistoryXScale collectionPeriods={collectionPeriods} />
    </div>
  );
}
function getThresholds(metricHistogram: MetricHistogram) {
  const average = Number(metricHistogram.histogramTimeseries[0].end) || 0;
  const slow = Number(metricHistogram.histogramTimeseries[1].end) || 0;
  const maximum = slow + slow - average;
  return { average, slow, maximum };
}
function getDataSetArray(metricSet: MetricHistogram[]) {
  return metricSet.map((metric) => metric.percentilesTimeseries.p75s);
}
