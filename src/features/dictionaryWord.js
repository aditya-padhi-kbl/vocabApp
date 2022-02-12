import {createSlice} from "@reduxjs/toolkit";
import fetchWordMeaning from "../services/fetchWordMeaning";
import {updateMeaningList, updateWordList} from "./dictionaryWordList";

const initialState = {
    word: '',
    wordMeaning: [],
    synonyms: []
}
export const dictionaryWord = createSlice({
    name: 'dictWord',
    initialState,
    reducers: {
        resetWord(state) {
            Object.assign(state, initialState)
        },
        setWord: (state, action) => {
            state.word = action.payload
        },
        setWordMeaning: (state, action) => {
            state.wordMeaning = [...action.payload];
        },
        setSynonyms: (state, action) => {
            state.synonyms = [...state.synonyms, ...action.payload]
        }
    }
})

export const getWordMeaning = (word) => async dispatch => {
    let list = await fetchWordMeaning(word);
    if (!list?.fromCache) {
        dispatch(updateMeaningList(list.result));
        if (list?.result?.length > 0) {
            let wordList = list.result.map(({word, queriedOn, id}) => ({word, queriedOn, id}))
            dispatch(updateWordList(wordList));
        }


    }
    dispatch(setWordMeaning(list.result));
}

export const getSearchedWord = state => state.dictionaryWord.word;
export const getSearchedWordMeaning = state => state.dictionaryWord.wordMeaning;
export const getSynonyms = state => state.dictionaryWord.synonyms;
export const {setWord, setWordMeaning, setSynonyms, resetWord} = dictionaryWord.actions;
export default dictionaryWord.reducer;