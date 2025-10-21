"use client";
import React from "react";
import usePsiJson from "./usePsiJson";
import path from "path";
import MetricsCards from "./MetricsCards";
import { useQueryParamsToggle } from "@/utils/searchParamsURL";
import CrUxHistoryGraphs from "./CrUxHistoryGraphs";
import MetricsTable from "./MetricsTable";
import MetricTitleCard from "./MetricTitleCard";
import DoughnutChart from "./DoughnutChart";
import { metricInfo } from "./slides/SiteHealthSlideData";
import DoughnutChartHalf from "./DoughnutChartHalf";
import LoadingSpinner from "./LoadingSpinner";

export default function SiteHealth() {
  const amazonUk = usePsiJson(path.join("page-speed", "amazon_co_uk.json"));
  const amazonRow = usePsiJson(path.join("page-speed", "amazon_com.json"));
  const [locale] = useQueryParamsToggle("loc", ["UK", "US"]);
  if (
    amazonUk.isLoading ||
    !amazonUk.data ||
    amazonRow.isLoading ||
    !amazonRow.data
  )
    return <LoadingSpinner />;
  const doughnutArray = [
    { name: "TTFB", percentage: 10 },
    { name: "Load Delay", percentage: 40 },
    {
      name: "Load Duration",
      percentage: 10,
    },
    { name: "Render Delay", percentage: 40 },
  ];
  return (
    <div className="text-black dark:text-white bg-white dark:bg-black grid gap-4 w-full">
      <DoughnutChartHalf sections={doughnutArray}>1800ms</DoughnutChartHalf>
      <DoughnutChart sections={doughnutArray}>1400ms</DoughnutChart>
      {Object.keys(metricInfo).map((key, index) => (
        <MetricTitleCard key={`${key}${index}`} metricKey={key} />
      ))}
      {/* <MetricTitleCard /> */}
      <MetricsTable />
      <CrUxHistoryGraphs />
      {/* <div className="ml-auto mr-2 grid">
                <button
                    type="button"
                    className="text-inherit text-center text-base ml-auto mr-2 border-inherit border-2 border-solid w-36 h-10 py-1 px-2 rounded-lg bg-transparent bg-white dark:bg-black hover:scale-105 focus:scale-105 transition box-border"
                    onClick={() => {
                        amazonUk.refetch();
                        amazonRow.refetch();
                    }}
                >
                    <span className="block m-auto p-0">Refresh Data</span>
                </button>
                {lastUpdated && (
                    <div className="text-left text-base  font-Avenir-light text-neutral-500 dark:text-neutral-400 h-5 block">
                        Last updated: {date.split('-').toReversed().join('/')}{' '}
                        at {time.split(':')[0]}:{time.split(':')[1]}
                    </div>
                )}
            </div> */}

      {amazonUk.data && amazonRow.data && (
        <MetricsCards data={locale === "UK" ? amazonUk.data : amazonRow.data} />
      )}
    </div>
  );
}
