const PI = 3.14159265359;
const barColours = {
  good: "stroke-green-400 dark:stroke-green-400",
  average: "stroke-yellow-400 dark:stroke-yellow-400",
  poor: "stroke-red-400 dark:stroke-red-400",
};

const bgColours = {
  good: "bg-green-50 dark:bg-green-50",
  average: "bg-yellow-50 dark:bg-yellow-50",
  poor: "bg-red-50 dark:bg-red-50",
};

export default function PercentageGauge({
  percentage = 90,
}: {
  percentage?: number;
}) {
  const radius = 8;
  const diameter = 2 * radius;
  const circumferenceUnits = 2 * PI * radius;
  const mult = circumferenceUnits / 100;
  const remainder = 100 - percentage;
  const strokeColour =
    percentage > 89
      ? barColours.good
      : percentage > 49
        ? barColours.average
        : barColours.poor;
  const bgColour =
    percentage > 89
      ? bgColours.good
      : percentage > 49
        ? bgColours.average
        : bgColours.poor;
  return (
    <div
      className={`grid w-24 aspect-square ${bgColour} rounded-full box-border mx-auto`}
    >
      <svg
        viewBox={`0 0 ${diameter} ${diameter}`}
        className={`rounded-full -rotate-90 w-full h-auto aspect-square col-start-1 row-start-1 box-border`}
      >
        <circle
          style={{
            strokeDasharray: `${mult * percentage} ${mult * remainder}`,
          }}
          cx="50%"
          cy="50%"
          r="50%"
          className={`stroke-0.5 ${strokeColour} fill-none`}
        />
      </svg>
      <span className="text-2xl font-bold text-black col-start-1 row-start-1 w-fit h-fit text-center mx-auto my-auto">
        {percentage}
      </span>
    </div>
  );
}
