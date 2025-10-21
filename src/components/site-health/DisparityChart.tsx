import React, { useState } from "react";
import GainLossChart from "./GainLossChart";
import {
  CrUxHistoryJson,
  HistogramTimes,
  MetricHistogram,
  MetricHistogramKeys,
} from "./CruxHistoryTypes";
import { mutedText } from "../ui/twStrings";
import { TypographySmall } from "../ui/typography";
import RatingColourPatch from "./metrics-card/RatingColourPatch";
import { ButtonTab } from "../ui/buttons";
import { getOffsetSlope } from "@/utils/dataUtils";
import { getDisparityTrendStatus } from "./cruxUtil";
import {
  getCruxHistoryDates,
  getCruxTitle,
  getMetricSetFromKey,
} from "./CrUxHistoryGraphMulti";
import MetricBenchmarkScoreIndicator from "./MetricBenchmarkScoreIndicator";
import { PsiDistribution, PsiCategory } from "./siteHealthTypes";
import WebVitalStatic, {
  WebVitalStaticProps,
} from "./metrics-card/WebVitalStatic";
import { useQueryParamsNumber } from "@/utils/searchParamsURL";

type LocaleType = "UK" | "ROW";
export default function DisparityChart({
  dataSets,
  metricKey,
  // focus = 'UK',
}: {
  dataSets: CrUxHistoryJson[];
  metricKey: MetricHistogramKeys;
  // focus?: FocusType;
}) {
  const [focus, setFocus] = useState("Locale");
  const [xIndex, setXIndex] = useState<undefined | number>(undefined);
  const [dataSelected, setDataSelected] = useQueryParamsNumber("ds", 0);
  const [_, setDeviceSelected] = useQueryParamsNumber("ks", -1); //eslint-disable-line
  const { average, slow } = getThresholds(
    getMetricSetFromKey(dataSets[0], metricKey)[0],
  );

  const xyIndex = xIndex ? [xIndex, 0] : undefined;
  const scoreIndex = xIndex === undefined ? -1 : xIndex;
  const { firstScoreDate, latestScoreDate } = getCruxHistoryDates(
    dataSets[0],
    xyIndex,
  );
  const locale = focus.startsWith("UK") || focus === "Locale" ? "UK" : "ROW";
  const isLocaleMode = focus === "Locale";
  const localeMetrics = isLocaleMode
    ? getLocaleMetrics(dataSets, metricKey, slow, average, scoreIndex)
    : getDeviceMetrics(dataSets, metricKey, slow, average, locale, scoreIndex);

  const latestScoreDateString = getLatestScoreDateRange(
    xIndex,
    firstScoreDate,
    latestScoreDate,
  );
  const comparisonString = isLocaleMode
    ? `amazon UK vs ROW`
    : `amazon ${locale} Desktop vs Phone`;
  const metricTitle = getCruxTitle(metricKey);

  const titleString = `${metricTitle}`;
  const disparity =
    dataSelected === 0
      ? getLocaleDisparity(dataSets, metricKey, locale, dataSelected)
      : getDeviceDisparity(dataSets, metricKey, locale, dataSelected);
  const rating = getDisparityRating(disparity, scoreIndex);
  const isCls = metricKey === "cumulative_layout_shift";
  const latestScore = getLatestScore(isCls, disparity, scoreIndex);
  const scoreSuffix = getScoreSuffix(latestScore);
  const unit = getUnit(isCls);
  const trendSlope = getOffsetSlope(disparity);
  const trendTitle = getDisparityTrendStatus(trendSlope);
  // const disparityDescriptor = getDescriptor(isCls, latestScore);
  const scoreString = `${scoreSuffix}${latestScore}${unit} - ${trendTitle}`;
  const benchMarkScores = isLocaleMode
    ? [
        {
          title: "UK",
          value:
            localeMetrics["UK"].percentiles.at(
              xIndex === undefined ? -1 : xIndex,
            ) || 0,
        },
        {
          title: "ROW",
          value:
            localeMetrics["ROW"].percentiles.at(
              xIndex === undefined ? -1 : xIndex,
            ) || 0,
        },
      ]
    : [
        {
          title: `${locale} Desktop`,
          value:
            localeMetrics[`${locale} Desktop`].percentiles.at(
              xIndex === undefined ? -1 : xIndex,
            ) || 0,
        },
        {
          title: `${locale} Phone`,
          value:
            localeMetrics[`${locale} Phone`].percentiles.at(
              xIndex === undefined ? -1 : xIndex,
            ) || 0,
        },
      ];
  return (
    <section
      className="grid p-2 md:p-4 w-full mx-auto"
      onMouseLeave={() => {
        setXIndex(undefined);
      }}
    >
      <div className="w-fit flex gap-0 mb-2 mx-0 align-middle text-xs font-Avenir-light">
        {["Locale", "UK - Device", "ROW - Device"].map((value, index) => (
          <ButtonTab
            key={`${value}${index}`}
            selected={dataSelected === index}
            onClick={(e) => {
              e.currentTarget.focus();
            }}
            onFocus={() => {
              setFocus(value);
              setDataSelected(index);
              setDeviceSelected(-1);
            }}
          >
            {value}
          </ButtonTab>
        ))}
      </div>
      <div className="w-fit text-base text-black dark:text-white">
        {titleString}
      </div>

      <div className="w-fit text-2xl text-black dark:text-white flex align-middle gap-1">
        <RatingColourPatch rating={rating} />
        {scoreString}
      </div>
      <TypographySmall className={`${mutedText}`}>
        {comparisonString}{" "}
        <span className="text-sm">{latestScoreDateString}</span>
      </TypographySmall>
      <GainLossChart input={disparity} xIndex={xIndex} setXIndex={setXIndex} />
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
function getUnit(isCls: boolean) {
  return isCls ? "%" : "ms";
}
function getScoreSuffix(latestScore: number) {
  return latestScore > 0 ? "+" : "";
}
function getLatestScore(
  isCls: boolean,
  disparity: number[],
  scoreIndex: number,
) {
  return isCls
    ? Math.round(Number(disparity?.at(scoreIndex)) * 100)
    : Number(disparity?.at(scoreIndex));
}
function getDisparityRating(disparity: number[], scoreIndex: number) {
  return Number(disparity?.at(scoreIndex)) <= 0 ? "Good" : "Average";
}
function getLocaleDisparity(
  dataSets: CrUxHistoryJson[],
  metricKey: MetricHistogramKeys,
  locale: LocaleType,
  dataSelected: number,
) {
  const focusIndex = dataSelected;
  const secondaryIndex = locale === "UK" ? 1 : 0;
  const disparity = dataSets[focusIndex][0].record.metrics[
    metricKey
  ].percentilesTimeseries.p75s.map(
    (focusValue, index) =>
      focusValue -
      dataSets[secondaryIndex][0].record.metrics[metricKey]
        .percentilesTimeseries.p75s[index],
  );
  return disparity;
}
function getDeviceDisparity(
  dataSets: CrUxHistoryJson[],
  metricKey: MetricHistogramKeys,
  locale: LocaleType,
  dataSelected: number,
  device = "Desktop",
) {
  const localeIndex = dataSelected - 1;
  const primaryIndex = device === "Desktop" ? 3 : 1;
  const secondaryIndex = device === "Desktop" ? 1 : 3;
  const disparity = dataSets[localeIndex][primaryIndex].record.metrics[
    metricKey
  ].percentilesTimeseries.p75s.map(
    (focusValue, index) =>
      focusValue -
      dataSets[localeIndex][secondaryIndex].record.metrics[metricKey]
        .percentilesTimeseries.p75s[index],
  );
  return disparity;
}
function getLatestScoreDateRange(
  xyIndex: number | undefined,
  firstScoreDate: string,
  latestScoreDate: string,
): React.ReactNode {
  return `(${xyIndex !== undefined ? `${firstScoreDate} - ` : ""}${latestScoreDate})`;
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
function getDeviceMetrics(
  dataSets: CrUxHistoryJson[],
  metricKey: MetricHistogramKeys,
  slow: number,
  average: number,
  locale: string,
  scoreIndex: number,
) {
  const localeKeys = [`${locale} Desktop`, `${locale} Phone`];
  const localeIndex = locale === "UK" ? 0 : 1;
  const reducer: Record<string, WebVitalStaticProps> = {};
  return localeKeys.reduce((acc, curr, index) => {
    const deviceKey = index === 0 ? 3 : 1;
    const metric = dataSets[localeIndex][deviceKey].record.metrics[metricKey];

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
