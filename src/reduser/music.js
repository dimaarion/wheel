import { createSlice } from '@reduxjs/toolkit'
import Database from "../components/Database";

const database = new Database();

export const music = createSlice({
    name: 'music',
    initialState: {
        value: database.db.music,
    },
    reducers: {
        updateMusic: (state,action) => {
            state.value = action.payload;
            database.setMusic(state.value);
        },
    },
})

// Action creators are generated for each case reducer function
export const {updateMusic} = music.actions

export default music.reducer