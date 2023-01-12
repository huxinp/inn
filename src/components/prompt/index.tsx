import { PageContainer } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import PromptContext from "./context";

function goBack(url = "/pages/index/index") {
  const pages = Taro.getCurrentPages();
  if (pages.length > 1) {
    return Taro.navigateBack();
  } else {
    return Taro.switchTab({ url });
  }
}

export default function Prompt(props: {
  skeleton?: React.ReactNode;
  onMessage?(): void;
  children?: React.ReactNode;
}) {
  const [show, setShow] = useState(true);
  const [prompt, setPrompt] = useState(!!props.onMessage);

  function handleLeave() {
    if (!prompt) return goBack();
    setShow(false);
    props.onMessage?.();
    Taro.nextTick(() => {
      setShow(true);
      setPrompt(false);
    });
  }

  if (!prompt) return <>{props.children}</>;
  return (
    <PromptContext.Provider value={{ handleLeave }}>
      {props.skeleton}
      <PageContainer show={show} position="right" onBeforeLeave={handleLeave}>
        {props.children}
      </PageContainer>
    </PromptContext.Provider>
  );
}
Prompt.goBack = goBack;
