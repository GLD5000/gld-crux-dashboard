"use client";
import React, { useState } from "react";
import {
  CrUxHistoryJson,
  DateTypes,
  MetricHistogram,
} from "./CruxHistoryTypes";
import { capitaliseFirstLetter } from "@/utils/stringUtils";
import CrUxHistoryGraph from "./CrUxHistoryGraph";
import {
  useQueryParamsNumber,
  useQueryParamsToggle,
} from "@/utils/searchParamsURL";
import { getYearShort, monthNumberToName } from "@/utils/dates";
import { ButtonTab } from "../ui/buttons";
import { TypographySmall } from "../ui/typography";
import { mutedBorder, mutedText } from "../ui/twStrings";
import RatingColourPatch from "./metrics-card/RatingColourPatch";
import { getSlope } from "@/utils/dataUtils";
import { getTrendStatus } from "./cruxUtil";

export default function CrUxHistoryGraphMulti({
  dataSets,
  metricKey,
}: {
  dataSets: CrUxHistoryJson[];
  metricKey: string;
}) {
  const [deviceSelected, setDeviceSelected] = useQueryParamsNumber("ks", -1);
  const [dataSelected, setDataSelected] = useQueryParamsNumber("ds", 0);
  const [lineStyle] = useQueryParamsToggle("ls", ["point", "cma", "line"]);
  const [xyIndex, setXyIndex] = useState<undefined | number[]>(undefined);

  if (!dataSets || dataSets === null) return null;
  const titleArray = [
    "amazon UK & ROW",
    "amazon.co.uk Devices",
    "amazon.com Devices",
  ];
  const dataSet = getDataSet(dataSelected, dataSets);
  const metricSet = getMetricSet(dataSet, metricKey);
  const deviceSet = getDeviceSet(dataSelected, dataSet);
  const title = getCruxTitle(metricKey);
  const {
    latestRating,
    latestScoreString,
    scoreLocaleDeviceString,
    scoreDateRangeString,
  } = getLatestScoreVariables({
    metricKey,
    metricSet,
    dataSelected,
    deviceSet,
    deviceSelected,
    xyIndex,
    titleArray,
    dataSet,
    lineStyle,
  });
  const tabArray = ["Locale", "UK - Device", "ROW - Device"];
  return (
    <div
      className={`grid w-full max-w-160 p-2 md:p-4 h-auto rounded-lg border ${mutedBorder} border-solid bg-transparent ${mutedText}`}
    >
      <div className="w-fit flex gap-0 mb-2 mx-0 items-center text-xs font-light">
        {tabArray.map((string, index) => (
          <ButtonTab
            key={string}
            selected={dataSelected === index}
            onClick={(e) => {
              e.currentTarget.focus();
            }}
            onFocus={() => {
              setDataSelected(index);
              setDeviceSelected(-1);
            }}
          >
            {string}
          </ButtonTab>
        ))}
      </div>
      <div className="w-fit text-base text-black dark:text-white">{title}</div>
      <div className="w-fit text-2xl text-black dark:text-white flex items-center gap-1">
        <RatingColourPatch rating={latestRating} />
        {latestScoreString}
      </div>
      <TypographySmall className={`${mutedText}`}>
        {scoreLocaleDeviceString}
        <span className="text-sm">{scoreDateRangeString}</span>
      </TypographySmall>
      <CrUxHistoryGraph
        dataSet={dataSet}
        deviceSelected={deviceSelected}
        setDeviceSelected={setDeviceSelected}
        metricKey={metricKey}
        metricSet={metricSet}
        deviceSet={deviceSet}
        xyIndex={xyIndex}
        setXyIndex={setXyIndex}
      />
    </div>
  );
}
function getDeviceSet(dataSelected: number, dataSet: CrUxHistoryJson) {
  return dataSelected === 0 ? ["UK", "ROW"] : getDeviceSetFromData(dataSet);
}

