import { Component, PropsWithChildren } from "react";
import Prompt from "@/components/prompt";
import Cell from "@/components/cell";
import NavBar from "@/components/nav-bar";
import "./index.scss";

export default class Index extends Component<PropsWithChildren> {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handlePrompt = () => {
    console.log("handlePrompt");
    Prompt.goBack();
  };

  render() {
    return (
      <Prompt onMessage={this.handlePrompt}>
        <NavBar title="prompt" />
        <Cell.Group title="基础组件" round border>
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
        <Cell.Group title="基础组件" border>
          <Cell title="单元格" />
          <Cell title="button" value="内容" />
          <Cell title="单元格" desc="这里是描述" />
          <Cell title="cell" value="内容" desc="这里也是描述内容" />
        </Cell.Group>
      </Prompt>
    );
  }
}
