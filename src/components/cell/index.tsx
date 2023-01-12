import Taro from "@tarojs/taro";
import { View, Icon } from "@tarojs/components";
import cn from "classnames";
import Block from "@/components/block";
import type { BlockProps } from "@/components/block";
import "./styles.scss";

export type CellProps = {
  className?: string;
  id?: string;
  style?: React.CSSProperties|string
  title?: React.ReactNode
  titleWidth?: string;
  value?: string|number
  icon?: string;
  desc?: string;
  size?: 'large';
  border?: boolean;
  center?: boolean;
  url?: string;
  linkType?: 'redirectTo'|'switchTab'|'reLaunch';
  clickable?: boolean;
  isLink?: boolean
  required?: boolean
  arrowDirection?: 'left'|'up'|'down';
  onClick?(): void
}

export type CellGroupProps = Omit<BlockProps, never>;

const baseCls = 'i-cell';
export default function Cell(props: CellProps) {
  function handleClick() {
    props.onClick?.();
    if (props.isLink && props.url) {
      Taro[props.linkType || 'navigateTo']({
        url: props.url
      })
      return
    }
  }
  return (
    <View
      className={cn(baseCls, props.className)}
      style={props.style}
      onClick={handleClick}
    >
      <View className={baseCls + '-title'}>
        {props.icon}
        {props.title}
      </View>
      <View className={baseCls + '-value'}>
        {props.value}
      </View>
      {props.desc && <View className={baseCls + '-desc'}>
        {props.desc}
      </View>}
    </View>
  );
}
Cell.Group = function Group(props: CellGroupProps) {
  const cls = cn(baseCls + '-group', props.className);
  return <Block {...props} className={cls} />
};
