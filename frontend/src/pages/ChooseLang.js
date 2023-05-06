import React from 'react';
import styled from "styled-components";

const ChooseLangContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    height: 100vh;
`;

const LanguageButton = styled.button`
    width: 150px;
    height: 40px;
    border: none;
    border-radius: 38px;
    background: white;
    color: #394B60;
    font-size: 15px;
    font-weight: bold;
    margin-top: 4em;
`

const ChooseLang = () => {

    return (
        <ChooseLangContainer>
            <LanguageButton>English</LanguageButton>
            <LanguageButton>Français</LanguageButton>
            <LanguageButton>Español</LanguageButton>
        </ChooseLangContainer>
    )
};

export default ChooseLang;