import conf from "../conf";
import { nanoid } from 'nanoid'
const fetchFromLocalStorage = word => {
    return new Promise((resolve, reject) => {
        let wordList = JSON.parse(localStorage.getItem("wordList"));
        if (wordList) {
            let filtered = wordList.filter(item => item?.word === word);
            resolve(filtered)
        } else resolve([]);

    })
}

const updateLocalStorage = word => {
    let list = JSON.parse(localStorage.getItem("wordList"));
    if (list) {
        list = [...list, ...word];
    } else {
        list = [...word]
    }

    localStorage.setItem("wordList", JSON.stringify(list));
}
const fetchWordMeaning = async words => {
    let fetchFromCache = await fetchFromLocalStorage(words);
    if (fetchFromCache.length === 0) {
        let wordMeaning = await fetch(conf.API + words).then(response => response.json());

        if (Array.isArray(wordMeaning)) {
            wordMeaning.forEach(word => {
               word["queriedOn"] = Date.now();
               word["id"] = nanoid(10)

            })
            updateLocalStorage(wordMeaning)

            return {result: wordMeaning, fromCache: false}
        }
        return {result: [], fromCache: false};
    } else {
        return {result: fetchFromCache, fromCache: true}
    }

}

export default fetchWordMeaning;