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

    const [isListening, setIsListening] = useState(false);
    const [silenceTimeout, setSilenceTimeout] = useState(null);

    useEffect(() => {
        if (isListening) {
            SpeechRecognition.startListening();
        }
    }, [isListening]);

    useEffect(() => {
        if (!listening) {
            // User stopped talking, start the silence timeout
            const timeout = setTimeout(() => {
                setSilenceTimeout(null); // Clear the timeout
                setIsListening(false); // Stop listening
                speak(); // Call speak function
            }, 1500); // Adjust the timeout duration as needed

            setSilenceTimeout(timeout);
        } else {
            // User started talking, clear the silence timeout
            clearTimeout(silenceTimeout);
        }
    }, [listening]);

    useEffect(() => {
        setIsListening(true); // Start listening when the component mounts

        return () => {
            setIsListening(false); // Stop listening when the component unmounts
        };
    }, []);

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
        speech.onend = () => {
            setIsListening(true); // Turn on the microphone again after speaking is done
        };
        window.speechSynthesis.speak(speech);
    };

    return (
        <div>
            <iframe src="https://api.echo3d.co/webar?key=hidden-voice-5514&entry=4465f250-2398-4019-a5fb-c18b701fcde3" width="100%" height="500" title="echoAR WebAR iframe element"></iframe>
            <div>
                <p>Microphone: {listening ? 'on' : 'off'}</p>
                <button onClick={SpeechRecognition.startListening}>Start</button>
                <button onClick={SpeechRecognition.stopListening}>Stop</button>
                {/* <button onClick={resetTranscript}>Reset</button> */}
                <p>{transcript}</p>
            </div>
        </div>
    );
}

export default ArPage;
