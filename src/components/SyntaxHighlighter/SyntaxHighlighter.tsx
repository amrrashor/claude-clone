import { Children } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
const SyntaxHighlighterComponent = ({children, language = "javascript" }:any) => {
    return (
        <SyntaxHighlighter language={language} style={oneDark}>
            {children}
        </SyntaxHighlighter>
    )
}

export default SyntaxHighlighterComponent