import React, { Dispatch } from "react";
import CruxLineStyleButtons from "./CruxLineStyleButtons";
import CrUxHistoryZoomButton from "./CrUxHistoryZoomButton";
import CrUxHistoryKey from "./CrUxHistoryKey";

export default function CrUxHistoryControls({
  names,
  deviceSelected,
  setDeviceSelected,
  setXyIndex,
}: {
  names: string[];
  deviceSelected: number;
  setDeviceSelected: Dispatch<number>;
  setXyIndex?: Dispatch<number[] | undefined>;
}) {
  return (
    <div className="flex flex-wrap justify-between align-middle p-0 my-1 gap-2">
      <div className="flex gap-2 justify-between align-middle h-fit w-full">
        <CruxLineStyleButtons />
        <CrUxHistoryZoomButton />
      </div>
      <CrUxHistoryKey
        names={names}
        deviceSelected={deviceSelected}
        setDeviceSelected={setDeviceSelected}
        setXyIndex={setXyIndex}
      />
    </div>
  );
}
