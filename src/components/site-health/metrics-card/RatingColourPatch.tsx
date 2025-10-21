import React from "react";
import { barColours } from "./TricolourBarPlot";

export default function RatingColourPatch({ rating }: { rating: string }) {
  if (!rating) return null;
  const lowerCaseRating = rating.toLowerCase();
  const ratingColour = barColours[lowerCaseRating];

  return (
    <div
      className={`${ratingColour} h-3 w-3 ${lowerCaseRating === "good" || lowerCaseRating === "fast" ? "rounded-full" : "rounded-none"}`}
    ></div>
  );
}
