import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button, Container, Grid, Paper, TextField } from '@mui/material/';

import ComboBoxLanguage from '../components/comboBoxLanguage';

function TranslatorPage() {

  const languageUrl = "https://libretranslate.de/languages"
  //curl -X GET "https://libretranslate.de/languages" -H  "accept: application/json"

  const translateUrl = "https://libretranslate.de/translate"
  // curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=what&source=en&target=fr&format=text&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

  const [languageFrom, setLanguageFrom] = useState("en")
  const [languageTo, setLanguageTo] = useState("en")
  const [wordInput, setWordInput] = useState("")
  const [wordOutput, setWordOutput] = useState("")

  const {
    isMicrophoneAvailable,
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const paperStyle = { padding: 20, height: '60vh', margin: '50px auto' }
  const gridStyle = { paddingLeft: 70, align: 'center' }
  const textfieldStyle = { marginRight: 20, marginTop: 10, minWidth: 350, fontSize: '25px' }
  const translateStyle = { background: 'green', color: 'white', marginRight: 15 }

  const translate = async (e) => {

    e.preventDefault();

    var source=languageFrom.split(" ")[0]
    var target=languageTo.split(" ")[0]
    


    try {

      // if (!isMicrophoneAvailable) {
      //   return <h2>Microphone is not enabled.</h2>;

      // } else {

      //   if (!browserSupportsSpeechRecognition) {
      //     return <span>Browser doesn't support speech recognition.</span>;
      //   } else {
      //     SpeechRecognition.startListening({ continue: true })
      //   }

      // const dataDetail = {
      //   q: transcript,
      //   source: languageFrom,
      //   target: languageTo,
      //   api_key: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      // }, {
      //   header: {
      //     'accept': 'application/json',
      //     'Content=Type': 'application/x-www-form-urlencoded'
      //   }
      // }


      const response = await axios.post(translateUrl, {
        q: wordInput,
        source: source,
        target: target,
        api_key: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      }, {
        header: {
          'accept': 'application/json',
          'Content=Type': 'application/x-www-form-urlencoded'
        }
      })

      console.log(response.data)
      setWordOutput(response.data.translatedText)

      // }

      console.log(languageFrom.split(" ")[0], languageTo.split(" ")[0])
      console.log(`languageFrom ${languageFrom}  languageTo ${languageTo}`)
      console.log(`wordInput ${wordInput}  wordOutput ${wordOutput}`)

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Container maxWidth='sm'>
      <Paper elevation={5} style={paperStyle}>

        <Grid items sm={12} align='center'>
          <h2>Voice Translator</h2>
        </Grid>


        <Grid container align='center'>

          <Grid items sm={5} style={gridStyle}
            onChange={(e) => setLanguageFrom(e.target.value)}
            value={languageFrom} >
            <ComboBoxLanguage
              name="Languages" />

          </Grid>
          <Grid items sm={5} style={gridStyle}
            onChange={(e) => setLanguageTo(e.target.value)}
            value={languageTo} >
            <ComboBoxLanguage
              name="Languages" />

          </Grid>

        </Grid>

        <div>
          <TextField style={textfieldStyle}
            onChange={(e) => setWordInput(e.target.value)}
            value={wordInput}
            cols="25" rows="3">
          </TextField>
        </div>
        <div>
          <TextField style={textfieldStyle}
          value={wordOutput}
            disabled cols="25" rows="3">
          </TextField>
        </div>
        <div>
          <Button style={translateStyle} title="Start"
            onClick={(e) => translate(e)}
          > Translate</Button>
        </div>
      </Paper>
    </Container >
  );
}

export default TranslatorPage;
