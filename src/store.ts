import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./slices/country/countrySlice";
import cityReducer from "./slices/city/citySlice";

export const store = configureStore({
  reducer: {
    country: countryReducer,
    city: cityReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
