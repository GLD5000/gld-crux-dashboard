import React from "react";
import { CrUxHistoryJson } from "../CruxHistoryTypes";
import { groupSlides } from "./SlideNavigation";
import { useQueryParams } from "@/utils/searchParamsURL";
import MetricSummaryCard from "../MetricSummaryCard";
import MetricGroupTitleCard from "../MetricGroupTitleCard";
import { SiteHealthSlideKeyLookup } from "./SiteHealthSlideData";

export default function MetricGroupContent({
  dataSets,
}: {
  dataSets: CrUxHistoryJson[];
}) {
  const [slideKey] = useQueryParams("sk", "lcp");

  const metricKeys = Object.keys(groupSlides[slideKey]).filter(
    (value) => value !== slideKey,
  );
  return (
    <>
      <MetricGroupTitleCard metricKey={slideKey} />
      {metricKeys.map((keyValue, index) => (
        <MetricSummaryCard
          key={`${index}-summary`}
          dataSets={dataSets}
          metricKey={SiteHealthSlideKeyLookup[keyValue]}
        />
      ))}
    </>
  );
}
