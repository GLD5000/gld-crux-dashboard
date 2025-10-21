import React from "react";
import MetricsTable, { MetricsTableProps } from "./MetricsTable";
import { CrUxHistoryJson, MetricHistogram } from "./CruxHistoryTypes";
import { getMetricSetFromKey } from "./CrUxHistoryGraphMulti";
import { capitaliseFirstLetter } from "@/utils/stringUtils";
import { getSlope } from "@/utils/dataUtils";
import TrendDataField from "./TrendDataField";
import MetricScoreDataField from "./MetricScoreDataField";

export default function CrUxMetricsTable({
  dataSets,
  metricKey,
}: {
  dataSets: CrUxHistoryJson[];
  metricKey: string;
}) {
  const { average, slow } = getThresholds(
    getMetricSetFromKey(dataSets[0], metricKey)[0],
  );
  const weeks = dataSets[0][0].record.collectionPeriods.length;
  const tableRows = getRelevantDataSets(dataSets, metricKey);
  const unit = metricKey !== "cumulative_layout_shift" ? "ms" : "%";
  const { overallCurrent, overallAverage, overallTrend } =
    getFooterValues(tableRows);
  const tableData: MetricsTableProps = {
    columnFunctions: {
      trend: TrendDataField,
      current: MetricScoreDataField(
        {
          goodThreshold: average,
          poorThreshold: slow,
        },
        unit,
      ),
      average: MetricScoreDataField(
        {
          goodThreshold: average,
          poorThreshold: slow,
        },
        unit,
      ),
    },
    columnData: {
      device: { type: "string", title: "Device" },
      trend: { type: "string", title: `${weeks}wk Trend` },
      average: { type: "number", title: `${weeks}wk Average` },
      current: {
        type: "number",
        title: "Current",
        // className: `${standardText}`,
      },
    },
    tableRows: tableRows,
    tableFooter: {
      device: "Overall",
      average: overallAverage,
      trend: overallTrend,
      current: overallCurrent,
    },
    // tableCaption: 'LCP load time by device.',
  };
  return <MetricsTable data={tableData} />;
}

function getRelevantDataSets(dataSets: CrUxHistoryJson[], metricKey: string) {
  const deviceSuffixes = getDeviceSuffixes(dataSets[0]);
  const localeKeys = ["UK", "ROW"];
  const accumulator: Record<string, string>[] = [];
  return dataSets.reduce((acc, curr, outerIndex) => {
    const metricSet = getMetricSetFromKey(curr, metricKey);
    const miniAccumulator: Record<string, string>[] = [];
    acc.push(
      ...metricSet.reduce((acc, curr, innerIndex) => {
        const device = `${localeKeys[outerIndex]} ${deviceSuffixes[innerIndex]}`;
        const current = curr.percentilesTimeseries.p75s.at(-1);
        const returnObject: Record<string, string> = {
          device,
          current: `${current}`,
          average: `${getAverage(curr.percentilesTimeseries.p75s)}`,
          trend: `${getSlope(curr.percentilesTimeseries.p75s)}`,
        };
        acc.push(returnObject);
        return acc;
      }, miniAccumulator),
    );
    return acc;
  }, accumulator);
}

function getDeviceSuffixes(dataSet: CrUxHistoryJson) {
  return dataSet.map((data) =>
    data.record.key.formFactor
      ? capitaliseFirstLetter(data.record.key.formFactor)
      : "All",
  );
}

function getAverage(p75: number[]) {
  return p75.reduce(
    (acc, curr, index, arr) => {
      acc.sum += Number(curr);
      if (index === arr.length - 1) {
        acc.average = acc.sum / arr.length;
      }
      return acc;
    },
    { sum: 0, average: 0 },
  ).average;
}
function getThresholds(metricHistogram: MetricHistogram) {
  const average = Number(metricHistogram.histogramTimeseries[0].end) || 0;
  const slow = Number(metricHistogram.histogramTimeseries[1].end) || 0;
  // const maximum = slow + slow - average;
  return { average, slow };
}

function getFooterValues(tableRows: Record<string, string>[]) {
  return tableRows.reduce((acc, curr) => {
    const isAll = curr.device && curr.device.indexOf("All") > -1;
    if (isAll) {
      if (acc.overallCurrent === undefined) {
        acc.overallCurrent = curr.current;
      } else {
        acc.overallCurrent = `${0.5 * (Number(acc.overallCurrent) + Number(curr.current))}`;
      }
      if (acc.overallAverage === undefined) {
        acc.overallAverage = curr.average;
      } else {
        acc.overallAverage = `${0.5 * (Number(acc.overallAverage) + Number(curr.average))}`;
      }
      if (acc.overallTrend === undefined) {
        acc.overallTrend = curr.trend;
      } else {
        acc.overallTrend = `${0.5 * (Number(acc.overallTrend) + Number(curr.trend))}`;
      }
    }
    return acc;
  }, {});
}
