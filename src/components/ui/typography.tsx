import { cn } from "@/utils/tailwind/twUtils";
import { mutedBg, mutedText, standardText } from "./twStrings";

function TypographyH1({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        `scroll-m-20 text-4xl font-Avenir-black tracking-tight lg:text-5xl ${standardText}`,
        className,
      )}
      {...props}
    />
  );
}
function TypographyH2({ className, ...props }: React.ComponentProps<`h2`>) {
  return (
    <h2
      className={cn(
        `scroll-m-20 border-b pb-2 text-3xl font-Avenir-heavy tracking-tight first:mt-0 ${standardText}`,
        className,
      )}
      {...props}
    />
  );
}
function TypographyH3({ className, ...props }: React.ComponentProps<`h3`>) {
  return (
    <h3
      className={cn(
        `scroll-m-20 text-2xl font-Avenir-heavy tracking-tight ${standardText}`,
        className,
      )}
      {...props}
    />
  );
}
function TypographyH4({ className, ...props }: React.ComponentProps<`h4`>) {
  return (
    <h4
      className={cn(
        `scroll-m-20 text-xl font-Avenir-heavy tracking-tight ${standardText}`,
        className,
      )}
      {...props}
    />
  );
}
function TypographyP({ className, ...props }: React.ComponentProps<`p`>) {
  return (
    <p
      {...props}
      className={cn(`leading-7 ${standardText} text-base`, className)}
    />
  );
}
function TypographyBlockquote({
  className,
  ...props
}: React.ComponentProps<`blockquote`>) {
  return (
    <blockquote
      {...props}
      className={cn(`mt-6 border-l-2 pl-6 italic ${standardText}`, className)}
    />
  );
}
function TypographyList({ className, ...props }: React.ComponentProps<`ul`>) {
  return (
    <ul
      {...props}
      className={cn(`list-disc ${standardText} font-Avenir-medium`, className)}
    />
  );
}
function TypographyListItem({
  className,
  ...props
}: React.ComponentProps<`li`>) {
  return (
    <li
      {...props}
      className={cn(`leading-7 ${mutedText} text-sm ml-6 my-1`, className)}
    />
  );
}
function TypographyInlineCode({
  className,
  ...props
}: React.ComponentProps<`code`>) {
  return (
    <code
      className={cn(
        `relative rounded ${mutedBg} px-[0.3rem] py-[0.2rem] font-mono text-sm font-Avenir-heavy ${standardText}`,
        className,
      )}
      {...props}
    />
  );
}
function TypographyLead({ className, ...props }: React.ComponentProps<`p`>) {
  return <p {...props} className={cn(`text-xl ${mutedText}`, className)} />;
}
function TypographyLarge({ className, ...props }: React.ComponentProps<`div`>) {
  return (
    <div
      {...props}
      className={cn(`text-lg font-Avenir-heavy ${standardText}`, className)}
    />
  );
}
function TypographySmall({
  className,
  ...props
}: React.ComponentProps<`small`>) {
  return (
    <small
      {...props}
      className={cn(
        `text-sm font-medium leading-none ${standardText}`,
        className,
      )}
    />
  );
}
function TypographyMuted({ className, ...props }: React.ComponentProps<`p`>) {
  return <p {...props} className={cn(`text-sm ${mutedText}`, className)} />;
}
function TypographyLink({ className, ...props }: React.ComponentProps<`a`>) {
  return <a {...props} className={cn(`text-sm ${mutedText}`, className)} />;
}
export {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyBlockquote,
  TypographyList,
  TypographyListItem,
  TypographyInlineCode,
  TypographyLead,
  TypographyLarge,
  TypographyLink,
  TypographySmall,
  TypographyMuted,
};
