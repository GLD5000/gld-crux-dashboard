import React from "react";
import MetricTitleCard from "../MetricTitleCard";
import CrUxHistoryGraphMulti from "../CrUxHistoryGraphMulti";
import { MetricHistogramKeys, CrUxHistoryJson } from "../CruxHistoryTypes";
import CrUxMetricsTable from "../CrUxMetricsTable";
import MetricDisparityCard from "../MetricDisparityCard";

export default function StandardMetricContent({
  metricKey,
  dataSets,
}: {
  metricKey: MetricHistogramKeys;
  dataSets: CrUxHistoryJson[];
}) {
  return (
    <>
      <MetricTitleCard metricKey={metricKey} />
      <MetricDisparityCard dataSets={dataSets} metricKey={metricKey} />
      <CrUxHistoryGraphMulti dataSets={dataSets} metricKey={metricKey} />
      <CrUxMetricsTable dataSets={dataSets} metricKey={metricKey} />
    </>
  );
}
