const checkDuplicateAndUpdate = (reducerList = [], words=[]) => {
    let reducerWordsSet = new Set(reducerList.map(item => item.word));
    let deepClonedReducerList = JSON.parse(JSON.stringify(reducerList));
    /**
     * First only get unique values to reduce repeated check
     *
     */

    let uniqueWords = words.reduce( (acc, value) => {
        let word = value?.word;
        if (!acc.wordList.includes(word)) {
           acc.wordList = [...acc.wordList, word];
           acc.uniqueList = [...acc.uniqueList, value];
        }
        return acc
    }, {
        wordList: [],
        uniqueList: []
    })

    let {uniqueList = []} = {...uniqueWords}
    uniqueList.forEach(param => {
        if (!reducerWordsSet.has(param?.word)) {
            deepClonedReducerList = [...deepClonedReducerList, param]
        }
    })

    return deepClonedReducerList;
}

export default checkDuplicateAndUpdate;