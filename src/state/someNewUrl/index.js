import { configureStore } from "@reduxjs/toolkit";

import { newsDataReducer } from "./urlSlice";

export const store = configureStore({
  reducer: {
    newsData: newsDataReducer,
  },
});
