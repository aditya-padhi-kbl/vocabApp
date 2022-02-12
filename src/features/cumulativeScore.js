import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cumulativeScoreValue: 0
}

export const CumulativeScore = createSlice({
    name: 'cumulativeScore',
    initialState,
    reducers: {
        resetCumulativeScore(state) {
            Object.assign(state, initialState)
        },
        setCumulativeScore(state, action) {
            state.cumulativeScoreValue += action.payload
        }
    }
})

export const getCumulativeScore = state => state.cumulativeScore.cumulativeScoreValue;
export const {resetCumulativeScore, setCumulativeScore} = CumulativeScore.actions
export default CumulativeScore.reducer;