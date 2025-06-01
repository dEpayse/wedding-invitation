import { SpacerProps } from "@/app/types/spacer";

export default function VerticalSpacer({ size }: SpacerProps) {
  return <div style={{ height: `${size}px`, width: '100%' }} />;
}