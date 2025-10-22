import { useQueryParamsBoolean } from "@/utils/searchParamsURL";

export default function CrUxHistoryZoomButton() {
  const [zoom, setZoom] = useQueryParamsBoolean("zs", true);
  return (
    <button
      tabIndex={0}
      onClick={() => {
        setZoom(!zoom);
      }}
      // onFocus={() => {
      //     setZoom(!zoom);
      // }}
      type="button"
      className="grid grid-cols-[auto_auto] gap-1 py-0 px-1 bg-transparent rounded h-fit border-none items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-50 focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-900 dark:focus:text-gray-50 focus-visible:border-none"
    >
      <div className="border grid border-none rounded-full w-6 h-6 my-auto">
        {/* <svg
                    viewBox="0 0 16 16"
                    className="w-full h-full stroke-current fill-none"
                >
                    <path
                        className="stroke-current stroke-1"
                        d="M 2,15 l 5.2,-5.2"
                    />
                    <circle cx={10} cy={6.5} r={4} />

                    <path className="stroke-current stroke-1" d="M 6.5,6.5 l 7,0" />

                    {!zoom && (
                        <path
                            className="stroke-current stroke-1"
                            d="M 10,3 l 0,7"
                        />
                    )}
                </svg> */}
        <svg
          viewBox="0 0 16 16"
          className="w-full h-full stroke-current fill-none"
        >
          <path className="stroke-current stroke-1" d="M 2,14 l 4,-4" />
          <circle cx={9} cy={7} r={4} />

          <path className="stroke-current stroke-1" d="M 7,7 l 4,0" />

          {!zoom && (
            <path className="stroke-current stroke-1" d="M 9,5 l 0,4" />
          )}
        </svg>
      </div>
      <span className="text-xs block h-fit my-auto">Zoom</span>
    </button>
  );
}
