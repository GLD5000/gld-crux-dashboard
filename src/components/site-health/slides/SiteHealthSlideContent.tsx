"use client";
import React from "react";
import { CrUxHistoryJson, MetricHistogramKeys } from "../CruxHistoryTypes";
import StandardMetricContent from "./StandardMetricContent";
import { groupSlides } from "./SlideNavigation";
import { useQueryParams } from "@/utils/searchParamsURL";
import MetricGroupContent from "./MetricGroupContent";

export default function SiteHealthSlideContent({
  metricKey,
  dataSets,
}: {
  metricKey: MetricHistogramKeys;
  dataSets: CrUxHistoryJson[];
}) {
  const [slideKey] = useQueryParams("sk", "cwv");

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
