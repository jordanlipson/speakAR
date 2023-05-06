import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');

    body {
        background: linear-gradient(to bottom, #256193, #296093, #564889);
        height: 100vh;
        
        // width: 100vw;
    }

    * {
        font-family: 'Outfit', sans-serif;
    }

    // button {
    //     font-size: 1rem;
    //     font-weight: 500;
    //     color: #fff;
    //     background-color: #007bff;
    //     border-color: #007bff;
    //     border-radius: 0.25rem;
    //     padding: 0.375rem 0.75rem;
    //     transition: all 0.15s ease-in-out;
    //     cursor: pointer;

    //     &:hover {
    //     background-color: #0062cc;
    //     border-color: #005cbf;
    //     }

    //     &:focus {
    //     outline: 0;
    //     box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
    //     }

    //     &:disabled {
    //     opacity: 0.65;
    //     cursor: not-allowed;
    //     }
    // }
`;

export default GlobalStyle;
