import React, { ReactNode } from "react";
import { CollectionPeriod, DateTypes } from "./CruxHistoryTypes";
import { monthNumberToName } from "@/utils/dates";

export default function CrUxHistoryXScale({
  collectionPeriods,
}: {
  collectionPeriods: CollectionPeriod[];
}) {
  return (
    <div
      className={`flex justify-between font-sans text-xs text-gray-700 dark:text-gray-300 mt-1`}
    >
      {
        collectionPeriods.reduce(
          (acc, curr, index) => {
            const addYear = index === 0;
            if (
              curr &&
              curr.lastDate &&
              getDateFromPeriod(curr.lastDate, false) !== acc.previous &&
              getDateFromPeriod(curr.lastDate, true) !== acc.previous
            ) {
              acc.array.push(
                <span key={`period-${index}`}>
                  {getDateFromPeriod(curr.lastDate, addYear)}
                </span>,
              );
              acc.previous = getDateFromPeriod(curr.lastDate, addYear);
            }
            return acc;
          },
          { array: [] as ReactNode[], previous: "" },
        ).array
      }
    </div>
  );
}
function getDateFromPeriod(date: DateTypes, addYear: boolean) {
  const name = monthNumberToName(`${date.month}`);
  return `${name}${name === "Jan" || addYear ? " " + (date.year - 2000) : ""}`;
}
