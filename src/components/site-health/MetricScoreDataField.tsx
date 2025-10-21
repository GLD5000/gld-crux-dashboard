import React from "react";
import RatingDataField from "./RatingDataField";

export default function MetricScoreDataField(
  thresholds: { goodThreshold: number; poorThreshold: number },
  unit: string,
) {
  return function MetricScoreDataFieldFunction(input: string) {
    const inputNumber = Number(input);
    const isGood = inputNumber <= thresholds.goodThreshold;
    const isPoor = inputNumber > thresholds.poorThreshold;
    const rating = isGood ? "good" : isPoor ? "poor" : "average";
    return (
      <RatingDataField
        rating={rating}
        input={`${unit === "ms" ? Math.round(inputNumber) : Math.round(inputNumber * 100)}`}
        unit={unit}
      />
    );
  };
}
