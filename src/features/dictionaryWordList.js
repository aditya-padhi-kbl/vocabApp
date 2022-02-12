import {createSlice} from "@reduxjs/toolkit";
import checkDuplicateAndUpdate from "../services/checkDuplicateAndUpdate";

export const dictionaryWordList = createSlice({
    name: 'dictList',
    initialState: {
        meaningList: [],
        wordList: []
    },
    reducers: {
        updateMeaningList: (state, action) => {
            state.meaningList = [...state.meaningList, ...action.payload]
        },
        updateWordList: (state, action) => {
            state.wordList = [...checkDuplicateAndUpdate(state.wordList, action.payload)]
        }
    }
})


export const getMeaningList = state => state.dictionaryList.meaningList
export const getWordList = state => state.dictionaryList.wordList;

export const {updateMeaningList, updateWordList} = dictionaryWordList.actions;

export default dictionaryWordList.reducer;