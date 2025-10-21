import React from "react";
import {
  highlightTextInv,
  mutedBg,
  mutedBgInv,
  standardText,
} from "../../ui/twStrings";
import { cn } from "@/utils/tailwind/twUtils";

type Breadcrumb = {
  path?: string;
  title: string;
  breadcrumbClickHandler?: () => void;
};
interface BreadcrumbLinkProps extends React.ComponentProps<"li"> {
  input: Breadcrumb;
  isCategory: boolean;
}
export default function BreadcrumbLink({
  input,
  isCategory,
  className,
  ...props
}: BreadcrumbLinkProps) {
  const { path, title, breadcrumbClickHandler } = input;
  return (
    <li
      tabIndex={0}
      className={cn(
        `w-fit px-4 py-1 rounded-sm border border-solid ${isCategory ? "text-base ml-[2px]" : "text-sm h-[28px] mt-auto"} ${path ? `${mutedBg} ${standardText}` : `${mutedBgInv} ${highlightTextInv}`} skew-x-[-20deg] grid items-center key`,
        className,
      )}
      onFocus={() => {
        if (breadcrumbClickHandler) breadcrumbClickHandler();
      }}
      // onMouseUp={() => {
      //     breadcrumbClickHandler && breadcrumbClickHandler();
      // }}
      {...props}
    >
      {path && breadcrumbClickHandler ? (
        <div className={`skew-x-20 block text-inherit cursor-pointer`}>
          {title}
        </div>
      ) : (
        <div className={`skew-x-20 block text-inherit`}>{title}</div>
      )}
    </li>
  );
}
