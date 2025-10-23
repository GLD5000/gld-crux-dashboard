"use client";
import React, { ReactNode, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableWrapper,
} from "../ui/table";
import { highlightTextHover, standardText } from "../ui/twStrings";
import {
  useQueryParamsBoolean,
  useQueryParamsNumber,
  useQueryParamsToggle,
} from "@/utils/searchParamsURL";

export interface MetricsTableProps {
  columnData: Record<string, Record<string, string>>;
  columnFunctions?: Record<string, (input: string) => ReactNode>;
  tableRows: Record<string, string>[];
  tableFooter?: Record<string, string>;
  tableCaption?: string;
}

interface QueryParams {
  deviceSelected: number;
  setDeviceSelected: (value: number) => void;
  dataSelected: number;
  setDataSelected: (value: number) => void;
  zoom: boolean;
  setZoom: (value: boolean) => void;
  lineStyle: string;
  setLineStyle: (value?: string) => void;
}

export default function MetricsTable({ data }: { data?: MetricsTableProps }) {
  const [sortKey, setSortKey] = useState<string>();
  const [sortDirection, setSortDirection] = useState(true);
  const [deviceSelected, setDeviceSelected] = useQueryParamsNumber("ks", -1);
  const [dataSelected, setDataSelected] = useQueryParamsNumber("ds", 0);
  const [zoom, setZoom] = useQueryParamsBoolean("zs", true);
  const [lineStyle, setLineStyle] = useQueryParamsToggle("ls", [
    "cma",
    "point",
    "line",
  ]);
  if (!data) return null;
  const { columnFunctions, columnData, tableRows, tableFooter, tableCaption } =
    data;
  const queryParams: QueryParams = {
    zoom,
    setZoom,
    deviceSelected,
    setDeviceSelected,
    dataSelected,
    setDataSelected,
    lineStyle,
    setLineStyle,
  };
  return (
    <TableWrapper className="w-full h-auto max-w-160">
      <Table>
        {tableCaption && <TableCaption>{tableCaption}</TableCaption>}
        <TableHeader>
          <TableRow>
            {Object.entries(columnData).map((entry) => {
              const [key, { title }] = entry;
              return (
                <TableHead
                  onClick={() => {
                    setSortKey(key);
                    setSortDirection(!sortDirection);
                  }}
                  key={`${title}`}
                  className={`text-left font-normal ${highlightTextHover} hover:underline hover:underline-offset-2 transition cursor-pointer`}
                >
                  {title}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableRows
            .sort((a, b) =>
              !sortKey
                ? 0
                : sortDirection
                  ? sortCompare(a[sortKey], b[sortKey])
                  : sortCompare(b[sortKey], a[sortKey]),
            )
            .map((tableRow, index) => (
              <TableRow key={`tableRow-${index}`}>
                {Object.entries(columnData).map((entry) => {
                  const [keyString, { title, className }] = entry;
                  return (
                    <TableCell
                      key={`${tableRow[keyString]}-${index}-${title}`}
                      className={`w-fit text-left font-sans  cursor-pointer ${className ? className : ""}`}
                      onClick={() => {
                        selectLineGraph({
                          rowName: tableRow.device,
                          targetLineStyle:
                            keyString === "average"
                              ? "cma"
                              : keyString === "trend"
                                ? "line"
                                : "point",
                          ...queryParams,
                        });
                      }}
                    >
                      {columnFunctions && columnFunctions[keyString]
                        ? columnFunctions[keyString](tableRow[keyString])
                        : tableRow[keyString]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
        </TableBody>
        {tableFooter && (
          <TableFooter className="font-light text-sm">
            <TableRow className="border-none">
              {Object.entries(columnData).map((entry, index) => {
                const [keyString, { title, className }] = entry;
                return (
                  <TableCell
                    key={`${tableFooter[keyString]}-${index}-${title}`}
                    className={`text-left ${standardText} font-sans font-normal cursor-pointer ${className ? className : ""}`}
                    onClick={() => {
                      selectLineGraph({
                        rowName: "Overall",
                        targetLineStyle:
                          keyString === "average"
                            ? "cma"
                            : keyString === "trend"
                              ? "line"
                              : "point",
                        ...queryParams,
                      });
                    }}
                  >
                    {columnFunctions && columnFunctions[keyString]
                      ? columnFunctions[keyString](tableFooter[keyString])
                      : tableFooter[keyString]}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableWrapper>
  );
}

function sortCompare(a: string, b: string) {
  return isNaN(Number(a)) ? a.localeCompare(b) : Number(a) - Number(b);
}

interface SelectLineGraphParams extends QueryParams {
  rowName: string;
  targetLineStyle: string;
}

function selectLineGraph(params: SelectLineGraphParams) {
  const {
    rowName,
    deviceSelected,
    setDeviceSelected,
    dataSelected,
    setDataSelected,
    zoom,
    setZoom,
    lineStyle,
    setLineStyle,
    targetLineStyle,
  } = params;
  const indexesLookup: Record<string, number[]> = {
    "UK All": [0, 0],
    "UK Phone": [1, 1],
    "UK Tablet": [1, 2],
    "UK Desktop": [1, 3],
    "ROW All": [0, 1],
    "ROW Phone": [2, 1],
    "ROW Tablet": [2, 2],
    "ROW Desktop": [2, 3],
    Overall: [0, -1],
  };
  const [targetDataIndex, targetDeviceIndex] = indexesLookup[rowName];
  if (
    deviceSelected === targetDeviceIndex &&
    dataSelected === targetDataIndex &&
    targetLineStyle === lineStyle
  ) {
    setDeviceSelected(-1);
    setDataSelected(0);
    setZoom(!zoom);
    setLineStyle("point");
  } else {
    setDeviceSelected(
      targetDataIndex === 0
        ? Math.min(1, targetDeviceIndex)
        : targetDeviceIndex,
    );
    setDataSelected(targetDataIndex);
    if (!zoom) {
      setZoom(!zoom);
    }
    if (targetLineStyle !== lineStyle) {
      setLineStyle(targetLineStyle);
    }
  }
}
