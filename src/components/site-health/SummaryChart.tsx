import React from "react";
import {
  CrUxHistoryJson,
  HistogramTimes,
  MetricHistogram,
  MetricHistogramKeys,
} from "./CruxHistoryTypes";
import { getMetricSetFromKey } from "./CrUxHistoryGraphMulti";
import MetricBenchmarkScoreIndicator from "./MetricBenchmarkScoreIndicator";
import { PsiDistribution, PsiCategory } from "./siteHealthTypes";
import WebVitalStatic, {
  WebVitalStaticProps,
} from "./metrics-card/WebVitalStatic";

export default function SummaryChart({
  dataSets,
  metricKey,
}: {
  dataSets: CrUxHistoryJson[];
  metricKey: MetricHistogramKeys;
}) {
  const { average, slow } = getThresholds(
    getMetricSetFromKey(dataSets[0], metricKey)[0],
  );

  const scoreIndex = -1;
  const localeMetrics = getLocaleMetrics(
    dataSets,
    metricKey,
    slow,
    average,
    scoreIndex,
  );
  const isCls = metricKey === "cumulative_layout_shift";
  const benchMarkScores = [
    {
      title: "UK",
      value: localeMetrics["UK"].percentiles.at(-1) || 0,
    },
    {
      title: "ROW",
      value: localeMetrics["ROW"].percentiles.at(-1) || 0,
    },
  ];
  return (
    <section className="grid p-2 md:p-4 w-full mx-auto">
      <div className="flex flex-wrap gap-2 justify-between">
        {Object.entries(localeMetrics).map((entry, index) => (
          <WebVitalStatic
            key={`${index} vital`}
            metricScores={entry[1]}
            title={entry[0]}
          />
        ))}
      </div>
      <MetricBenchmarkScoreIndicator
        goodThreshold={average}
        poorThreshold={slow}
        unit={isCls ? "" : "ms"}
        scores={benchMarkScores}
      />
    </section>
  );
}
function getThresholds(metricHistogram: MetricHistogram) {
  const average = Number(metricHistogram.histogramTimeseries[0].end) || 0;
  const slow = Number(metricHistogram.histogramTimeseries[1].end) || 0;
  // const maximum = slow + slow - average;
  return { average, slow };
}
function getLocaleMetrics(
  dataSets: CrUxHistoryJson[],
  metricKey: MetricHistogramKeys,
  slow: number,
  average: number,
  scoreIndex: number,
) {
  const localeKeys = ["UK", "ROW"];
  const reducer: Record<string, WebVitalStaticProps> = {};
  return localeKeys.reduce((acc, curr, index) => {
    const metric = dataSets[index][0].record.metrics[metricKey];

    acc[curr] = {
      percentiles: metric.percentilesTimeseries.p75s,
      distributions: histogramTimeseriesToPsiDistribution(
        metric.histogramTimeseries,
        scoreIndex,
      ),
      categories: metric.percentilesTimeseries.p75s.map((score) =>
        getLocaleRating(score, slow, average),
      ),
      xIndex: scoreIndex,
    };

    return acc;
  }, reducer);
}
function histogramTimeseriesToPsiDistribution(
  input: HistogramTimes[],
  scoreIndex: number,
): PsiDistribution[] {
  return input.map((histogram) => {
    return {
      min: histogram.start,
      max: histogram.end || undefined,
      proportion: Number(histogram.densities.at(scoreIndex)),
    };
  });
}
function getLocaleRating(
  latestScore: number,
  slow: number,
  average: number,
): PsiCategory {
  const ratingsArray: PsiCategory[] = ["SLOW", "AVERAGE", "FAST"];
  const latestRating =
    latestScore > slow
      ? ratingsArray[0]
      : latestScore > average
        ? ratingsArray[1]
        : ratingsArray[2];
  return latestRating;
}
