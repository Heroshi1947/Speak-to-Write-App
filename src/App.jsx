import "regenerator-runtime/runtime";

// This imports the `regenerator-runtime` package and ensures that the `regeneratorRuntime` variable is defined globall

import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useState } from "react";

const App = () => {
  const [textToCopy, setTextToCopy] = useState();
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const handleReset = () => {
    resetTranscript();
    setTextToCopy("");
  };

  if (!browserSupportsSpeechRecognition) {
    alert("your browser does not support this feature");
    return null;
  }

  return (
    <>
      <div className="container">
        <h2>Speech to Text Converter</h2>

        <br />
        <p>
          A React App that converts speech from the microphone to text and
          displays it as React component.
        </p>

        <div className="btn-style">
          <button onClick={setCopied}>
            {isCopied ? "Copied!" : "Copy to clipboard"}
          </button>
          <button onClick={startListening}>Start Listening</button>
          <button onClick={SpeechRecognition.stopListening}>
            Stop Listening
          </button>
          <button className="reset" onClick={handleReset}>
            Clear Screen
          </button>
        </div>
        <div className="main-content" onClick={() => setTextToCopy(transcript)}>
          <h5>Speak to see text !</h5>
          {transcript}
        </div>
      </div>
    </>
  );
};

export default App;
