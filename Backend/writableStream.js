const TextCleaning = require('./textCleaning');
const FrequencyCalculation = require('./frequencyCalculation');
const { Writable } = require('stream');

/**
 * 
 * 1. A Writable stream is created to continuously calcualte the frequency as and when the data arrives from the GET request.
 * 2. This prevents the memory from overflooding as it won't store the whole data received via the get request.
 * 3. Chunks are analysed as and when they are received and only the required data is stored, i.e. Object which stores the frequency of the words
 * 4. Therefore, even if the GET request fetches a file of x MB or y GBs, the Node.js process will use minimum amount of RAM required to store the Frequency Object, and not the whole data.
 */
function InitiateFrequencyCalculation() {

    let finalFrequency = {};

    const writableStream = new Writable({
        write(chunk, encoding, callback) {
            let cleanText = TextCleaning.removeNonWords(chunk.toString());
            let requiredText = TextCleaning.removeSpecifiedWords(cleanText);
            finalFrequency = FrequencyCalculation.calculateFrequency(requiredText, finalFrequency);
            callback();
        }
    })

    const getTopNWords = (N) => {
        return FrequencyCalculation.topNwords(N, finalFrequency);
    }

    return {
        cleanTextandCalcFrequencyStream: writableStream,
        getFinalFrequencyData: () => { return finalFrequency },
        getTopNWords
    }
}

module.exports = InitiateFrequencyCalculation;

