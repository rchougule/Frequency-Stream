const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const FrequencyCalculator = require('./writableStream');

const _PORT = 8080;
const DATA_URL = 'https://gitlab.com/snippets/1824628/raw';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/getWords', (req, res) => {

    // if the number of words required are not mentioned, return only top 20 words
    const words = +req.query.words;
    if(words) {
        console.log(`\nGET /getWords for ${words} Words`);
    } else {
        console.log("\nGET /getWords for Default Words : ", 20);
    }
    const requiredWords = words || 20;

    const FrequencyCalculatorInstance = FrequencyCalculator();

    request.get(DATA_URL)
    .on('error', (error) => {
        console.log('\nERROR ENCOUNTERED WHILE FETCHING DATA');
        console.log(error);
        res.status(400).send({'result':'failure'})
    })
    .pipe(FrequencyCalculatorInstance.cleanTextandCalcFrequencyStream)
    .on('finish', () => {
        let finalDataToSend = FrequencyCalculatorInstance.getTopNWords(requiredWords);
        console.log(`RESPONSE sent for ${requiredWords} words\n`);
        res.send(finalDataToSend);
    })
})


app.listen(_PORT, () => {
    console.log("==============================================");
    console.log("SERVER STARTED on PORT : ", _PORT);
    console.log("==============================================\n");
})
