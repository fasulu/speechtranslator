import React, { useState } from 'react'
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Avatar, Button, Container, Grid, Paper, TextField } from '@mui/material/';

import MicIcon from '@mui/icons-material/Mic';  // install => npm install @mui/icons-material

import ComboBoxLanguage from '../components/comboBoxLanguage';

function TranslatorPage() {

 const translateUrl = "https://libretranslate.de/translate"
 
  const [languageFrom, setLanguageFrom] = useState("")
  const [languageTo, setLanguageTo] = useState("")
  const [wordInput, setWordInput] = useState("")
  const [wordOutput, setWordOutput] = useState("")

  const {
    isMicrophoneAvailable,
    transcript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const paperStyle = { padding: 20, height: '80vh', margin: '40px auto' }
  const gridStyle = { align: 'center' }
  const textfieldStyle1 = { marginTop: 10, minWidth: 350 }
  const translateStyle = { background: 'green', color: 'white', marginRight: 15 }
  const micStyle = { marginTop: '10px', background: '#515699', color: 'white', marginRight: 15, width: 20, height: 20 }

  const recordVoice = () => {

    setWordOutput("")

    if (!isMicrophoneAvailable) {
      return <h2>Microphone is not enabled.</h2>;

    } else {

      if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
      } else {
        SpeechRecognition.startListening({ continue: true })
      }
    }
    console.log(languageFrom.split(" ")[0], languageTo.split(" ")[0])
    console.log(`languageFrom ${languageFrom}  languageTo ${languageTo}`)

  }

  const translate = async (e) => {

    e.preventDefault();
    SpeechRecognition.stopListening()
    setWordInput(transcript)

    var source = languageFrom.split(" ")[0]
    var target = languageTo.split(" ")[0]
    console.log(transcript, wordOutput)
    console.log(`languageFrom ${languageFrom}  languageTo ${languageTo}`)

    try {
      const response = await axios.post(translateUrl, {
        // q: wordInput,
        q: transcript,
        source: source.trim(),
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

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Container maxWidth='sm'>
      <Paper elevation={5} style={paperStyle}>
        <Grid container align='center'>
          <Grid item sm={9} xs={7} align='center'>
            <h2>Voice Translator</h2>
          </Grid>
          <Grid item sm={1} xs={2} align='center' >
            <Avatar style={micStyle}
              title="Accept Voice"
              onClick={recordVoice} >
              <MicIcon /> </Avatar>
          </Grid>
          <Grid item sm={1} xs={2} align='center' >
            <h6>{listening ? 'On' : 'Off'}</h6>
          </Grid>
        </Grid>

        <Grid container align='center'>

          <Grid item sm={6} xs={12} style={gridStyle}
            onChange={(e) => setLanguageFrom(e.target.value)}
            value={languageFrom} >
            <ComboBoxLanguage
              name="Languages" />

          </Grid>
          <Grid item sm={6} xs={12} style={gridStyle}
            onChange={(e) => setLanguageTo(e.target.value)}
            value={languageTo} >
            <ComboBoxLanguage
              name="Languages" />
          </Grid>

        </Grid>
        <Grid container align='center' >
          <Grid item sm={10} xs={10}  >
            <TextField style={textfieldStyle1}
              // onChange={(e) => setWordInput(e.target.value)}
              // value={wordInput}
              // onChange={(e) => setWordInput(e.target.value)}
              value={transcript}
              cols="25" rows="3">
            </TextField>
          </Grid>

          <Grid item sm={10} xs={10} >
            <TextField style={textfieldStyle1}
              value={wordOutput}
              cols="25" rows="3">
            </TextField>
          </Grid>
        </Grid>

        <Grid>
          <Button style={translateStyle} title="Translate"
            onClick={(e) => translate(e)}
          > Translate</Button>
        </Grid>
      </Paper>
    </Container >
  );
}

export default TranslatorPage;
