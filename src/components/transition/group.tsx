import React from "react";
import {
  getChildMapping,
  getInitialChildMapping,
  getNextChildMapping
} from "./ChildMapping";
import Context from "./context";

type TransitionGroupProps = {
  component: string;
  children: React.ReactNode;
  appear: boolean;
  enter: boolean;
  exit: boolean;
  childFactory(): JSX.Element;
};

const values = Object.values || (obj => Object.keys(obj).map(k => obj[k]));
class TransitionGroup extends React.Component<
  TransitionGroupProps,
  {
    contextValue: { isMounting: boolean };
    handleExited(): void;
    firstRender: boolean;
    children: Record<string, React.ReactElement>;
  }
> {
  mounted: boolean;
  constructor(props, context) {
    super(props, context);

    const handleExited = this.handleExited.bind(this);

    this.state = {
      children: {},
      contextValue: { isMounting: true },
      handleExited,
      firstRender: true
    };
  }
  componentDidMount() {
    this.mounted = true;
    this.setState({
      contextValue: { isMounting: false }
    });
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  static getDerivedStateFromProps(
    nextProps,
    { children: prevChildMapping, handleExited, firstRender }
  ) {
    return {
      children: firstRender
        ? getInitialChildMapping(nextProps, handleExited)
        : getNextChildMapping(nextProps, prevChildMapping, handleExited),
      firstRender: false
    };
  }
  handleExited(child, node) {
    let currentChildMapping = getChildMapping(this.props.children);
    if (child.key in currentChildMapping) return;
    if (child.props.onExited) {
      child.props.onExited(node);
    }
    if (this.mounted) {
      this.setState(state => {
        let children = { ...state.children };
        delete children[child.key];
        return { children };
      });
    }
  }
  render() {
    const { component: Component, childFactory, ...props } = this.props;
    const { contextValue } = this.state;
    const children = values(this.state.children).map(childFactory);
    delete props.appear;
    delete props.enter;
    delete props.exit;
    if (Component === null) {
      return (
        <Context.Provider value={contextValue}>{children}</Context.Provider>
      );
    }
    return (
      <Context.Provider value={contextValue}>
        <Component {...props}>{children}</Component>
      </Context.Provider>
    );
  }
}
