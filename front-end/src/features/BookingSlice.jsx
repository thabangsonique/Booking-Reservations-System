import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  resource: "",
  date: "",
  time: "", //user selected
  isModalOpen: false,
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    //set update state  for booking details.
    updateReservation(state, action) {
      Object.assign(state, action.payload);
    },
    //open the modal form.
    modalOpen(state) {
      state.isModalOpen = true;
    },
    //close the modal form.
    modalClose(state) {
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
