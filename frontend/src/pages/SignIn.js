import React from 'react';
import styled from "styled-components";

import {
    useState
} from 'react';

const SignInContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    height: 100vh;
`;

const SignInHeader = styled.h1`
    font-size: 35px;
`

const Button = styled.button`
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

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 15px;
    text-align: left;

    & > label {
        align-self: flex-start;
        margin-bottom: 5px;
    }
`

const InputLabel = styled.label`
    font-size: 15px;
    margin-bottom: 5px;
    align-self: flex-start;
    margin-left: 2.5em;
`

const Input = styled.input`
    width: 310px;
    height: 40px;
    border: 2px solid #fff;
    border-radius: 10px;
    background-color: transparent;
    color: #fff;
    font-size: 20px;
    padding: 5px;
    &::placeholder {
        color: #D7CEEA;
        opacity: 50%;
    }
`

const SignIn = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [returnVal, setReturnVal] = useState("");


    function handleUserNameChange(event) {
        setUserName(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    async function login() {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "username": userName,
            "password": password
        });

        let response = await fetch("http://127.0.0.1:5000/login/", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.text();
        setReturnVal(data);
    }

    return (
        <SignInContainer>
            <SignInHeader>Sign in</SignInHeader>
            <InputContainer>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input id="username" placeholder="Enter username" value={userName} onChange={handleUserNameChange} />
            </InputContainer>
            <InputContainer>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" placeholder="Enter password" type="password" value={password} onChange={handlePasswordChange} />
            </InputContainer>
            <Button onClick={login}>LOGIN</Button>
            <h2>{returnVal}</h2>
        </SignInContainer>
    );
}

export default SignIn;