import NavBar from "@/components/nav-bar";
import { CustomWrapper, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";

export default function Header(props: {
  children?: React.ReactNode;
  onSticky?(sticky: boolean): void;
}) {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const observer = Taro.createIntersectionObserver(this);
    observer.relativeToViewport().observe("#i-header", res => {
      console.log("header intersection observer", res);
      setSticky(res.intersectionRatio === 0);
    });
  }, []);

  useEffect(() => {
    props.onSticky?.(sticky);
  }, [sticky, props.onSticky]);

  return (
    <View id="i-header">
      <CustomWrapper>
        <NavBar />
        {props.children}
      </CustomWrapper>
    </View>
  );
}
