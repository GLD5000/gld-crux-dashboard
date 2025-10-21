import { useQueryParams } from "@/utils/searchParamsURL";
import { TypographyH1, TypographyLead } from "../../ui/typography";
import MetricTitleBenchmark from "../MetricTitleBenchmark";
import {
  metricInfo,
  SiteHealthSlideKeyReverseLookup,
} from "../slides/SiteHealthSlideData";
import { getIsSlideNavCategory } from "../slides/SlideNavigation";
import { highlightTextGroupHover } from "../../ui/twStrings";

export default function MetricTitle({
  metricKey = "cumulative_layout_shift",
}: {
  metricKey?: string;
}) {
  const [slideKey, setSlideKey] = useQueryParams("sk", "lcp");

  return (
    <div className="flex flex-wrap gap-4 w-fit h-fit my-auto mx-auto">
      {SiteHealthSlideKeyReverseLookup[metricKey] !== slideKey &&
      !getIsSlideNavCategory(metricKey) ? (
        <div
          className={`grid w-fit h-auto mx-auto cursor-pointer group`}
          onClick={() => {
            setSlideKey(SiteHealthSlideKeyReverseLookup[metricKey]);
          }}
        >
          <TypographyH1
            className={`w-fit mx-auto text-[4rem] lg:text-[5rem] my-0 tracking-wide leading-none lg:leading-none ${highlightTextGroupHover}`}
          >
            {metricInfo[metricKey].acronym}
          </TypographyH1>
          <TypographyLead
            className={`mx-auto tracking-tighter ${highlightTextGroupHover} group-hover:underline`}
          >
            {metricInfo[metricKey].title}
          </TypographyLead>
        </div>
      ) : (
        <div className="grid w-fit h-auto mx-auto">
          <TypographyH1 className="w-fit mx-auto text-[4rem] lg:text-[5rem] my-0 tracking-wide leading-none lg:leading-none">
            {metricInfo[metricKey].acronym}
          </TypographyH1>
          <TypographyLead className="mx-auto tracking-tighter">
            {metricInfo[metricKey].title}
          </TypographyLead>
        </div>
      )}
      {metricInfo[metricKey].goodThreshold && (
        <MetricTitleBenchmark
          goodThreshold={`${metricInfo[metricKey].goodThreshold}${metricInfo[metricKey].unit}`}
          poorThreshold={`${metricInfo[metricKey].poorThreshold}${metricInfo[metricKey].unit}`}
        />
      )}
    </div>
  );
}
