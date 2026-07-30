import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
  name: "",
  email: "",
  resource: "",
  date: "",
  time: "",
};

const reservationSlices = createSlice({
  name: "reservation",
  initialState,
  reduders: {},
});
