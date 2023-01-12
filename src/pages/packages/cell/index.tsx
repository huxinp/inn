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
        <Cell.Group title="基础组件" round>
          <Cell title="单元格" />
          <Cell title="button" value="内容" />
          <Cell title="单元格" desc="这里是描述" />
          <Cell title="cell" value="内容" desc="这里也是描述内容" />
        </Cell.Group>
        <Cell.Group title="基础组件" round>
          <Cell title="单元格" />
          <Cell title="button" value="内容" />
          <Cell title="单元格" desc="这里是描述" />
          <Cell title="cell" value="内容" desc="这里也是描述内容" />
        </Cell.Group>
        <Cell.Group title="基础组件">
          <Cell title="单元格" />
          <Cell title="button" value="内容" />
          <Cell title="单元格" desc="这里是描述" />
          <Cell title="cell" value="内容" desc="这里也是描述内容" />
        </Cell.Group>
      </>
    );
  }
}
