import { View } from "@tarojs/components";
import cn from "classnames";
import "./styles.scss";

export type BlockProps = {
  className?: string;
  style?: React.CSSProperties | string;
  children?: React.ReactNode;
  title?: string;
  border?: boolean;
  round?: boolean;
};

const baseCls = "i-block";
export default function Block(props: BlockProps) {
  const cls = cn(baseCls, props.className);
  const contentCls = cn(baseCls + "-content", {
    [baseCls + "-round"]: props.round,
    [baseCls + "-border"]: props.border
  });
  return (
    <View className={cls} style={props.style}>
      {props.title ? (
        <View className={baseCls + "-title"}>{props.title}</View>
      ) : null}
      <View className={contentCls}>{props.children}</View>
    </View>
  );
}
