import { Component, PropsWithChildren } from "react";
import { View } from "@tarojs/components";
import Cell from "@/components/cell";
import Back from "@/components/icon/back";
import "./index.scss";

export default class Index extends Component<PropsWithChildren> {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <>
        <View className="header">Inn</View>
        <View className="content">
          内容
          <Back size={16} />
        </View>
        <Cell.Group className="footer" title="导航">
          <Cell title="快速上手" url="/pages/quick-start/index" isLink />
          <Cell title="样式覆盖" url="/pages/custom-style/index" isLink />
          <Cell title="定制主题" url="/pages/theme/index" isLink />
        </Cell.Group>
      </>
    );
  }
}
