import { View } from "@tarojs/components";
import cn from "classnames";
import "./styles.scss";

export default function Overlay(props: {
  onClick?(): void;
  className?: string;
  style?: React.CSSProperties;
  visible: boolean;
}) {
  const cls = cn("i-overlay", props.className, { visible: props.visible });
  return (
    <View
      className={cls}
      style={props.style}
      onClick={props.onClick}
      catchMove
    />
  );
}
