import { configureStore } from "@reduxjs/toolkit";
import BookingSlice from "./features/BookingSlice";
import { api } from "./features/api";

export default configureStore({
  reducer: {
    reservation: BookingSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
