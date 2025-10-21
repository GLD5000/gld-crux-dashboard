"use client";
import React from "react";
import path from "path";
import useCrUxHistoryJson from "./useCrUxHistoryJson";
import { CrUxHistoryJson } from "./CruxHistoryTypes";
import CrUxHistoryGraphMulti from "./CrUxHistoryGraphMulti";

export default function CrUxHistoryGraphs() {
  const amazonUk: {
    data: CrUxHistoryJson | null;
    isLoading: boolean;
    refetch: () => void;
  } = useCrUxHistoryJson(path.join("crux-history", "amazon_co_uk.json"));
  const amazonRow: {
    data: CrUxHistoryJson | null;
    isLoading: boolean;
    refetch: () => void;
  } = useCrUxHistoryJson(path.join("crux-history", "amazon_com.json"));
  if (
    !amazonRow ||
    amazonRow.data === null ||
    !amazonUk ||
    amazonUk.data === null
  )
    return null;
  const metricsArray = [
    "largest_contentful_paint",
    "interaction_to_next_paint",
    "cumulative_layout_shift",
    "first_contentful_paint",
    "experimental_time_to_first_byte",
    "round_trip_time",
    // 'largest_contentful_paint_image_resource_load_delay',
    // 'largest_contentful_paint_image_resource_load_duration',
    // 'largest_contentful_paint_image_time_to_first_byte',
  ];
  const dataSets = [amazonUk.data, amazonRow.data];
  return (
    <div className="grid lg:grid-cols-3 gap-4 w-fit h-auto mx-auto">
      {metricsArray.map((metric, index) => (
        <CrUxHistoryGraphMulti
          key={`${index}-metric`}
          dataSets={dataSets}
          metricKey={metric}
        />
      ))}
    </div>
  );
}
