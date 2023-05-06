import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');

    body {
        background: linear-gradient(to bottom, #256193, #296093, #564889);
        height: 100vh;
        // width: 100vw;
    }
`;

export default GlobalStyle;
