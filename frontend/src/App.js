import React from "react";
import { BrowserRouter as Router, HashRouter, Route, Routes, Link } from "react-router-dom";
import { Landing, SignUp, SignIn, SelectLevel, ArPage } from "./components";
// import "./components/App.css"
import GlobalStyle from "./globalStyles";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/selectlevel" element={<SelectLevel />} />
          <Route path="/arPage" element={<ArPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
