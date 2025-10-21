import React from "react";
import RatingColourPatch from "./metrics-card/RatingColourPatch";

export default function RatingDataField({
  rating,
  input,
  unit,
}: {
  rating: string;
  input: string;
  unit?: string;
}) {
  return (
    <div className="grid grid-cols-[auto_auto] gap-1 w-fit align-middle justify-center">
      <RatingColourPatch rating={rating} />
      <span className="block w-fit h-auto leading-none mt-px">{`${input}${unit ? unit : ""}`}</span>
    </div>
  );
}
