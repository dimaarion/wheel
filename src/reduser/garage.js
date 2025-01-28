import { createSlice } from '@reduxjs/toolkit'
import gar from "../assets/garage.json"
import {get, set} from "lockr";
import Database from "../components/Database";

const database = new Database();



export const garage = createSlice({
    name: 'garage',
    initialState: {
        value: database.db.player,
    },
    reducers: {
        updateGarage: (state,action) => {
            state.value = action.payload;
        },


    },
})

// Action creators are generated for each case reducer function
export const {updateGarage} = garage.actions

export default garage.reducer