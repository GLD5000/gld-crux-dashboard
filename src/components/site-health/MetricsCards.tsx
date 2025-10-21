import React from "react";
import MetricsCard from "./metrics-card/MetricsCard";
import { PsiReportCollection } from "./siteHealthTypes";

export default function MetricsCards({ data }: { data: PsiReportCollection }) {
  return (
    <div className="flex flex-wrap gap-6">
      {Object.values(data)
        .sort((a, b) => {
          const aIsHoisted =
            a.name.indexOf("rigin") > -1 || a.name.indexOf("ome") > -1;
          const bIsHoisted =
            b.name.indexOf("rigin") > -1 || b.name.indexOf("ome") > -1;

          if (aIsHoisted && !bIsHoisted) return -1;
          if (!aIsHoisted && bIsHoisted) return 1;

          // If both are hoisted or neither is hoisted, preserve original order
          return (
            Object.values(data).indexOf(a) - Object.values(data).indexOf(b)
          );
        })
        .map((entry, index) => {
          return <MetricsCard key={`${entry.name}-${index}`} dataIn={entry} />;
        })}
    </div>
  );
}
