import React from "react";
import MetricTitle from "./titleCardComponents/MetricTitle";
import MetricIntro from "./titleCardComponents/MetricIntro";
import MetricFacts from "./titleCardComponents/MetricFacts";

export default function MetricTitleCard({
  metricKey = "cumulative_layout_shift",
}: {
  metricKey?: string;
}) {
  return (
    <div className="grid w-full max-w-160 h-fit mx-auto md:p-4 gap-4">
      <MetricTitle metricKey={metricKey} />
      <MetricIntro metricKey={metricKey} />
      <MetricFacts metricKey={metricKey} />
    </div>
  );
}
