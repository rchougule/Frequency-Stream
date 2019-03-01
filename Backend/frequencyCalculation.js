
module.exports = {

    /**
     * 1. Calculates the frequency of the words in a text by creating an Object with Keys as the words and Value as the count.
     */
    calculateFrequency: (text, finalFrequency) => {
        const wordsArray = text.split(" ");

        wordsArray.forEach((word) => {
            if(word && finalFrequency[word]) {
                finalFrequency[word]++;
            } else if(word) {
                finalFrequency[word] = 1;
            }
        })

        return finalFrequency;
    },

    /**
     * Returns the Top N words from the Object which stores the frequency of the words.
     * 1. Sorts the keys based on the value of the count
     * 2. Returns an array with only the number of records requested
     */
    topNwords: (N, finalFrequency) => {
        const keys = Object.keys(finalFrequency);
        let sortedKeys = keys.sort((a,b) => {
            return finalFrequency[b] - finalFrequency[a];
        })

        let finalSortedArray = [];

        for(let i = 0; i < sortedKeys.length; i++) {
            finalSortedArray.push({
                'word': sortedKeys[i],
                'count': finalFrequency[sortedKeys[i]]
            })
        }

        return finalSortedArray.splice(0,N);
    }
}