import { cn } from "@/utils/tailwind/twUtils";
import {
  standardText,
  mutedText,
  standardTextHover,
  mutedBgHover,
} from "./twStrings";

interface ButtonTabProps extends React.ComponentProps<`button`> {
  selected: boolean;
}

export function ButtonTab({ selected, className, ...props }: ButtonTabProps) {
  return (
    <button
      role="tab"
      // tabIndex={0}
      className={cn(
        `text-xs transition py-1 px-2 bg-transparent border-transparent border-solid border rounded-none ${mutedBgHover} ${selected ? `${standardText} border-b-current` : `${mutedText}`}  ${standardTextHover} bg-transparent m-0 `,
        className,
      )}
      {...props}
    />
  );
}

export function ButtonToggle({
  className,
  ...props
}: React.ComponentProps<`button`>) {
  return (
    <button
      className={cn(
        `transition w-fit normal-case text-sm cursor-pointer p-1 m-0 bg-transparent rounded border-none ${mutedText} ${mutedBgHover} ${standardTextHover}`,
        className,
      )}
      {...props}
    />
  );
}
