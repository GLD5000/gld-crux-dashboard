import React from "react";
import RatingDataField from "./RatingDataField";
import { getTrendStatus } from "./cruxUtil";

export default function TrendDataField(input: string) {
  const inputNumber = Number(input);
  const isNegative = inputNumber < 0;
  const rating = isNegative ? "good" : "average";
  const title = getTrendStatus(inputNumber);
  return <RatingDataField rating={rating} input={title} />;
}
