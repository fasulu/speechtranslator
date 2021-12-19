const express = require('express')
const translatorAPI = require('./controller/api_Translator.js')
const app = express()
app.use(express.json())

const portNum = 4001

app.post('/translate', translatorAPI)

app.listen(portNum, async () => {
    console.log(`Server up on http://localhost:${portNum}`)
})