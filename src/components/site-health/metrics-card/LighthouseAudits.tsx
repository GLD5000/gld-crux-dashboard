import React from "react";
import { PsiCategories } from "../siteHealthTypes";
import AuditScore from "./AuditScore";

export default function LighthouseAudits({
  categories,
}: {
  categories: PsiCategories;
}) {
  return (
    <>
      {Object.entries(categories || {}).map((entry, index) => {
        return (
          <AuditScore
            key={`${entry[1]}${index}`}
            payloadNumber={entry[1].score * 100}
            nameIn={entry[0]}
          />
        );
      })}
    </>
  );
}
