import React from "react";
// import { barColours } from './TricolourBarPlot';
import { capitaliseFirstLetter } from "@/utils/stringUtils";
import RatingColourPatch from "./RatingColourPatch";
import { highlightText, mutedText } from "../../ui/twStrings";

export default function MetricScoreSectionVerbose({
  category = "N/A",
  score = "N/A",
  device,
}: {
  category?: string;
  score?: string;
  device?: string;
}) {
  const rating =
    category === "N/A" ? category : capitaliseFirstLetter(category);
  const scoreSpan = (
    <span className={`block ml-auto ${mutedText} leading-[0.7] mt-[0.1em]`}>
      {`${
        Number(score) <= 1
          ? `${Math.round(Number(score) * 100)}%`
          : `${score}ms`
      } - ${rating}`}
    </span>
  );
  const deviceSpan = device ? (
    <span
      className={`block mr-auto leading-none ${highlightText} border-none text-base`}
    >
      {device}
    </span>
  ) : null;
  return (
    <div className="flex justify-between w-full items-center h-auto">
      {deviceSpan ? (
        <div className="flex gap-1">
          {<RatingColourPatch rating={rating} />} {deviceSpan}
        </div>
      ) : (
        <RatingColourPatch rating={rating} />
      )}
      {scoreSpan}
    </div>
  );
}
