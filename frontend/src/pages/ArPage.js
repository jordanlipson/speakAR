import React from 'react';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const ArPage = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    
    if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
    }

    const speak = () => {
        const speech = new SpeechSynthesisUtterance();
        speech.text = 'Hello, this is a test.';
        window.speechSynthesis.speak(speech);
      };

    return (
        <div>
            <iframe src="https://api.echo3d.co/webar?key=hidden-voice-5514&entry=4465f250-2398-4019-a5fb-c18b701fcde3" width="100%" height="500" title="echoAR WebAR iframe element"></iframe>
            <div>
                <p>Microphone: {listening ? 'on' : 'off'}</p>
                <button onClick={SpeechRecognition.startListening}>Start</button>
                <button onClick={SpeechRecognition.stopListening}>Stop</button>
                <button onClick={resetTranscript}>Reset</button>
                <p>{transcript}</p>
                <button onClick={speak}>SPEAK</button>
            </div>
        </div>
    );
}

export default ArPage;