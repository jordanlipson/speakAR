import React, { useEffect, useState } from 'react';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const ArPage = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const [convoStarted, setconvoStarted] = useState(false);
    const [silenceTimeout, setSilenceTimeout] = useState(null);


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
        console.log(data);
        if (data.reply[0] === "<"){
            return;
        }

        const speech = new SpeechSynthesisUtterance();
        speech.text = data.reply;
        if (data.language === "French"){
            speech.lang = 'fr-FR';
        }
        // speech.onend = () => {
        //     setIsListening(true); // Turn on the microphone again after speaking is done
        // };
        window.speechSynthesis.speak(speech);
    };
    function handleStart(){
        setconvoStarted(true);
        SpeechRecognition.startListening();
    }

    return (
        <div>
            <iframe src="https://api.echo3d.co/webar?key=floral-fire-5423&entry=f3b4b0a5-b39c-4001-98ea-31f8d6952e00" width="100%" height="500" title="echoAR WebAR iframe element"></iframe>
            <div>
                <p>Microphone: {listening ? 'on' : 'off'}</p>
                <button onClick={handleStart}>Start</button>
                <button onClick={SpeechRecognition.stopListening}>Stop</button>
                {/* <button onClick={resetTranscript}>Reset</button> */}
                <p>{transcript}</p>
            </div>
        </div>
    );
}

export default ArPage;
