import React from "react";
import { CrUxHistoryJson, MetricHistogramKeys } from "./CruxHistoryTypes";
import { mutedBorder, mutedText } from "../ui/twStrings";
import MetricIntro from "./titleCardComponents/MetricIntro";
import MetricTitle from "./titleCardComponents/MetricTitle";
import SummaryChart from "./SummaryChart";

export default function MetricSummaryCard({
  dataSets,
  metricKey,
}: {
  dataSets: CrUxHistoryJson[];
  metricKey: MetricHistogramKeys;
}) {
  return (
    <div
      className={`grid w-full max-w-160 h-fit p-2 md:p-4 gap-4 rounded-lg border ${mutedBorder} border-solid bg-transparent ${mutedText}`}
    >
      <MetricTitle metricKey={metricKey} />
      <MetricIntro metricKey={metricKey} />

      <div className="grid gap-4 w-full h-fit my-auto mx-auto">
        <SummaryChart dataSets={dataSets} metricKey={metricKey} />
      </div>
    </div>
  );
}
