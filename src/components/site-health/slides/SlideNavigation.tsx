import React from "react";
import BreadcrumbLink from "./BreadcrumbLink";
import { useQueryParams } from "@/utils/searchParamsURL";

export type Path = {
  path: string;
  title: string;
};
export const groupSlides: Record<string, Record<string, string>> = {
  cwv: {
    cwv: "Core Web Vitals",
    lcp: "Load Time - LCP",
    cls: "Stability - CLS",
    inp: "Responsiveness - INP",
  },
  owv: {
    owv: "Other Web Vitals",
    rtt: "User Speed - RTT",
    ttfb: "Load Time - TTFB",
    fcp: "Visual Feedback - FCP",
  },
};
const SlideNavigationPathObject: Record<string, string> = {
  ...groupSlides.cwv,

  ...groupSlides.owv,
};
const keyLookup: Record<string, string> = {
  cwv: "cwv",
  lcp: "lcp",
  cls: "cls",
  inp: "inp",
  owv: "owv",
  fcp: "fcp",
  ttfb: "ttfb",
  rtt: "rtt",
};

export default function SlideNavigation() {
  const [slideKey, setSlideKey] = useQueryParams("sk", "lcp");
  return (
    <nav>
      <ol className="flex flex-wrap gap-1 list-none justify-center my-1">
        {Object.entries(SlideNavigationPathObject)
          // .filter((breadcrumb) => {
          //     const isCore = !cwv[breadcrumb[0]];
          //     const isOther = !owv[breadcrumb[0]];
          //     const keyIsCore = !cwv[slideKey];
          //     const keyIsOther = !owv[slideKey];
          //     const isCategory = getIsSlideNavCategory(breadcrumb[0]);
          //     const shouldShow =
          //         isCategory ||
          //         (isCore && keyIsCore) ||
          //         (isOther && keyIsOther);
          //     if (shouldShow) {
          //         return true;
          //     } else {
          //         return false;
          //     }
          // })
          .map((breadcrumb, index) => {
            const isCore = !groupSlides.cwv[breadcrumb[0]];
            const isOther = !groupSlides.owv[breadcrumb[0]];
            const keyIsCore = !groupSlides.cwv[slideKey];
            const keyIsOther = !groupSlides.owv[slideKey];
            const isCategory = getIsSlideNavCategory(breadcrumb[0]);
            const shouldShow =
              isCategory || (isCore && keyIsCore) || (isOther && keyIsOther);
            return (
              <BreadcrumbLink
                key={`breadcrumb-${index}`}
                className={`${shouldShow ? "" : "hidden"}`}
                isCategory={isCategory}
                input={
                  breadcrumb[0] === slideKey
                    ? { title: breadcrumb[1] }
                    : {
                        path: breadcrumb[0],
                        title: breadcrumb[1],
                        breadcrumbClickHandler: () => {
                          setSlideKey(keyLookup[breadcrumb[0]]);
                        },
                      }
                }
              />
            );
          })}{" "}
      </ol>
    </nav>
  );
}
export function getIsSlideNavCategory(keyString: string) {
  return keyString === "cwv" || keyString === "owv";
}
