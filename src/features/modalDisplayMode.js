import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    modalDisplayMode: 1
}
export const ModalDisplayMode = createSlice({
    name: 'modalDisplayMode',
    initialState,
    reducers: {
        setModalDisplayMode(state, action) {
            state.modalDisplayMode = action.payload
        }
    }
})

export const getModalDisplayMode = state => state.modalDisplayMode.modalDisplayMode;
export const {setModalDisplayMode}   = ModalDisplayMode.actions;
export default ModalDisplayMode.reducer;