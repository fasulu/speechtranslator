import React, { useEffect, useState } from 'react'
import axios from 'axios';

import ComboBoxLanguage from '../components/comboBoxLanguage';

function TranslatorPage() {

  const [languageOption, setLanguageOption] = useState([])
  const [languageFrom, setLanguageFrom] = useState("")
  const [languageTo, setLanguageTo] = useState("")
  const [wordInput, setWordInput] = useState("")
  const [wordOutput, setWordOutput] = useState("")

  const languageUrl = "https://libretranslate.de/languages"
  //curl -X GET "https://libretranslate.de/languages" -H  "accept: application/json"

  // useEffect(() => {
  //   fetchData();

  // }, [])

  // async function fetchData() {
  //   try {

  //     const response = await axios.get(languageUrl)
  //     console.log(response.data)

  //     setLanguageOption(response.data)

  //     if (!response.data) {
  //       console.log()
  //     }

  //   } catch (error) {
  //     console.log(error)
  //   }

  // }

  const translate = (e) => {

    e.preventDefault();
    console.log(`languageFrom ${languageFrom}  languageTo ${languageTo}`)
    console.log(`wordInput ${wordInput}  wordOutput ${wordOutput}`)

  }

  return (
    <div className="App">
      <div>
        <div

          onChange={(e) => setLanguageFrom(e.target.value)}
          value={languageFrom}>
          <ComboBoxLanguage
            name="Languages" />

        </div>

        <div

          onChange={(e) => setLanguageTo(e.target.value)}
          value={languageTo}>
          <ComboBoxLanguage
            name="Languages" />

        </div>
        <div>
          <textarea
            onChange={(e) => setWordInput(e.target.value)}
            cols="25" rows="3">
          </textarea>
        </div>
        <div>
          <textarea
            onChange={(e) => setWordOutput(e.target.value)}
            cols="25" rows="3">
          </textarea>
        </div>
        <div>
          <button onClick={(e) => translate(e)} > Translate</button>
        </div>
      </div>
    </div>
  );
}

export default TranslatorPage;
