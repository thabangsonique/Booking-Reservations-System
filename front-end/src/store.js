import { configureStore } from "@reduxjs/toolkit";
import BookingSlice from "./features/BookingSlice";

export default configureStore({
  reducer: {
    reservation: BookingSlice,
  },
});
