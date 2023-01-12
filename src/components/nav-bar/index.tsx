import { View } from "@tarojs/components";
import { useContext } from "react";
import PromptContext from "@/components/prompt/context";
import Back from "@/components/icon/back";
import getCustomNavigationRect from "../utils";
import "./styles.scss";

const { top, navigationBarHeight } = getCustomNavigationRect();

export const navHeight = (navigationBarHeight || 0) + (top as number);

export default function NavBar(props: {
  title?: React.ReactNode;
  center?: boolean;
  background?: string;
}) {
  const { handleLeave } = useContext(PromptContext);
  return (
    <View
      className="i-nav-bar"
      style={{
        paddingTop: top,
        height: navigationBarHeight,
        background: props.background
      }}
    >
      <View className="left">
        <Back className="back" onClick={handleLeave} />
        <View className="home"></View>
      </View>
      <View className="title">{props.title}</View>
    </View>
  );
}
