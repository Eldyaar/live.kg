import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSomeNews = createAsyncThunk("news/getSomeNews", async (id) => {
  if (id > 0) {
    const response = await axios.get(`http://localhost:3001/newsData/${id}`);
    return response.data.news;
  }
});

const newsDataSlice = createSlice({
  name: "news",
  initialState: {
    someNewsData: [],
    idForSomeNews: null,
  },
  reducer: {
    changeSomeNewData: (state, { payload: someData }) => {
      state.someNewsData = someData;
    },
    setIdForSomeNews: (state, { payload: id }) => {
      state.idForSomeNews = id;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getSomeNews.fulfilled,
      (state, { payload: data }) => (state.someNewsData = data)
    );
  },
});

export const newsDataReducer = newsDataSlice.reducer;
export const newsDataAction = newsDataSlice.actions;
