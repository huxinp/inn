import { Component, PropsWithChildren } from "react";
import Cell from "@/components/cell";
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
        <Cell.Group title="基础组件">
          <Cell title="单元格" url="/pages/packages/cell/index" isLink />
        </Cell.Group>
        <Cell.Group title="表单组件"></Cell.Group>
        <Cell.Group title="反馈组件">
          <Cell title="popup" url="/pages/packages/popup/index" isLink />
        </Cell.Group>
        <Cell.Group title="展示组件">
          <Cell title="拦截弹窗" url="/pages/packages/prompt/index" isLink />
        </Cell.Group>
        <Cell.Group title="导航组件"></Cell.Group>
      </>
    );
  }
}
