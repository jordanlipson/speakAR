import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Hamburger = styled.button`
    position: absolute;
    margin-right: 30px;
    top: 55px;
    right: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    padding: 0;
    color: #fff;
    svg {
        fill: #fff; 
    }
`;

const Menu = styled.div`
    z-index: 2; 
    position: absolute;
    top: 0;
    right: 0;
    width: 75%;
    height: 100vh;
    background-color: #E8E8E8;
    transform: translateX(${props => props.open ? '0' : '100%'});
    transition: transform 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
`;

const MenuItems = styled.div`
    margin-top: 120px;
`

const MenuItem = styled.div`
    color: #394B60;
    margin-right: 2em;
    text-align: right;
    font-weight: bold;
    font-size: 1.5rem;
    padding: 1rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2em;
  right: 2em;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  padding: 0;
  color: #394B60;
  font-size: 20px;
  font-weight: bold;
`

const MistakeHeader = styled.h1`
  font-size: 35px;
  font-weight: bold;
  text-align: center;
  margin-top: 150px;
  color: #fff;
`;

const MistakesContainer = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MistakeGroup = styled.div`
    display: flex;
    flex-direction: column;
    background: #fff;
    font-size: 18px;
    width: 85vw;
    border-radius: 26px;
    margin-bottom: 20px; 
    padding-left: 15px;
`

const Mistake = styled.p`
    color: #131313;
    text-decoration: line-through #CF2525;
    margin-bottom: 0px;
`

const Correction = styled.p`
    color: #3F7E0D;
`

const Mistakes = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [mistakesData, setMistakesData] = useState([]);

    async function getMistakes() {
        let headersList = {
            "Accept": "*/*",
            // "User-Agent": "Thunder Client (https://www.thunderclient.com)"
        }

        let response = await fetch("http://127.0.0.1:5000/getUser", {
            method: "GET",
            headers: headersList
        });

        let data = await response.text();
        let jsonData = JSON.parse(data); // Parse the text response into a JavaScript object
        console.log(jsonData); // Verify that the object is now in a JSON format
        setMistakesData(jsonData.vals); // Set the mistakesData state with the array of mistake objects
    }

    useEffect(() => {
        getMistakes();
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <div>
            <Hamburger onClick={toggleMenu}>
                <svg viewBox="0 0 100 80" width="40" height="40">
                    <rect width="100" height="10"></rect>
                    <rect y="30" width="100" height="10"></rect>
                    <rect y="60" width="100" height="10"></rect>
                </svg>
            </Hamburger>
            <Menu open={menuOpen}>
                <CloseButton onClick={toggleMenu}>X</CloseButton>
                <MenuItems>
                    <MenuItem onClick={() => navigate("/home")}>Home</MenuItem>
                    <MenuItem onClick={toggleMenu}>Mistakes</MenuItem>
                </MenuItems>
            </Menu>
            {/* Loop through the mistakesData array and render each mistake */}
            <MistakeHeader>Mistakes</MistakeHeader>
            <MistakesContainer>
                {mistakesData && mistakesData.map((mistake, index) => (
                    <MistakeGroup key={index}>
                        <Mistake>{mistake.original}</Mistake>
                        <Correction>{mistake.updated}</Correction>
                    </MistakeGroup>
                ))}
            </MistakesContainer>
        </div>
    )

}

export default Mistakes
