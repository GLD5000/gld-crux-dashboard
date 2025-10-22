"use client";
import React from "react";
import { PsiResults } from "../siteHealthTypes";
import { KIBIBYTE_MULTIPLIER } from "./siteHealthConstants";
// import { useQueryParams } from '@/utils/searchParamsURL';
// import { barColours } from './TricolourBarPlotReverse';
import { capitaliseFirstLetterNonExclusive } from "@/utils/stringUtils";
import PercentageGauge from "./PercentageGauge";

export default function AuditScore({
  payloadNumber,
  nameIn,
}: {
  payloadNumber: number;
  nameIn: string;
}) {
  //     const [viewMode, setViewMode] = useQueryParams('view', 'All');
  // console.log('payloadNumber:', payloadNumber);
  // const ratingColour =
  //     payloadNumber < 50
  //         ? barColours.poor
  //         : payloadNumber < 90
  //           ? barColours.average
  //           : barColours.good;
  return (
    <div className="bg-transparent text-black dark:text-white border-none text-base w-28 h-auto leading-[0.8] text-left py-0 px-1 gap-[3px] grid">
      <PercentageGauge percentage={Math.round(payloadNumber)} />
      <div className="bg-transparent border-none text-sm text-center leading-[0.8] px-1 py-4 m-0 ">
        <span className="mr-auto leading-[1]">
          {nameIn === "seo" ? "SEO" : capitaliseFirstLetterNonExclusive(nameIn)}
        </span>
      </div>
      <div className="grid gap-[3px] bg-transparent border-none text-base leading-[0.8] text-left p-0 m-0">
        {/* <div className="flex justify-between w-full items-center">
                    <div
                        className={`${ratingColour} h-3 w-3 ${ratingColour === 'bg-green-400' ? 'rounded-full' : 'rounded-none'}`}
                    ></div>
                    <span className="block ml-auto dark:text-neutral-400 text-neutral-500 leading-[0.7] mt-[0.2em]">
                        {Math.round(payloadNumber)}
                    </span>
                </div> */}

        {/* <TricolourBarPlotReverse
                    bars={[0.5, 0.4, 0.1]}
                    pointer={Number(payloadNumber)}
                /> */}
      </div>
    </div>
  );
}
export function getPayloadNumber(dataIn: PsiResults) {
  const payloadMatch = dataIn.audits
    ? dataIn.audits["total-byte-weight"]?.displayValue?.match(/([0-9,]+)/)
    : null;
  const payloadNumber = payloadMatch
    ? Number(payloadMatch[0].replaceAll(",", "")) * KIBIBYTE_MULTIPLIER
    : undefined;
  return payloadNumber;
}
