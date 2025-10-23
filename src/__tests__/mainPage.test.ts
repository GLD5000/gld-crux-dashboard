// import { cruxJsonArray } from "@/utils/cruxJsonArray";
// import { getDirectoryTsxList } from "@/utils/getFiles";
import {
  axeHasNoViolations,
  classNamesHaveNoRepetition,
  tailwindPrefixesHaveNoRepetition,
  linksHaveExplicitDisplay,
} from "@/utils/tests";
// import path from "path";

// beforeEach(() => {
//   jest
//     .spyOn(global, "fetch")
//     .mockImplementation(
//       jest.fn(() =>
//         Promise.resolve({ json: () => cruxJsonArray }),
//       ) as jest.Mock,
//     );
// });

// afterEach(() => {
//   jest.restoreAllMocks();
// });
const directory = __dirname.replace("__tests__", "app");
//path.join(
//   __dirname.replace("__tests__", "components"),
//   "site-health",
// );
const fileName = "page.tsx"; //"MetricTitleBenchmark.tsx";

const props = { fileName, variant: "homepage", directory };
axeHasNoViolations(props);
classNamesHaveNoRepetition(props);
tailwindPrefixesHaveNoRepetition(props);
linksHaveExplicitDisplay(props);
