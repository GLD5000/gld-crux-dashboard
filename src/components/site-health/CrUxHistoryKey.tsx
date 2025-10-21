import React, { Dispatch } from "react";
import CrUxHistoryKeyItem from "./CrUxHistoryKeyItem";
import { crUxHistoryGraphBgs } from "./CrUxHistoryGraph";

export default function CrUxHistoryKey({
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
    <div className="w-fit md:min-w-[25.75em] flex flex-wrap gap-2 ml-auto mr-0 p-0 md:justify-end">
      {names.map((name, index) => (
        <CrUxHistoryKeyItem
          deviceSelected={deviceSelected === -1 || deviceSelected === index}
          bg={crUxHistoryGraphBgs[index]}
          key={`${index}${name}`}
          name={name}
          clickHandler={() => {
            if (setXyIndex) setXyIndex(undefined);
            return deviceSelected !== index;
          }}
          focusHandler={() => {
            setDeviceSelected(index);
            if (setXyIndex) setXyIndex(undefined);
          }}
          blurHandler={() => {
            if (deviceSelected !== index) {
              setDeviceSelected(index);
            } else {
              setDeviceSelected(-1);
            }
            if (setXyIndex) setXyIndex(undefined);
          }}
          // focusHandler={() => {
          //     !xyIndex && setDeviceSelected(-1);
          // }}
        />
      ))}
    </div>
  );
}