function getMetricSet(
  dataSet: CrUxHistoryJson,
  metricKey: string,
  // dataSelected: number
) {
  const metricSet = getMetricSetFromKey(dataSet, metricKey);
  // if (dataSelected === 2) {
  //     const p75sNew = metricSet[0].percentilesTimeseries.p75s.map(
  //         (entry, index) =>
  //             (Number(entry) +
  //                 Number(metricSet[1].percentilesTimeseries.p75s[index])) /
  //             2
  //     );
  //     metricSet = [
  //         { ...metricSet[0], percentilesTimeseries: { p75s: p75sNew } },
  //         metricSet[0],
  //         metricSet[1],
  //     ];
  // }
  return metricSet;
}

function getDataSet(dataSelected: number, dataSets: CrUxHistoryJson[]) {
  return dataSelected !== 0
    ? dataSets[dataSelected - 1]
    : [dataSets[0][0], dataSets[1][0]];
}

function getLatestScoreVariables(params: {
  metricKey: string;
  metricSet: MetricHistogram[];
  dataSelected: number;
  deviceSet: string[];
  deviceSelected: number;
  xyIndex: number[] | undefined;
  titleArray: string[];
  dataSet: CrUxHistoryJson;
  lineStyle: string;
}) {
  const {
    metricKey,
    metricSet,
    dataSelected,
    deviceSet,
    deviceSelected,
    xyIndex,
    titleArray,
    dataSet,
    lineStyle,
  } = params;
  const isCls = metricKey === "cumulative_layout_shift";
  const currentLineStyle = xyIndex ? "points" : lineStyle;
  const isCma = !xyIndex && currentLineStyle === "cma";
  const isTrend = !xyIndex && currentLineStyle === "line";
  const { average, slow } = getThresholds(metricSet[0]); //maximum
  const unit = getUnit(metricKey);
  const dataSetArray = getDataSetArray(metricSet);
  const indexOfLatest = getIndexOfLatest(
    dataSelected,
    deviceSet,
    deviceSelected,
  );
  const latestScoreCategory = getLatestScoreCategory(
    xyIndex,
    deviceSet,
    deviceSelected,
  );
  const scoreLocaleDeviceString = getScoreLocaleDevice(
    titleArray,
    dataSelected,
    latestScoreCategory,
  );
  const latestScore = getLatestScore(
    xyIndex,
    dataSetArray,
    metricSet,
    indexOfLatest,
    isCma,
    isTrend,
  );
  const latestRating = getLatestRating(
    isCls,
    latestScore,
    slow,
    average,
    isTrend,
  );
  const latestScoreString = getLatestScoreString(
    isCls,
    latestScore,
    unit,
    latestRating,
    isTrend,
  );
  const { firstScoreDate, latestScoreDate } = getCruxHistoryDates(
    dataSet,
    xyIndex,
  );
  const scoreDateRangeString = getLatestScoreDateRange(
    xyIndex,
    firstScoreDate,
    latestScoreDate,
  );
  return {
    latestRating,
    latestScoreString,
    scoreLocaleDeviceString,
    scoreDateRangeString,
  };
}

function getLatestRating(
  isCls: boolean,
  latestScore: number,
  slow: number,
  average: number,
  isTrend: boolean,
) {
  const ratingsArray = isCls
    ? ["Poor", "Average", "Good"]
    : ["Slow", "Average", "Fast"];
  const latestRating =
    latestScore > slow
      ? ratingsArray[0]
      : latestScore > average
        ? ratingsArray[1]
        : ratingsArray[2];
  return isTrend ? getTrendStatus(latestScore) : latestRating;
}

function getScoreLocaleDevice(
  titleArray: string[],
  dataSelected: number,
  latestScoreCategory: string,
): React.ReactNode {
  return `${titleArray[dataSelected]} - ${latestScoreCategory} `;
}

