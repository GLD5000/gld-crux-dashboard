import React from "react";
// import { barColours } from './TricolourBarPlot';
import { capitaliseFirstLetter } from "@/utils/stringUtils";
import RatingColourPatch from "./RatingColourPatch";

export default function MetricScoreSection({
  category = "N/A",
  score = "N/A",
  device,
  vitalsMode,
}: {
  category?: string;
  score?: string;
  device?: string;
  vitalsMode?: string;
}) {
  // const ratingColour =
  //     category === 'N/A'
  //         ? 'bg-neutral-400 dark:bg-neutral-400'
  //         : category === 'SLOW'
  //           ? barColours.poor
  //           : category === 'AVERAGE'
  //             ? barColours.average
  //             : barColours.good;
  const rating =
    category === "N/A" ? category : capitaliseFirstLetter(category);
  // const colourPatch = (
  //     <div
  //         className={`${ratingColour} h-3 w-3 ${ratingColour === 'bg-green-400' ? 'rounded-full' : 'rounded-none'}`}
  //     ></div>
  // );
  const scoreSpan = (
    <span className="block ml-auto dark:text-neutral-400 text-neutral-500 leading-[0.7] mt-[0.1em]">
      {vitalsMode && vitalsMode === "Score"
        ? Number(score) <= 1
          ? `${Math.round(Number(score) * 100)}%`
          : `${score}ms`
        : rating}
    </span>
  );
  const deviceSpan = device ? (
    <span className="block ml-auto dark:text-neutral-400 text-neutral-500 leading-[0.7] mt-[0.1em]">
      {device}
    </span>
  ) : null;
  return (
    <div className="flex justify-between w-full items-center h-auto">
      {deviceSpan ? (
        <div>
          {<RatingColourPatch rating={rating} />} {deviceSpan}
        </div>
      ) : (
        <RatingColourPatch rating={rating} />
      )}
      {scoreSpan}
    </div>
  );
}
