import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import fetchWordMeaning from "../services/fetchWordMeaning";
import {updateMeaningList, updateWordList} from "./dictionaryWordList";

const initialState = {
    word: '',
    wordMeaning: [],
    synonyms: [],
    wordFetchState: 'idle'
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
    },
    extraReducers: builder => {
        builder.addCase(getWordMeaning.pending, (state, action) => {
            state.wordFetchState = "pending";
        }).addCase(getWordMeaning.fulfilled, (state, action) => {
            state.wordFetchState = "idle";
        }).addCase(getWordMeaning.rejected, (state, action) => {
            state.wordFetchState = "rejected";
        })
    }
})


export const getWordMeaning = createAsyncThunk('dictWord/getWordMeaning', async (word, thunkAPI) => {
    try {
        let list = await fetchWordMeaning(word);
        if (!list.fromCache) {
            if (list?.result?.length > 0) {
                let wordList = list.result.map(({word, queriedOn, id}) => ({word, queriedOn, id}));
                thunkAPI.dispatch(updateMeaningList(list.result));
                thunkAPI.dispatch(updateWordList(wordList));
            }
        }
        thunkAPI.dispatch(setWordMeaning(list.result));
    } catch (e) {
        thunkAPI.rejectWithValue("Error while fetching data")
    }
})

export const getSearchedWord = state => state.dictionaryWord.word;
export const getSearchedWordMeaning = state => state.dictionaryWord.wordMeaning;
export const getSynonyms = state => state.dictionaryWord.synonyms;
export const getWordFetchState = state => state.dictionaryWord.wordFetchState;

export const {setWord, setWordMeaning, setSynonyms, resetWord} = dictionaryWord.actions;
export default dictionaryWord.reducer;