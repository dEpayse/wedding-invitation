import { SpacerProps } from "@/app/types/spacer";

export default function HorizontalSpacer({ size }: SpacerProps) {
  return <div style={{ height: '1px', width: `${size}px`, display: 'inline-block' }} />;
}
