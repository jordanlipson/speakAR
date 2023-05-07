import React, { useState } from 'react';
import logo from '../images/Logo.svg';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HomeContainer = styled.div`
  display: flex;
  height: 100%;
`;

const Logo = styled.img`
    width: 40vw;
    position: absolute;
    top: 55px;
    left: 0;
    margin-left: 30px;
`

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

const HomeHeader = styled.h1`
    width: 300px;
    font-size: 35px;
    font-weight: bold;
    margin-top: 150px;
    margin-left: 30px;
    color: #fff;
`;

const HomeSubheader = styled.p`
  font-size: 18px;
  margin: 55% 5% 5% -70%;
  width: 90%;
  text-align: left;
  color: #fff;
`;


const TalkButton = styled.button`
    z-index: 1; 
    position: absolute;
    bottom: 55px;
    left: 50%;
    transform: translateX(-50%);
    width: 170px;
    height: 170px;
    background: #fff;
    color: #394B60;
    font-size: 25px;
    font-weight: bold;
    border-radius: 22px;
    clip-path: polygon(50% 0%, 82% 14%, 100% 50%, 82% 86%, 50% 100%, 18% 86%, 0% 50%, 18% 14%);
`

const Home = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <HomeContainer>
            <Logo src={logo} alt="Logo" />
            <Hamburger onClick={toggleMenu}>
                <svg viewBox="0 0 100 80" width="40" height="40">
                    <rect width="100" height="10"></rect>
                    <rect y="30" width="100" height="10"></rect>
                    <rect y="60" width="100" height="10"></rect>
                </svg>
            </Hamburger>
            <Menu open={menuOpen}>
                <CloseButton onClick={toggleMenu}>X</CloseButton>
                <MenuItem onClick={toggleMenu}>Home</MenuItem>
                <MenuItem onClick={() => navigate("/mistakes")}>Mistakes</MenuItem>
            </Menu>
            <HomeHeader>Hello, username</HomeHeader>
            <HomeSubheader>You can communicate in situations and use simple language to communicate feelings, opinions, plans and experiences.</HomeSubheader>
            <TalkButton onClick={() => navigate("/arpage")}>START TALKING</TalkButton>
        </HomeContainer>
    );
}

export default Home;
