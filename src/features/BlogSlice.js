import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createblog = createAsyncThunk(
  "blogs/createblog",
  async ({image, title, category, message}) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/blogs/createblog",
        {image, title, category, message}
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getblogs = createAsyncThunk("blogs/getblogs", async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/blogs/getblogs"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getblog = createAsyncThunk("blogs/getblog", async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/blogs/getblog/${id}`, id)
    
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
const BlogSlice = createSlice({
  name: "skill",
  initialState: {
    blogs: [],
    blog: {},
    message: "",
    loading: true
  },
  reducers: {},
  extraReducers: {
    [createblog.pending]: () => {
      return { message: "Pending" };
    },
    [createblog.fulfilled]: (state, action) => {
      return { ...state, message: action.payload, loading: false };
    },
    [createblog.rejected]: (state) => {
      return { ...state, message: "failed to retrieve the data" };
    },
    [getblogs.pending]: (state) => {
      return { ...state, message: "collecting data", loading: true };
    },
    [getblogs.fulfilled]: (state, action) => {
      return { ...state, message: "sucessful", blogs: action.payload, loading: false };
    },
    [getblogs.rejected]: (state) => {
      return { ...state, message: "failed to retrieve the data", loading: false };
    },
    [getblog.pending]: (state) => {
      return { ...state, message: "collecting data", loading: true };
    },
    [getblog.fulfilled]: (state, action) => {
      return { ...state, message: "sucessful", blog: action.payload, loading: false };
    },
    [getblog.rejected]: (state) => {
      return { ...state, message: "failed to retrieve the data", loading: false };
    }
  },
});

export default BlogSlice.reducer;
