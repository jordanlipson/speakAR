import React from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <button style={{ background: 'white', color: '#256193', borderRadius: '20px', padding: '10px 20px', fontSize: '18px' }} onClick={() => navigate("/ar")}>START TALKING</button>
        </div>
    );
}

export default Home;