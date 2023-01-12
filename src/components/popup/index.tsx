import { Block, View } from "@tarojs/components";
import cn from "classnames";
import Overlay from "@/components/overlay";
import Close from "@/components/icon/close";
import "./styles.scss";

export default function Popup(props: {
  className?: string;
  style?: React.CSSProperties;
  onClose?(): void;
  position?: "center" | "left" | "right" | "bottom" | "top";
  children?: React.ReactNode;
  mask?: boolean;
  allowMaskClose?: boolean;
  closable?: boolean;
  visible: boolean;
  maskStyle?: React.CSSProperties;
  maskClassName?: string;
}) {
  function handleMaskClick() {
    if (!props.closable) return;
    if (props.allowMaskClose !== false) props.onClose?.();
  }
  const maskCls = cn("i-popup-mask", props.maskClassName);
  const cls = cn(
    "i-popup",
    props.className,
    "position-" + (props.position || "center"),
    { visible: props.visible }
  );
  return (
    <Block>
      {props.mask !== false && (
        <Overlay
          style={props.maskStyle}
          visible={props.visible}
          className={maskCls}
          onClick={handleMaskClick}
        />
      )}
      <View className={cls} style={props.style}>
        {props.visible ? (
          <Block>
            {props.closable !== false && (
              <View className="i-popup-close" onClick={props.onClose}>
                <Close />
              </View>
            )}
            {props.children}
          </Block>
        ) : null}
      </View>
    </Block>
  );
}
