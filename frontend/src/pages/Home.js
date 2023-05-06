import React from 'react';
import logo from '../images/Logo.svg';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <button style={{ background: 'white', color: '#256193', borderRadius: '20px', padding: '10px 20px', fontSize: '18px' }} onClick={() => navigate("/arpage")}>START TALKING</button>
        </div>
    );
}

export default Home;