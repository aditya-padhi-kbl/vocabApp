import {configureStore} from "@reduxjs/toolkit";
import dictionaryWordListReducer from "./features/dictionaryWordList";
import dictionaryWordReducer from "./features/dictionaryWord";
import modalDisplayModeReducer from "./features/modalDisplayMode";
import cumulativeScoreReducer from "./features/cumulativeScore";
export const store = configureStore({
    reducer: {
        dictionaryList: dictionaryWordListReducer,
        dictionaryWord: dictionaryWordReducer,
        modalDisplayMode: modalDisplayModeReducer,
        cumulativeScore: cumulativeScoreReducer
    }
})