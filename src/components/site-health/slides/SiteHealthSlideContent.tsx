"use client";
import React from "react";
import { CrUxHistoryJson, MetricHistogramKeys } from "../CruxHistoryTypes";
import StandardMetricContent from "./StandardMetricContent";
import { groupSlides } from "./SlideNavigation";

import MetricGroupContent from "./MetricGroupContent";
import { useSlideKey } from "@/utils/slideHooks";

export default function SiteHealthSlideContent({
  metricKey,
  dataSets,
}: {
  metricKey: MetricHistogramKeys;
  dataSets: CrUxHistoryJson[];
}) {
  const [slideKey] = useSlideKey();

  const groupSlideHeaders = Object.keys(groupSlides);
  const isGroupSlide = groupSlideHeaders.some((value) => value === slideKey);
  return (
    <section className={`p-4 gap-4 w-full flex flex-wrap`}>
      {isGroupSlide && <MetricGroupContent dataSets={dataSets} />}
      {!isGroupSlide && (
        <StandardMetricContent dataSets={dataSets} metricKey={metricKey} />
      )}
    </section>
  );
}
