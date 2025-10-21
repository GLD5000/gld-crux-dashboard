import React from "react";
import { PsiMetricKeys, PsiMetrics } from "../siteHealthTypes";
import WebVital from "./WebVital";

export default function RealUserMetrics({ metrics }: { metrics: PsiMetrics }) {
  const coreWebVitalsArray: PsiMetricKeys[] = [
    "LARGEST_CONTENTFUL_PAINT_MS",
    "INTERACTION_TO_NEXT_PAINT",
    "CUMULATIVE_LAYOUT_SHIFT_SCORE",
  ];

  const otherMetricsArray: PsiMetricKeys[] = [
    // 'LARGEST_CONTENTFUL_PAINT_MS',
    // 'INTERACTION_TO_NEXT_PAINT',
    // 'CUMULATIVE_LAYOUT_SHIFT_SCORE',
    "FIRST_CONTENTFUL_PAINT_MS",
    "EXPERIMENTAL_TIME_TO_FIRST_BYTE",
  ];
  return (
    <>
      <SectionHeader />

      {/* <div className='w-full flex flex-wrap'> */}
      {coreWebVitalsArray.map((stringKey) => (
        <WebVital
          key={`${stringKey}`}
          metricScores={metrics[stringKey]}
          title={stringKey}
        />
      ))}
      <SectionHeader textIn="Other Metrics" />
      {otherMetricsArray.map((stringKey) => (
        <WebVital
          key={`${stringKey}`}
          metricScores={metrics[stringKey]}
          title={stringKey}
        />
      ))}
    </>
  );
}
function SectionHeader({ textIn = "Core Web Vitals" }: { textIn?: string }) {
  return (
    <div className="w-full h-fit border-transparent border-solid border dark:border-b-neutral-400 border-b-neutral-500 my-[0.25em] py-2 text-center col-start-1 col-span-1 md:col-span-2 lg:col-span-3">
      {textIn}
    </div>
  );
}

export function getCoreWebVitalsRating(metrics: PsiMetrics) {
  const coreWebVitalsArray: PsiMetricKeys[] = [
    "LARGEST_CONTENTFUL_PAINT_MS",
    "INTERACTION_TO_NEXT_PAINT",
    "CUMULATIVE_LAYOUT_SHIFT_SCORE",
  ];
  const isNotApplicable = coreWebVitalsArray.some(
    (key) => metrics[key] === undefined,
  );
  return isNotApplicable
    ? undefined
    : coreWebVitalsArray.every(
        (key) => metrics[key]?.category && metrics[key].category === "FAST",
      );
}
