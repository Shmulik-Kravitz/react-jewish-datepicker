import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
export interface CodeProps {
  code: string;
}
export const Code: React.FC<CodeProps> = React.memo((props: CodeProps) => {
  const ref = React.useRef(null);
  return (
    <SyntaxHighlighter  language="jsx" style={docco } wrapLongLines>
      {props.code}
    </SyntaxHighlighter>
  );
});
