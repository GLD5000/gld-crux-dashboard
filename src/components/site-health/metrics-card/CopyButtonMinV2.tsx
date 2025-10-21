import { useState, useEffect } from "react";
import SvgButton from "./SvgButton";
export default function CopyButtonMinV2({
  data,
  customClasses,
}: {
  data: string;
  customClasses?: string | undefined;
}) {
  const [copyButtonMessage, setCopyButtonMessage] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCopyButtonMessage(true);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [copyButtonMessage]);

  return (
    <SvgButton
      type={copyButtonMessage ? "duplicate" : "tick"}
      key={`${1}copyCode`}
      text=""
      clickFunction={() => {
        navigator.clipboard.writeText(data);
        setCopyButtonMessage(false);
      }}
      showText
      reverse={false}
      buttonClasses={undefined}
      className={`flex p-1 mx-auto rounded-lg justify-center gap-2 text-sm bg-transparent border-none hover:bg-black hover:text-white hover:transition focus:text-white focus:transition hover:dark:bg-white hover:dark:text-black focus:dark:bg-white focus:dark:text-black ${customClasses}`}
      svgClasses="stroke-1 fill-none stroke-current"
      svgWrapperClasses="h-6 w-6"
      id={undefined}
      name={undefined}
    />
  );
}
