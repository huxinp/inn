import React from "react";
import Transition, { TransitionProps } from "./index";

class CSSTransition extends React.Component<TransitionProps> {
  static defaultProps = {
    classNames: ""
  };
  appliedClasses: Record<
    "appear" | "enter" | "exit",
    Partial<Record<"base" | "active" | "done", string>>
  > = {
    appear: {},
    enter: {},
    exit: {}
  };
  onEnter = (maybeNode, maybeAppearing) => {
    const [node, appearing] = this.resolveArguments(maybeNode, maybeAppearing);
    this.removeClasses(node, "exit");
    this.addClass(node, appearing ? "appear" : "enter", "base");
    if (this.props.onEnter) {
      this.props.onEnter(maybeNode, maybeAppearing);
    }
  };
  onEntering = (maybeNode, maybeAppearing) => {};
  onEntered = (maybeNode, maybeAppearing) => {};
  onExit = maybeNode => {};
  onExiting = maybeNode => {};
  onExited = maybeNode => {};

  resolveArguments = (maybeNode, maybeAppearing) =>
    this.props.nodeRef
      ? [this.props.nodeRef.current, maybeNode]
      : [maybeNode, maybeAppearing];

  getClassNames = type => {};

  render(): React.ReactNode {
    const { classNames: _, ...props } = this.props;
    return (
      <Transition
        {...props}
        onEnter={this.onEnter}
        onEntered={this.onEntered}
        onEntering={this.onEntering}
        onExit={this.onExit}
        onExiting={this.onExiting}
        onExited={this.onExited}
      />
    );
  }
}
