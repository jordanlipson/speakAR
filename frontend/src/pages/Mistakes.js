import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MistakesContainer = styled.div`
  display: flex;
  height: 100%;
`;

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

const Mistakes = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <div>
            <MistakesContainer>
                <Hamburger onClick={toggleMenu}>
                    <svg viewBox="0 0 100 80" width="40" height="40">
                        <rect width="100" height="10"></rect>
                        <rect y="30" width="100" height="10"></rect>
                        <rect y="60" width="100" height="10"></rect>
                    </svg>
                </Hamburger>
                <Menu open={menuOpen}>
                    <CloseButton onClick={toggleMenu}>X</CloseButton>
                    <MenuItem onClick={() => navigate("/home")}>Home</MenuItem>
                    <MenuItem onClick={toggleMenu}>Mistakes</MenuItem>
                </Menu>
            </MistakesContainer>
        </div>
    )
}

export default Mistakes