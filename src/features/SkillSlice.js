import { creatSlice, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createproject = createAsyncThunk(
  "skils/skill",
  async (formData) => {
    try {
      const response = await axios.post(
        "https://personalporfolio2.herokuapp.com/api/post/createproject",
        formData
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createskill = createAsyncThunk(
  "skils/createskill",
  async (skillData) => {
    try {
      const response = await axios.post(
        "https://personalporfolio2.herokuapp.com/api/post/createskill",
        skillData
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getposts = createAsyncThunk("skils/getposts", async () => {
  try {
    const response = await axios.get(
      "https://personalporfolio2.herokuapp.com/api/post/getposts"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const login = createAsyncThunk(
  "skils/login",
  async ({ loginData, navigate }) => {
    try {
      const response = await axios.post(
        "https://personalporfolio2.herokuapp.com/api/user/login",
        loginData
      );
      console.log(response.data);
      navigate("/postfortechsavvy");
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
);
const SkillSlice = createSlice({
  name: "skill",
  initialState: {
    posts: [],
    messageSkill: {},
    user: "",
    loading: true
  },
  reducers: {},
  extraReducers: {
    [createproject.pending]: () => {
      return { messageSkill: "Pending" };
    },
    [createproject.fulfilled]: (state, action) => {
      return { ...state, messageSkill: action.payload, loading: false };
    },
    [createproject.rejected]: (state) => {
      return { ...state, messageSkill: "failed to retrieve the data" };
    },
    [getposts.pending]: (state) => {
      return { ...state, messageSkill: "collecting data", loading: true };
    },
    [getposts.fulfilled]: (state, action) => {
      return { ...state, messageSkill: "sucessful", posts: action.payload, loading: false };
    },
    [getposts.rejected]: (state) => {
      return { ...state, messageSkill: "failed to retrieve the data", loading: false };
    },
    [login.pending]: (state) => {
      return { ...state, messageSkill: "collecting data" };
    },
    [login.fulfilled]: (state, action) => {
      localStorage.setItem("authuser", JSON.stringify(action.payload));
      return { ...state, messageSkill: "sucessful", user:JSON.stringify(action.payload) };
    },
    [login.rejected]: (state) => {
      return { ...state, messageSkill: "failed to retrieve the data" };
    },
  },
});

export const getSkill = (state) => state.skill.skill;
export const getMessageSkill = (state) => state.messageSkill.messageSkill;
export default SkillSlice.reducer;
