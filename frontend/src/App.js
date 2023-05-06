import React from "react";
import { BrowserRouter as Router, HashRouter, Route, Routes, Link } from "react-router-dom";
import { Landing, SignUp, SignIn, SelectLevel, Home } from "./pages";
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
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
      {/* <iframe src="https://api.echo3d.co/webar?key=hidden-voice-5514&entry=4465f250-2398-4019-a5fb-c18b701fcde3" width="100%" height="500" title="echoAR WebAR iframe element"></iframe> */}
    </div>
  );
}

export default App;
