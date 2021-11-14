import React, { useEffect, useState } from 'react'
import axios from 'axios';

function ComboBoxLanguage(props) {

    const [languageOption, setLanguageOption] = useState([])

    const languageUrl = "https://libretranslate.de/languages"
    //curl -X GET "https://libretranslate.de/languages" -H  "accept: application/json"

    useEffect(() => {
        fetchData();

    }, [])

    async function fetchData() {
        try {

            const response = await axios.get(languageUrl)
            console.log(response.data)

            setLanguageOption(response.data)

            if (!response.data) {
                console.log()
            }

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            {/* <select
                onChange={(e) => setLanguageFrom(e.target.value)}>
                {languageOption.map(elem => <option key={elem.code} value={elem.code} > {elem.name}</option>)}
            </select> */}
            <select>
                {languageOption.map(elem =>{
                    return (<option key={elem.code} > {elem.name}</option>)
                } )}
            </select>
        </>
    );
}

export default ComboBoxLanguage