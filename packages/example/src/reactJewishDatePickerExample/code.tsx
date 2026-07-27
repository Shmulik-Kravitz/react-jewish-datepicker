import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export interface CodeProps {
  code: string;
}

export const Code: React.FC<CodeProps> = React.memo((props: CodeProps) => {
  return (
    <SyntaxHighlighter
      language="jsx"
      style={vscDarkPlus}
      wrapLongLines
      customStyle={{
        margin: 0,
        padding: '16px 18px',
        background: 'transparent',
        fontSize: '12.5px',
        lineHeight: '1.6',
        fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, 'Liberation Mono', monospace",
        borderRadius: 0,
      }}
      codeTagProps={{
        style: {
          fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, 'Liberation Mono', monospace",
        }
      }}
    >
      {props.code}
    </SyntaxHighlighter>
  );
});
