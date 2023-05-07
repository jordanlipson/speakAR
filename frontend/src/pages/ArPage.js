import React, { useEffect, useState } from 'react';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import micOn from '../images/mic_on.svg';
import micOff from '../images/mic_off.svg';
import styled from "styled-components";

const Subheading = styled.p`
    color: #fff;
    font-size: 18px;
    text-align: center;
`;

const MicButton = styled.img`
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
`;

const Caption = styled(Subheading)`
  position: absolute;
  bottom: 260px;
  width: 350px;
  left: 50%; /* increased left value */
  transform: translateX(-50%);
  margin-right: 0px;
  margin-left: 0px;
  text-shadow: 5px 3px 5px rgba(0, 0, 0, 1);
  font-weight: bold;
`;

const Caption2 = styled(Subheading)`
  position: absolute;
  bottom: 180px;
  width: 350px;
  left: 50%; /* increased left value */
  transform: translateX(-50%);
  text-shadow: 5px 3px 5px rgba(0, 0, 0, 1);
  font-weight: bold;
`;


const ArPage = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    
    const [convoStarted, setconvoStarted] = useState(false);
    const [silenceTimeout, setSilenceTimeout] = useState(null);
    const [micIcon, setMicIcon] = useState(micOff); // default mic off icon
    const [responseText, setResponseText] = useState(""); // state for outputted text data
    const [caption, setCaption] = useState("")

    useEffect(() => {
        if (!listening) {
            setMicIcon(micOff);
        } else {
            setMicIcon(micOn);
        }
    }, [listening]);

    useEffect(() => {
        if (!listening && convoStarted) {
            // User stopped talking, start the silence timeout
            const timeout = setTimeout(() => {
                speak(); // Call speak function
            }, 1500); // Adjust the timeout duration as needed

        } else {
            // User started talking, clear the silence timeout
            clearTimeout(silenceTimeout);
        }
    }, [listening]);

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    async function speak() {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "message": transcript
        });

        let response = await fetch("http://127.0.0.1:5000/chat/", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        
        if (data.reply[0] === "<"){
            return;
        }

        setCaption('speakAR: ' + data.reply)

        // Set the outputted text data to state
        setResponseText(data.reply);

        const speech = new SpeechSynthesisUtterance();
        speech.text = data.reply;
    
        if (data.language === "Français"){
            speech.lang = 'fr-FR';
        }
        else if (data.language === "Español"){
            speech.lang = 'es-ES';
        }
        window.speechSynthesis.speak(speech);
    };
    
    function handleStart(){
        setconvoStarted(true);
        SpeechRecognition.startListening();
    }

    return (
        <div style={{ position: "relative" }}>
          <iframe src="https://api.echo3d.co/webar?key=floral-fire-5423&entry=f3b4b0a5-b39c-4001-98ea-31f8d6952e00" width="100%" height="844" title="echoAR WebAR iframe element"></iframe>
          <MicButton onClick={handleStart} src={micIcon} alt="microphone" />
          <Caption>You: {transcript}</Caption>
          <Caption2>{caption}</Caption2>
        </div>
      );
}

export default ArPage;
