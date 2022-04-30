import { useState } from "react";
import axios from "axios";
import React from "react";
import "./App.css";

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [word, setWord] = useState("");
  const [phonetic, setPhonetic] = useState("");
  const [phoneticAudio, setPhoneticAudio] = useState("");
  const [origin, setOrigin] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [synonyms, setSynonyms] = useState("");
  const [antonyms, setAntonyms] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");

  const getVal = (val: { target: { value: string } }) => {
    setUserInput(val.target.value);
  };

  const getDefinition = () => {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`)
      .then((res) => {
        setWord(res.data[0].word);
        setPhonetic(res.data[0].phonetic);
        setPhoneticAudio(res.data[0].phonetics[0].audio);
        setOrigin(res.data[0].origin);
        setPartOfSpeech(res.data[0].meanings[0].partOfSpeech);
        setDefinition(res.data[0].meanings[0].definitions[0].definition);
        setExample(res.data[0].meanings[0].definitions[0].example);
        setSynonyms(res.data[0].meanings[0].definitions[0].synonyms);
        setAntonyms(res.data[0].meanings[0].definitions[0].antonyms);
        setSourceUrl(res.data[0].phonetics[0].sourceUrl);
      })
      .catch(() => {
        alert("Error! Word not found.");
      });
  };

  const handleKeypress = (e: { charCode: number }) => {
    if (e.charCode === 13) {
      getDefinition();
    }
  };

  return (
    <div>
      <h1>Dictionary App</h1>
      <h2>Please enter the word below!</h2>
      <div className="App">
        <div className="search">
          <input
            onChange={getVal}
            onKeyPress={handleKeypress}
            placeholder="Enter a word..."
          />
          <button onClick={getDefinition} className="define">
            Define
          </button>
        </div>
        <div>
          <h1>{word}</h1>
          <p>{phonetic}</p>
          <audio src={phoneticAudio} controls></audio>
          <p>{origin}</p>
          <p>{partOfSpeech}</p>
          <p>{definition}</p>
          <p>{example}</p>
          <p>{synonyms}</p>
          <p>{antonyms}</p>
          <a href={sourceUrl}>commons.wikimedia.org</a>
        </div>
      </div>
    </div>
  );
}
