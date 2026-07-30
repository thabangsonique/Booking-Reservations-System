import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  resource: "",
  date: "",
  time: "", //retrieved from the backend
  isModalOpen: false,
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    //set update state  for booking details.
    updateReservation(state, action) {
      object.assign(state, action.payload);
    },
    //open the modal form.
    modalOpen(state, action) {
      state.isModalOpen = true;
    },
    //close the modal form.
    modalClose(state, action) {
      state.isModalOpen = false;
    },
    //upon submition reset the reservation
    resetReservation() {
      return initialState;
    },
  },
});
export const { updateReservation, modalClose, modalOpen, resetReservation } =
  reservationSlice.actions;
export default reservationSlice.reducer;
