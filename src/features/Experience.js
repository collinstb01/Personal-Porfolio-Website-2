import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createexperience = createAsyncThunk(
  "post/experience",
  async (experience) => {
    try {
      const response = await axios.post(
        "https://fine-plum-sea-lion-cap.cyclic.app/api/experience/createexperience",
        experience
      );
      // "https://personalporfolio2.herokuapp.com/api/experience/createexperience", experience)

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const ExperienceSlice = createSlice({
  name: "experience",
  initialState: {
    message: [],
    loading: true,
  },
  reducers: {},
  extraReducers: {
    [createexperience.pending]: (state, action) => {
      return { ...state, loading: true };
    },
    [createexperience.fulfilled]: (state, action) => {
      return { ...state, loading: false, message: action.payload };
    },
    [createexperience.rejected]: (state, action) => {
      return { ...state, loading: false };
    },
  },
});

export default ExperienceSlice.reducer;
