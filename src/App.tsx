/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import "./App.css";

export default function App() {
  const [userInput, setUserInput] = useState("");
  let href: string = window.location.href.split("/")[3];
  const [wordTranslate, setWordTranslate] = useState<Array<any>>([]);
  const [searchTag, setsearchTag] = useState("");

  const getVal = (val: { target: { value: string } }) => {
    setUserInput(val.target.value);
  };

  const getDefinition = () => {
    let input = userInput;
    if (href && userInput == "") {
      input = href;
    }
    setWordTranslate([<h1>Loading...</h1>]);
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)
      .then((res) => {
        let arr = [
          <p>{res.data[0].word}</p>,
          <p>{res.data[0].phonetic}</p>,
          <audio src={res.data[0].phonetics[0].audio} controls></audio>,
          <p>{res.data[0].origin}</p>,
          <p>{res.data[0].meanings[0].partOfSpeech}</p>,
          <p>{res.data[0].meanings[0].definitions[0].definition}</p>,
          <p>{res.data[0].meanings[0].definitions[0].example}</p>,
          <p>{res.data[0].meanings[0].definitions[0].synonyms}</p>,
          <p>{res.data[0].meanings[0].definitions[0].antonyms}</p>,
          <a href={res.data[0].phonetics[0].sourceUrl}>
            commons.wikimedia.org
          </a>,
        ];
        setWordTranslate(
          arr.map((e) => {
            return e;
          })
        );
      })
      .catch((err) => {
        setWordTranslate([<p>Error! Word not found.</p>]);
      });
  };
  if (href && userInput == "") {
    setUserInput(window.location.href.split("/")[3]);
    getDefinition();
  }

  const handleKeypress = (e: { charCode: any }) => {
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
        <div>{wordTranslate}</div>
      </div>
    </div>
  );
}
