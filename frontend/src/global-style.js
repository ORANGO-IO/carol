import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root {
        line-height: 1.5;
        font-weight: 400;
        color-scheme: light dark;
        color: rgba(255, 255, 255, 0.87);
        background-color: white;
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
    }

    body {
        font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
        font-weight: 400;
        margin: 0;
        min-width: 320px;
        min-height: 100vh;
    }

    input::placeholder, textarea::placeholder {
        font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
        font-weight: 400;
        color: #9C9C9C
    }
`
