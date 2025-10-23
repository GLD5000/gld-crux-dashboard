import React from "react";
import { CrUxHistoryJson, MetricHistogramKeys } from "./CruxHistoryTypes";
import DisparityChart from "./DisparityChart";
import { mutedText } from "../ui/twStrings";

export default function MetricDisparityCard({
  dataSets,
  metricKey,
}: {
  dataSets: CrUxHistoryJson[];
  metricKey: MetricHistogramKeys;
}) {
  return (
    <div
      className={`grid w-full max-w-160 h-fit p-2 md:p-4 gap-4  bg-transparent ${mutedText}`}
    >
      <div className="grid gap-4 w-full h-fit my-auto mx-auto">
        <DisparityChart dataSets={dataSets} metricKey={metricKey} />
      </div>
    </div>
  );
}
