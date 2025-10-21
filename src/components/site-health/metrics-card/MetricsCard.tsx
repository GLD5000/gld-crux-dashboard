import React from "react";
import { PsiCategories, PsiReport, PsiResults } from "../siteHealthTypes";
import PageSize, { getPayloadNumber } from "./PageSize";
import RealUserMetrics, { getCoreWebVitalsRating } from "./RealUserMetrics";
import { useQueryParamsToggle } from "@/utils/searchParamsURL";
import MetricScoreSection from "./MetricScoreSection";
import { capitaliseFirstLetter } from "@/utils/stringUtils";
import LighthouseAudits from "./LighthouseAudits";
import CopyBoxMinV2 from "./CopyBoxMinV2";

export default function MetricsCard({ dataIn }: { dataIn: PsiReport }) {
  const [resultType, toggleResultType] = useQueryParamsToggle("rt", [
    "RUM",
    "Audits",
  ]);
  const [locale, toggleLocale] = useQueryParamsToggle("loc", ["UK", "US"]);
  const [device, toggleDevice] = useQueryParamsToggle("dt", [
    "Mobile",
    "Desktop",
  ]);
  const { name, mobile, desktop, url } = dataIn;
  const { metrics: mobileMetrics, categories: mobileCategories } = mobile;
  const { metrics: desktopMetrics, categories: desktopCategories } = desktop;
  const isNotApplicable =
    typeof mobile.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile !==
      "number" ||
    typeof desktop.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile !==
      "number";
  const payload = getPayloadNumber(mobile);
  const processedName =
    name.indexOf("ori") > -1
      ? "Average"
      : name === "homepage"
        ? `Homepage`
        : `${name.slice(0, 3).toLocaleUpperCase()} ${name.slice(3).replace("Hc", "Hot Choc")}`;
  const coreWebVitalsPass = isNotApplicable
    ? undefined
    : getCoreWebVitalsRating(
        device === "Mobile" ? mobileMetrics : desktopMetrics,
      );
  return (
    <div className="text-base rounded-lg dark:border-neutral-400 border-neutral-500 border border-solid w-[max(20rem,100vw-2rem)] md:w-[min(100vw-3rem,60rem)] h-auto p-4 flex flex-wrap justify-center gap-y-3 mx-auto">
      <h2 className="w-full">
        <span className="text-center text-base normal-case mx-auto w-full block shrink-0 font-bold">
          {processedName}
        </span>
      </h2>
      {resultType === "RUM" ? (
        <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-2">
          {" "}
          {overallRating(device, mobile, desktop)}
          {coreWebVitalsRating(coreWebVitalsPass)}
          <RealUserMetrics
            metrics={device === "Mobile" ? mobileMetrics : desktopMetrics}
          />
          {payload && <PageSize payloadNumber={payload} />}
        </div>
      ) : (
        <>
          <LighthouseAudits
            categories={
              device === "Mobile"
                ? (mobileCategories as PsiCategories)
                : (desktopCategories as PsiCategories)
            }
          />
          {payload && <PageSize payloadNumber={payload} />}
        </>
      )}

      <div className="w-full mx-auto flex flex-wrap gap-4 justify-center">
        <button
          type="button"
          className="text-inherit text-center text-sm border border-solid dark:border-neutral-400 border-neutral-500 w-[8em] h-[2.25em] py-1 px-2 rounded-lg bg-white dark:bg-black hover:scale-105 focus:scale-105 transition box-border"
          onClick={() => {
            toggleResultType();
          }}
        >
          <span className="block m-auto p-0">{`${resultType}`}</span>
        </button>
        <button
          type="button"
          className="text-inherit text-center text-sm border border-solid dark:border-neutral-400 border-neutral-500 w-[8em] h-[2.25em] py-1 px-2 rounded-lg bg-white dark:bg-black hover:scale-105 focus:scale-105 transition box-border"
          onClick={() => {
            toggleDevice();
          }}
        >
          <span className="block m-auto p-0">{`${device}`}</span>
        </button>
        <button
          type="button"
          className="text-inherit text-center text-sm border border-solid dark:border-neutral-400 border-neutral-500 w-[8em] h-[2.25em] py-1 px-2 rounded-lg  bg-white dark:bg-black hover:scale-105 focus:scale-105 transition box-border"
          onClick={() => {
            toggleLocale();
          }}
        >
          <span className="block m-auto p-0">{`${locale}`}</span>
        </button>
      </div>
      <div className="flex flex-wrap gap-2 w-fit h-auto mx-auto px-6 max-w-full">
        <a
          href={url}
          target="_blank"
          className="block text-base m-0 text-center dark:text-neutral-400 text-neutral-500 w-fit overflow-hidden max-w-[calc(100%-40px)] h-auto bg-transparent box-border px-1 font-Avenir-light line-clamp-1 whitespace-pre text-ellipsis hover:underline"
        >
          <span> {url.replace("https://www.", "")}</span>
        </a>
        <CopyBoxMinV2 innerValue={url} />
      </div>
    </div>
  );
}
function coreWebVitalsRating(coreWebVitalsPass?: boolean) {
  return (
    <div className="px-1 pb-4 text-black dark:text-white text-base leading-[0.8] text-left w-full box-border h-auto">
      <span className="block mr-auto leading-none mb-2">
        {`Core Web Vitals`}
      </span>

      {coreWebVitalsPass === undefined ? (
        <MetricScoreSection category={"N/A"} score={"N/A"} vitalsMode="Score" />
      ) : (
        <MetricScoreSection
          category={coreWebVitalsPass ? "FAST" : "SLOW"}
          score={coreWebVitalsPass ? "Passed" : "Failed"}
          vitalsMode="Score"
        />
      )}
    </div>
  );
}

function overallRating(
  device: string,
  mobile: PsiResults,
  desktop: PsiResults,
) {
  const isOriginFallBack = mobile.origin_fallback || desktop.origin_fallback;
  return (
    <div className="px-1 pb-4 text-black dark:text-white text-base leading-[0.8] text-left w-full box-border h-auto">
      <span className="block mr-auto leading-none mb-2">
        {`Overall Rating`}
      </span>
      <MetricScoreSection
        category={
          isOriginFallBack
            ? "N/A"
            : device === "Mobile"
              ? mobile.overall_category
              : desktop.overall_category
        }
        score={capitaliseFirstLetter(
          isOriginFallBack
            ? "N/A"
            : device === "Mobile"
              ? mobile.overall_category
              : desktop.overall_category,
        )}
      />
    </div>
  );
}
