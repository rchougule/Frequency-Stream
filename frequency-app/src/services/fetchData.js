/**
 * contains the code to fetch data from the backend
 */

 function getFrequencyWords(N) {
    const wordCount = N || '20';

    /**
     * if result available, render the array
     * else, render empty array
     */
    return fetch('http://18.188.193.86:8080/getWords?words=' + wordCount)
    .then((result) => {
       return result.json();
    })
    .catch((err) => {
       return [];
    })
 }

 export default getFrequencyWords;