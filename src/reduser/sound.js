import {createSlice} from '@reduxjs/toolkit'
import Database from "../components/Database";


const database = new Database();

export const sound = createSlice({
    name: 'sound',
    initialState: {
        value: database.db.effect,
    },
    reducers: {
        getSound: (state, action) => {
            state.value = action.payload;
            database.setEffect(state.value);
        }
    },
})

// Action creators are generated for each case reducer function
export const {getSound} = sound.actions

export default sound.reducer