function getLatestScoreDateRange(
  xyIndex: number[] | undefined,
  firstScoreDate: string,
  latestScoreDate: string,
): React.ReactNode {
  return `(${xyIndex !== undefined ? `${firstScoreDate} - ` : ""}${latestScoreDate})`;
}

function getLatestScoreString(
  isCls: boolean,
  latestScore: number,
  unit: string,
  latestRating: string,
  isTrend: boolean,
): React.ReactNode {
  return isTrend
    ? latestScore <= 0
      ? "Progressing"
      : "Regressing"
    : `${isCls ? Math.round(latestScore * 100) : Math.round(latestScore)}${unit} - ${latestRating}`;
}

function getIndexOfLatest(
  dataSelected: number,
  deviceSet: string[],
  deviceSelected: number,
) {
  const indexOfAll = getIndexOfAll(dataSelected, deviceSet);
  const indexOfLatest = deviceSelected === -1 ? indexOfAll : deviceSelected;
  return indexOfLatest;
}

function getIndexOfAll(dataSelected: number, deviceSet: string[]) {
  return dataSelected === 0 ? 0 : deviceSet.indexOf("Overall") || 0;
}

function getLatestScore(
  xyIndex: number[] | undefined,
  dataSetArray: number[][],
  metricSet: MetricHistogram[],
  indexOfLatest: number,
  isCma: boolean,
  isTrend: boolean,
) {
  return isTrend
    ? getSlope(metricSet[indexOfLatest].percentilesTimeseries.p75s)
    : isCma
      ? getAverage(metricSet[indexOfLatest].percentilesTimeseries.p75s)
      : getLatestOverrideScore(xyIndex, dataSetArray) ||
        metricSet[indexOfLatest].percentilesTimeseries.p75s.at(-1) ||
        0;
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
function getLatestScoreCategory(
  xyIndex: number[] | undefined,
  deviceSet: string[],
  deviceSelected: number,
) {
  return xyIndex
    ? deviceSet[xyIndex[1]]
    : deviceSet[deviceSelected > -1 ? deviceSelected : 0];
}

export function getCruxHistoryDates(
  dataSet: CrUxHistoryJson,
  xyIndex: number[] | undefined,
) {
  const collectionPeriods = dataSet[0].record.collectionPeriods;
  const currentDate = new Date();
  const currentDateType: DateTypes = {
    year: getYearShort(),
    month: currentDate.getMonth(),
    day: currentDate.getDate(),
  };
  const firstScoreDateRaw = xyIndex
    ? collectionPeriods[xyIndex[0]].firstDate
    : collectionPeriods.at(-1)?.firstDate || currentDateType;
  const firstScoreDate = `${xyIndex ? firstScoreDateRaw.day + " " : ""}${getDateFromPeriod(firstScoreDateRaw, true)}`;

  const latestScoreDateRaw = xyIndex
    ? collectionPeriods[xyIndex[0]].lastDate
    : collectionPeriods.at(-1)?.lastDate || currentDateType;
  const latestScoreDate = `${xyIndex ? latestScoreDateRaw.day + " " : ""}${getDateFromPeriod(latestScoreDateRaw, true)}`;
  return { firstScoreDate, latestScoreDate };
}

function getThresholds(metricHistogram: MetricHistogram) {
  const average = Number(metricHistogram.histogramTimeseries[0].end) || 0;
  const slow = Number(metricHistogram.histogramTimeseries[1].end) || 0;
  const maximum = slow + slow - average;
  return { average, slow, maximum };
}
function getDeviceSetFromData(dataSet: CrUxHistoryJson) {
  return dataSet.map((data) =>
    data.record.key.formFactor
      ? capitaliseFirstLetter(data.record.key.formFactor)
      : "Overall",
  );
}
export function getMetricSetFromKey(
  dataSet: CrUxHistoryJson,
  metricKey: string,
) {
  switch (metricKey) {
    // case 'largest_contentful_paint_image_resource_load_delay':
    //     return [
    //         ...dataSet.map(
    //             (data) =>
    //                 data.record.metrics
    //                     .largest_contentful_paint_image_resource_load_delay
    //         ),
    //     ];
    // case 'largest_contentful_paint_image_resource_load_duration':
    //     return [
    //         ...dataSet.map(
    //             (data) =>
    //                 data.record.metrics
    //                     .largest_contentful_paint_image_resource_load_duration
    //         ),
    //     ];
    // case 'largest_contentful_paint_image_time_to_first_byte':
    //     return [
    //         ...dataSet.map(
    //             (data) =>
    //                 data.record.metrics
    //                     .largest_contentful_paint_image_time_to_first_byte
    //         ),
    //     ];
    case "largest_contentful_paint":
      return [
        ...dataSet.map((data) => data.record.metrics.largest_contentful_paint),
      ];
    case "round_trip_time":
      return [...dataSet.map((data) => data.record.metrics.round_trip_time)];
    case "experimental_time_to_first_byte":
      return [
        ...dataSet.map(
          (data) => data.record.metrics.experimental_time_to_first_byte,
        ),
      ];
    case "interaction_to_next_paint":
      return [
        ...dataSet.map((data) => data.record.metrics.interaction_to_next_paint),
      ];
    case "cumulative_layout_shift":
      return [
        ...dataSet.map((data) => data.record.metrics.cumulative_layout_shift),
      ];
    case "first_contentful_paint":
      return [
        ...dataSet.map((data) => data.record.metrics.first_contentful_paint),
      ];
    default:
      return [
        ...dataSet.map(
          (data) => data.record.metrics.experimental_time_to_first_byte,
        ),
      ];
  }
}
export function getCruxTitle(metricKey: string) {
  const lookupTitle: Record<string, string> = {
    largest_contentful_paint: "Largest Contentful Paint",
    interaction_to_next_paint: "Interaction To Next Paint",
    cumulative_layout_shift: "Cumulative Layout Shift",
    first_contentful_paint: "First Contentful Paint",
    experimental_time_to_first_byte: "Time To First Byte",
    largest_contentful_paint_image_resource_load_delay: "LCP - Load Delay",
    largest_contentful_paint_image_resource_load_duration:
      "LCP - Load Duration",
    largest_contentful_paint_image_time_to_first_byte:
      "LCP - Time To First Byte (TTFB)",
    largest_contentful_paint_image_element_render_delay: "LCP - Render Delay",
    round_trip_time: "Round Trip Time",
  };
  return lookupTitle[metricKey];
}
function getUnit(metricKey: string) {
  const lookupTitle: Record<string, string> = {
    largest_contentful_paint: "ms",
    largest_contentful_paint_image_resource_load_delay: "ms",
    largest_contentful_paint_image_resource_load_duration: "ms",
    largest_contentful_paint_image_time_to_first_byte: "ms",
    largest_contentful_paint_image_element_render_delay: "ms",
    interaction_to_next_paint: "ms",
    cumulative_layout_shift: "%",
    first_contentful_paint: "ms",
    experimental_time_to_first_byte: "ms",
    round_trip_time: "ms",
  };
  return lookupTitle[metricKey];
}
function getLatestOverrideScore(
  overrideIndex: number[] | undefined,
  dataSets: number[][],
) {
  if (!overrideIndex) return undefined;
  const [xIndex, yIndex] = overrideIndex;
  return dataSets[yIndex][xIndex];
}
function getDataSetArray(metricSet: MetricHistogram[]) {
  return metricSet.map((metric) => metric.percentilesTimeseries.p75s);
}
function getDateFromPeriod(date: DateTypes, addYear: boolean) {
  const name = monthNumberToName(`${date.month}`);
  return `${name}${name === "Jan" || addYear ? " " + (date.year - 2000) : ""}`;
}
