import { createContext } from "react";

const PromptContext = createContext<{ handleLeave?(): void }>({});

export default PromptContext;
