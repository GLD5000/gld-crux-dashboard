"use client";
import React from "react";
// import path from "path";
import { standardText } from "../../ui/twStrings";
// import useCrUxHistoryJson from "../useCrUxHistoryJson";
import { CrUxHistoryJson } from "../CruxHistoryTypes";
import SlideNavigation from "./SlideNavigation";
import SiteHealthSlideContent from "./SiteHealthSlideContent";

import { SiteHealthSlideKeyLookup } from "./SiteHealthSlideData";
import { useSlideKey } from "@/utils/slideHooks";
import { cruxJsonArray } from "@/utils/cruxJsonArray";

export default function SiteHealthSlide() {
  const [slideKey] = useSlideKey();

  // const amazonUk: {
  //   data: CrUxHistoryJson | null;
  //   isLoading: boolean;
  //   refetch: () => void;
  // } = useCrUxHistoryJson(path.join("crux-history", "amazon_co_uk.json"));
  // const amazonRow: {
  //   data: CrUxHistoryJson | null;
  //   isLoading: boolean;
  //   refetch: () => void;
  // } = useCrUxHistoryJson(path.join("crux-history", "amazon_com.json"));
  // if (
  //   !amazonRow ||
  //   amazonRow.data === null ||
  //   !amazonUk ||
  //   amazonUk.data === null
  // )
  //   return null;
  const dataSets: CrUxHistoryJson[] = [cruxJsonArray, cruxJsonArray]; //[amazonUk.data, amazonRow.data];
  const metricKey = SiteHealthSlideKeyLookup[slideKey];
  return (
    <div className={`w-full max-w-400 mx-auto ${standardText}`}>
      <SlideNavigation />
      <SiteHealthSlideContent metricKey={metricKey} dataSets={dataSets} />
    </div>
  );
}
