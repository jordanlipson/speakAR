import React from "react";
import { BrowserRouter as Router, HashRouter, Route, Routes, Link } from "react-router-dom";
import "./components/App.css"
import { Landing } from "./components";

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
      {/* <iframe src="https://api.echo3d.co/webar?key=hidden-voice-5514&entry=4465f250-2398-4019-a5fb-c18b701fcde3" width="100%" height="500" title="echoAR WebAR iframe element"></iframe> */}
    </div>
  );
}

export default App;
