import React from "react";

export default function CrUxHistoryKeyItem({
  name,
  bg,
  deviceSelected,
  clickHandler,
  focusHandler,
  blurHandler,
}: {
  name: string;
  bg: string;
  deviceSelected: boolean;
  clickHandler: () => boolean;
  focusHandler: () => void;
  blurHandler: () => void;
}) {
  let isFocused = true;
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        const shouldFocus = clickHandler();
        if (shouldFocus && isFocused) {
          isFocused = false;
          focusHandler();
        } else if (shouldFocus) {
          isFocused = true;
          e.currentTarget.focus();
        } else {
          blurHandler();
        }
      }}
      onFocus={focusHandler}
      onBlur={blurHandler}
      // onBlur={focusHandler}
      className={`cursor-pointer bg-transparent rounded hover:bg-gray-100 dark:hover:bg-gray-800 p-1 flex align-middle gap-1 border-none  text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50`}
    >
      <div
        className={`h-[3px] w-3.5 shrink-0 rounded-full ${bg} ${deviceSelected ? "opacity-100" : "opacity-30"}`}
      ></div>
      <div
        className={`truncate whitespace-nowrap text-xs  ${deviceSelected ? "opacity-100" : "opacity-30"}`}
      >
        {name}
      </div>
    </button>
  );
}
