import {
  TypographyList,
  TypographyListItem,
  TypographyLink,
} from "../../ui/typography";
import { metricInfo } from "../slides/SiteHealthSlideData";

export default function MetricFacts({
  metricKey = "cumulative_layout_shift",
}: {
  metricKey?: string;
}) {
  return (
    <>
      {" "}
      {metricInfo[metricKey].facts && (
        <TypographyList className="w-full h-auto p-0 mx-auto">
          {metricInfo[metricKey].facts.map((fact, index) => (
            <TypographyListItem key={`fact-${index}`}>
              {fact}
            </TypographyListItem>
          ))}
        </TypographyList>
      )}
      <TypographyLink
        href={metricInfo[metricKey].url}
        target="_blank"
        className={`inline-block my-0 text-xs transition hover:underline`}
      >
        {`Learn more at ${metricInfo[metricKey].url.replaceAll("https://", "").split("/")[0]}`}
      </TypographyLink>
    </>
  );
}
