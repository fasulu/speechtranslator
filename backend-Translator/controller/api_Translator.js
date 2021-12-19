
const translateUrl = "https://libretranslate.de/translate"

const translatorAPI = (async (req, res) => {

    const phraseInput = req.body
    
    try {
        
            console.log(`wordInput ${phraseInput.wordInput}`)
            console.log(`source ${phraseInput.source.trim()}`)
            console.log(`target ${phraseInput.target}`)
            console.log(`api key ${phraseInput.api_key}`)

        // tried in post method and also using fetch which is given below
        // response comes empty

        const response = await post(translateUrl, {
            q: phraseInput.wordInput,
            source: phraseInput.source.trim(),
            target: phraseInput.target,
            api_key: phraseInput.api_key
        }, {
            header: {
                'accept': 'application/json',
                'Content=Type': 'application/x-www-form-urlencoded'
            }
        })

        console.log(`response from server : ${response}`)   // even it is not showing this console line
        return await res.json(response)

        // const res = await fetch("https://libretranslate.de/translate", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         q: phraseInput.wordInput,
        //         source: phraseInput.source.trim(),
        //         target: phraseInput.target,
        //         api_key: phraseInput.api_key,
        //     }),
        //     headers: { "Content-Type": "application/json" }
        // });

        // console.log(await res.json());

    } catch (error) {
        return res.status(500).json(error)

    }
})

module.exports = translatorAPI