import { Text } from "@tarojs/components";

export default function Icon(props: {
  size?: number;
  color?: string;
  className?: string;
  onClick?(): void;
  getSVGStr(size?: number, color?: string): string;
}) {
  return (
    <Text
      className={props.className}
      onClick={props.onClick}
      style={{
        display: "inline-block",
        width: props.size || 20,
        height: props.size || 20,
        background: `
          url("data:image/svg+xml;utf8,${props.getSVGStr(
            props.size,
            props.color
          )}") no-repeat center
        `
      }}
    />
  );
}
