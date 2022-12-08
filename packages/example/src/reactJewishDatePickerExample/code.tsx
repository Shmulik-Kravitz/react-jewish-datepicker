import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
export interface CodeProps {
  code: string;
}
export const Code: React.FC<CodeProps> = React.memo((props: CodeProps) => {
  return (
    <SyntaxHighlighter language="jsx" style={atomOneLight} wrapLongLines>
      {props.code}
    </SyntaxHighlighter>
  );
});
