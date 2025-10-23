import { mutedText } from "../../ui/twStrings";
import { TypographyP } from "../../ui/typography";
import { metricInfo } from "../slides/SiteHealthSlideData";

export default function MetricIntro({
  metricKey = "cumulative_layout_shift",
}: {
  metricKey?: string;
}) {
  return (
    <TypographyP className={`w-full text-sm mx-auto ${mutedText} mb-0`}>
      {metricInfo[metricKey].description}
    </TypographyP>
  );
}
