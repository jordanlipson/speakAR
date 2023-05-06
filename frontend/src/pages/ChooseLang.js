import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ChooseLangContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    height: 100vh;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-y: scroll;
`;


const LangHeader = styled.h1`
  font-size: 30px;
  font-weight: bold;
  width: 330px;
  text-align: center;
`;

const LangButton = styled.button`
    width: 290px;
    height: 100px;
    border: 2px solid white;
    border-radius: 33px;
    background: ${({ selected }) => selected ? '#fff' : 'transparent'};
    color: ${({ selected }) => selected ? '#394B60' : '#fff'};
    font-size: 20px;
    font-weight: bold;
    margin-top: 1em;
`

const NextButton = styled.button`
    width: 150px;
    height: 40px;
    border: 2px solid white;
    border-radius: 38px;
    background: transparent;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    margin-top: 4em;
`

const ChooseLang = () => {
    const navigate = useNavigate();

    const [selectedLang, setSelectedLang] = useState('');
    const [showNextButton, setShowNextButton] = useState(false);

    const handleLangClick = (lang) => {
        setSelectedLang(lang);
        setShowNextButton(true);
    }

    async function sendLang() {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({ "language": selectedLang });

        let response = await fetch("http://127.0.0.1:5000/setlang/", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.text();
        console.log(data);

        navigate("/selectlevel")
    }

    return (
        <div>
            <ChooseLangContainer>
                <LangHeader>What are you learning?</LangHeader>
                <LangButton selected={selectedLang === 'English'} onClick={() => handleLangClick('English')}>English</LangButton>
                <LangButton selected={selectedLang === 'Français'} onClick={() => handleLangClick('Français')}>Français</LangButton>
                <LangButton selected={selectedLang === 'Español'} onClick={() => handleLangClick('Español')}>Español</LangButton>
                {showNextButton && <NextButton onClick={sendLang}>NEXT</NextButton>}
            </ChooseLangContainer>
        </div>
    )
};

export default ChooseLang;
