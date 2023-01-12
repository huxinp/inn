import React, { Ref } from "react";
import { CSSTransition } from "react-transition-group";
import Context from "./context";
import config from "./config";

function forceReflow(node) {
  return node.scrollTop;
}

const enum Status {
  UNMOUNTED = "unmounted",
  EXITED = "exited",
  ENTERING = "entering",
  ENTERED = "entered",
  EXITING = "exiting"
}

export type TransitionProps = {
  in: boolean;
  unmountOnExit: boolean;
  mountOnEnter: boolean;
  nodeRef?: Ref<HTMLElement>;
  timeout?:
    | number
    | {
        appear?: number;
        enter?: number;
        exit?: number;
      };
  appear?: boolean;
  enter?: boolean;
  exit?: boolean;
  addEndListener?(): void;
  onEnter?(): void;
  onEntering?(): void;
  onEntered?(): void;
  onExit?(): void;
  onExiting?(): void;
  onExited?(): void;
  children:
    | React.ReactNode
    | ((status: Status, childProps: any) => JSX.Element);
};

export default class Transition extends React.Component<
  TransitionProps,
  {
    status: Status;
  }
> {
  static contextType = Context;
  appearStatus: null | Status;
  nextCallback: null | {
    (event: any): void;
    cancel(): void;
  };
  constructor(props: TransitionProps, context: { isMounting: boolean }) {
    super(props, context);
    let parentGroup = context;
    let appear =
      parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    let initialStatus: Status;
    this.appearStatus = null;
    if (props.in) {
      if (appear) {
        initialStatus = Status.EXITED;
        this.appearStatus = Status.ENTERING;
      } else {
        initialStatus = Status.ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = Status.UNMOUNTED;
      } else {
        initialStatus = Status.EXITED;
      }
    }
    this.state = {
      status: initialStatus
    };
    this.nextCallback = null;
  }
  static getDerivedStateFromProps({ in: nextIn }, prevState) {
    if (nextIn && prevState.status === Status.UNMOUNTED) {
      return { status: Status.EXITED };
    }
    return null;
  }
  componentDidMount(): void {
    this.updateStatus(true, this.appearStatus);
  }
  componentDidUpdate(
    prevProps: Readonly<{
      in: boolean;
      unmountOnExit: boolean;
      mountOnEnter: boolean;
      nodeRef?: React.Ref<HTMLElement> | undefined;
    }>,
    prevState: Readonly<{ status: Status }>,
    snapshot?: any
  ): void {
    let nextStatus: null | Status = null;
    if (prevProps !== this.props) {
      const { status } = this.state;
      if (this.props.in) {
        if (status !== Status.ENTERING && status !== Status.ENTERED) {
          nextStatus = Status.ENTERING;
        }
      } else {
        if (status === Status.ENTERING || status === Status.ENTERED) {
          nextStatus = Status.EXITING;
        }
      }
    }
    this.updateStatus(false, nextStatus);
  }
  componentWillUnmount(): void {
    this.cancelNextCallback();
  }

  getTimeouts() {
    const { timeout } = this.props;
    let exit: number | undefined,
      enter: number | undefined,
      appear: number | undefined;
    if (timeout != null && typeof timeout !== "number") {
      exit = timeout.exit;
      enter = timeout.enter;
      appear = timeout.appear !== undefined ? timeout.appear : enter;
    } else {
      exit = enter = appear = timeout;
    }
    return { exit, enter, appear };
  }

  updateStatus(mounting = false, nextStatus: null | Status) {
    if (nextStatus !== null) {
      this.cancelNextCallback();
      if (nextStatus === Status.ENTERING) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          const node = this.props.nodeRef
            ? this.props.nodeRef.current
            : ReactDOM.findDOMNode(this);
          if (node) forceReflow(node);
        }
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (
      this.props.unmountOnExit &&
      this.state.status === Status.EXITED
    ) {
      this.setState({ status: Status.UNMOUNTED });
    }
  }

  performEnter(mounting: boolean) {
    const { enter } = this.props;
    const appearing = this.context ? this.context.isMounting : mounting;
    const [maybeNode, maybeAppearing] = this.props.nodeRef
      ? [appearing]
      : [ReactDOM.findDOMNode(this), appearing];
    const timeouts = this.getTimeouts();
    const enterTimeout = appearing ? timeouts.appear : timeouts.enter;
    if ((!mounting && !enter) || config.disabled) {
      this.safeSetState({ status: Status.ENTERED }, () => {
        this.props.onEntered?.(maybeNode);
      });
      return;
    }
    this.props.onEnter?.(maybeNode, maybeAppearing);
    this.safeSetState({ status: Status.ENTERING }, () => {
      this.onTransitionEnd(enterTimeout, () => {
        this.safeSetState({ status: Status.ENTERED }, () => {
          this.props.onEntered?.(maybeNode, maybeAppearing);
        });
      });
    });
  }

  performExit() {
    const { exit } = this.props;
    const timeouts = this.getTimeouts();
    const maybeNode = this.props.nodeRef
      ? undefined
      : ReactDOM.findDOMNode(this);

    if (!exit || config.disabled) {
      this.safeSetState({ status: Status.EXITED }, () => {
        this.props.onExited?.(maybeNode);
      });
      return;
    }
    this.props.onExit?.(maybeNode);
    this.safeSetState({ status: Status.EXITING }, () => {
      this.props.onExiting?.(maybeNode);
      this.onTransitionEnd(timeouts.exit, () => {
        this.safeSetState({ status: Status.EXITED }, () => {
          this.props.onExited?.(maybeNode);
        });
      });
    });
  }

  cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  }

  safeSetState(nextState: typeof this.state, callback: () => void) {
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  }

  setNextCallback(callback) {
    let active = true;
    const nextCallback = event => {
      if (active) {
        active = false;
        this.nextCallback = null;
        callback(event);
      }
    };
    nextCallback.cancel = () => {
      active = false;
    };
    this.nextCallback = nextCallback;
    return this.nextCallback;
  }

  onTransitionEnd(timeout: number, handler: () => void) {
    this.setNextCallback(handler);
    if (!this.nextCallback) return;
    const node = this.props.nodeRef
      ? this.props.nodeRef.current
      : ReactDOM.findDOMNode(this);
    const doesNotHaveTimeoutOrListener =
      timeout == null && !this.props.addEndListener;
    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      const [maybeNode, maybeNextCallback] = this.props.nodeRef
        ? [this.nextCallback]
        : [node, this.nextCallback];
      this.props.addEndListener(maybeNode, maybeNextCallback);
    }
    if (timeout != null) {
      setTimeout(this.nextCallback, timeout);
    }
  }

  render() {
    const status = this.state.status;
    if (status === Status.UNMOUNTED) {
      return null;
    }
    const {
      children,
      in: _in,
      mountOnEnter: _mountOnEnter,
      unmountOnExit: _unmountOnExit,
      appear: _appear,
      enter: _enter,
      exit: _exit,
      timeout: _timeout,
      addEndListener: _addEndListener,
      onEnter: _onEnter,
      onEntering: _onEntering,
      onEntered: _onEntered,
      onExit: _onExit,
      onExiting: _onExiting,
      onExited: _onExited,
      nodeRef: _nodeRef,
      ...childProps
    } = this.props;
    return (
      <Context.Provider value={null}>
        {typeof children === "function"
          ? children(status, childProps)
          : React.cloneElement(React.Children.only(children), childProps)}
      </Context.Provider>
    );
  }
}
