import React from "react";
import { BrowserRouter as Router, HashRouter, Route, Routes, Link } from "react-router-dom";
import { Landing, SignUp, SignIn, SelectLevel, Home, ArPage, ChooseLang } from "./pages";
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
          <Route path="/arpage" element={<ArPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chooselang" element={<ChooseLang />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
