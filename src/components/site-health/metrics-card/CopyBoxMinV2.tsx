import CopyButtonMinV2 from "./CopyButtonMinV2";

export default function CopyBoxMinV2({ innerValue }: { innerValue: string }) {
  return (
    <div className="grid w-fit h-fit grow-0">
      <CopyButtonMinV2 data={innerValue} />
    </div>
  );
}
