import { createSlice } from '@reduxjs/toolkit'
import gar from "../assets/garage.json"
import {get, set} from "lockr";





export const garage = createSlice({
    name: 'garage',
    initialState: {
        value: get("lockr_garages"),
    },
    reducers: {
        updateGarage: (state,action) => {
            state.value = action.payload;
            set("lockr_garages",state.value)
        },


    },
})

// Action creators are generated for each case reducer function
export const {updateGarage} = garage.actions

export default garage.reducer