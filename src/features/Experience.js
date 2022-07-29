import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const createexperience = createAsyncThunk(
    "post/experience",
    async (experience) => {
        try {
        const response = await axios.post(
        "http://localhost:5000/api/experience/createexperience", experience)

        console.log(response.data)
        return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

const ExperienceSlice = createSlice({
    name: "experience",
    initialState: {
        message: [],
        loading: true
    },
    reducers: {

    },
    extraReducers: {
        [createexperience.pending]: (state, action) => {
            return {...state, loading: true}
        },
        [createexperience.fulfilled]: (state, action) => {
            return {...state, loading: false, message: action.payload}
        },
        [createexperience.rejected]: (state, action) => {
            return {...state, loading: false}
        },
    }
})

export default ExperienceSlice.reducer