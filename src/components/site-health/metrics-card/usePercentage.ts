import { createStringSwitcher } from "@/utils/objectUtils";
import { KIBIBYTE_MULTIPLIER } from "./siteHealthConstants";
import { useQueryParams } from "@/utils/searchParamsURL";

export default function useSizePercentage(
  payloadNumber: number,
): [string, () => void] {
  const megaBytes = `${(Math.round(payloadNumber / 100) / 10).toLocaleString()}MB`;
  const maxPercentageNumber = Math.round(
    (payloadNumber / (5000 * KIBIBYTE_MULTIPLIER)) * 100,
  );
  const maxPercentageString = `${maxPercentageNumber}% Max`;
  const averageWeightBoundPercentile = 1600 / 5000;
  const rating =
    maxPercentageNumber > 100
      ? "Very Poor"
      : maxPercentageNumber > 50
        ? "Poor"
        : maxPercentageNumber > averageWeightBoundPercentile
          ? "Average"
          : "Good";
  const medianPercentage = `${
    Math.round((payloadNumber / (1800 * KIBIBYTE_MULTIPLIER)) * 10) / 10
  }x Median`; //uses average median range (1700 - 1900 KiB)
  const fastPercentage = `${
    Math.round((payloadNumber / (1600 * KIBIBYTE_MULTIPLIER)) * 10) / 10
  }x Fast`; //uses good mobile size (1600 KiB)

  const [sizeType, setSizeType] = useQueryParams("size", "mb");
  const sizeStringLookup: Record<string, string> = {
    rating: rating,
    mb: megaBytes,
    max: maxPercentageString,
    fast: fastPercentage,
    med: medianPercentage,
  };
  const sizeTypeSwitcher = createStringSwitcher(Object.keys(sizeStringLookup));
  return [
    sizeStringLookup[sizeType],
    () => {
      setSizeType(sizeTypeSwitcher[sizeType]);
    },
  ];
}
