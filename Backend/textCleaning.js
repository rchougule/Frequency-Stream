module.exports = {
    /**
     * 1. Convert each character to lower case
     * 2. Replace all the non words with a blank space.
     */
    removeNonWords: (text) => {
        return text.toLowerCase().replace(/[_\W]+/g, ' ');
    }, 

    /**
     * removes the specified word according to the given test requirements
     * 1. replaces the words with blank space
     * 2. performs the operation again to consider the overlapping cases of the regex in first step
     * 3. Can be improved by combining in a single regex
     */
    removeSpecifiedWords: (text) => {
        let levelOne = text.replace(/(\s+)(a|the|and|in|to|is|of|s)(\s+)/gi, ' ');

        // repeat the above step to consider the overlapping space cases
        return levelOne.replace(/(\s+)(a|the|and|in|to|is|of|s)(\s+)/gi, ' ');
    }
}