import React from 'react';
import logo from '../images/Logo.svg';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LandingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;
    padding-top: 40vh;
`;

const LogoImage = styled.img`
    width: 70%;
    max-width: 400px;
    margin-left: 40px;
    height: auto;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 290px;
    margin-left: 40px;
`;

const Subheading = styled.p`
    color: #fff;
    font-size: 18px;
    // font-weight: 400;
    margin-bottom: 40px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 40px;
    gap: 16px;
`;

const SignInButton = styled.button`
    width: 150px;
    height: 40px;
    border: none;
    border-radius: 38px;
    background: white;
    color: #394B60;
    font-size: 15px;
    font-weight: bold;
`;

const SignUpButton = styled.button`
    width: 150px;
    height: 40px;
    border: 2px solid white;
    border-radius: 38px;
    background: transparent;
    color: white;
    font-size: 15px;
    font-weight: bold;
`;

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div>
            <LandingContainer>
                <LogoImage src={logo} alt="speakAR Logo" />
                <TextContainer>
                    <Subheading>
                        Experience a new dimension in language learning with our AR-powered conversation simulation.
                    </Subheading>
                </TextContainer>
                <ButtonContainer>
                    <SignInButton onClick={() => navigate("/signin")}>SIGN IN</SignInButton>
                    <SignUpButton onClick={() => navigate("/signup")}>SIGN UP</SignUpButton>
                </ButtonContainer>
            </LandingContainer>
        </div>
    );
}

export default Landing;