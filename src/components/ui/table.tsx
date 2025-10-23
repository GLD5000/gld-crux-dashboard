"use client";

import { cn } from "@/utils/tailwind/twUtils";
import * as React from "react";
import {
  mutedBgHover,
  mutedBorderBottom,
  mutedText,
  standardBg,
  standardText,
  standardTextHover,
} from "./twStrings";

export function TableWrapper({
  className,
  ...props
}: React.ComponentProps<`section`>) {
  return (
    <div className={cn(`p-2 md:p-4 ${mutedText} relative w-full`, className)}>
      <section
        data-slot="table-wrapper"
        className={` relative w-full overflow-x-auto`}
        {...props}
      />
    </div>
  );
}
export function Table({ className, ...props }: React.ComponentProps<`table`>) {
  return (
    <table
      data-slot="table"
      className={cn(`w-full caption-bottom text-sm ${standardBg}`, className)}
      {...props}
    />
  );
}

export function TableHeader({
  className,
  ...props
}: React.ComponentProps<`thead`>) {
  return (
    <thead
      data-slot="table-header"
      className={cn(`[&_tr]:border-b ${standardBg}`, className)}
      {...props}
    />
  );
}

export function TableBody({
  className,
  ...props
}: React.ComponentProps<`tbody`>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(`${standardBg}`, className)}
      {...props}
    />
  );
}

export function TableFooter({
  className,
  ...props
}: React.ComponentProps<`tfoot`>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(`bg-transparent ${mutedBgHover} border-none`, className)}
      {...props}
    />
  );
}
//data-[state=selected]:bg-neutral-100 dark:data-[state=selected]:bg-neutral-600
export function TableRow({ className, ...props }: React.ComponentProps<`tr`>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        `${mutedBgHover} bg-transparent ${mutedText} ${standardTextHover}  border border-transparent ${mutedBorderBottom} border-solid transition-colors`,
        className,
      )}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: React.ComponentProps<`th`>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        `text-foreground ${standardText} h-10 px-2 text-left items-center font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5`,
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: React.ComponentProps<`td`>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        `p-2 whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5`,
        className,
      )}
      {...props}
    />
  );
}

export function TableCaption({
  className,
  ...props
}: React.ComponentProps<`caption`>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(`mt-4 text-sm font-light`, className)}
      {...props}
    />
  );
}
