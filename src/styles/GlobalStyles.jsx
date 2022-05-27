import { createGlobalStyle } from "styled-components";

import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    body {
        font-family: Arial, Helvetica, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: ${(props) => props.theme.color.TEXT_NORMAL}
    }
    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }
    * {
        box-sizing: border-box;
    }
    a {
        text-decoration: none;
        color: inherit;
        cursor: pointer
    }
    button {
        border: none;
        background-color: inherit;
        color: inherit;
        cursor: pointer;
    }
    textarea, input {
        outline: none;
        border: none;
    }
    textarea:focus, input:focus{
        outline: none;
    }
    textarea:disabled, input:disabled {
        background: transparent;
    }
`;

export default GlobalStyles;
