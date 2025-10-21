import { TypographyH1, TypographyLead } from "../../ui/typography";
import MetricTitleBenchmark from "../MetricTitleBenchmark";
import { metricInfo } from "../slides/SiteHealthSlideData";

export default function MetricGroupTitle({
  metricKey = "cumulative_layout_shift",
}: {
  metricKey?: string;
}) {
  console.log("metricKey:", metricKey);
  return (
    <div className="flex flex-wrap gap-4 w-fit h-fit my-auto mx-auto">
      <div className="grid w-fit h-auto mx-auto">
        <TypographyH1 className="w-fit mx-auto text-[4rem] lg:text-[5rem] my-0 tracking-wide leading-none lg:leading-none">
          {metricInfo[metricKey].acronym}
        </TypographyH1>
        <TypographyLead className="mx-auto tracking-tighter">
          {metricInfo[metricKey].title}
        </TypographyLead>
      </div>
      {metricInfo[metricKey].goodThreshold && (
        <MetricTitleBenchmark
          goodThreshold={`${metricInfo[metricKey].goodThreshold}${metricInfo[metricKey].unit}`}
          poorThreshold={`${metricInfo[metricKey].poorThreshold}${metricInfo[metricKey].unit}`}
        />
      )}
    </div>
  );
}
