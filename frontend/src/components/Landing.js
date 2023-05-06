import React from 'react';
import logo from '../images/logo.svg';
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh', background: 'linear-gradient(to bottom, #256193, #296093, #564889)' }}>
                <img src={logo} alt="Logo" style={{ height: '200px', marginBottom: '50px' }} />
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', textAlign: 'center', maxWidth: '800px', margin: '0 50px 50px' }}>Experience a new dimension in language learning with our AR-powered conversation simulation.</p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button style={{ background: 'white', color: '#256193', borderRadius: '20px', padding: '10px 20px', fontSize: '18px', marginRight: '20px' }} onClick={() => navigate("/signup")}>Sign Up</button>
                    <button style={{ background: 'white', color: '#256193', borderRadius: '20px', padding: '10px 20px', fontSize: '18px' }} onClick={() => navigate("/signin")}>Sign In</button>
                </div>
            </div>
        </div>
    );
}

export default Landing;