import React from 'react';
import logo from '../images/Logo.svg';
import { useState
 } from 'react';
const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [returnVal, setReturnVal] = useState("");


    function handleUserNameChange(event){
        setUserName(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    async function register(){
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }
            
        let bodyContent = JSON.stringify({
            "username": userName,
            "password":password
        });
        
        let response = await fetch("http://127.0.0.1:5000/register", { 
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        
        let data = await response.text();
        setReturnVal(data);
    }

    return (
        <div>
            <h1>Sign up here</h1>
            <input placeholder='Username' value={userName} onChange={handleUserNameChange}/>
            <input placeholder='Password' type='password' value={password} onChange={handlePasswordChange}/>
            <button onClick={register}>Sign Up</button>
            <h2>{returnVal}</h2>
        </div>
    );
}

export default SignUp;