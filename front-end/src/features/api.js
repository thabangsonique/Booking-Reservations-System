import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: ["Reservations", "TimeSlots"],
  endpoints: (build) => ({
    //get available timeslots.
    getTimeSlots: build.query({
      query: ({ resource, date }) =>
        `/api/slots?resource=${resource}&date=${date}`,
      providesTags: ["TimeSlots"],
    }),

    //create reservation.(mutation)
    createReservation: build.mutation({
      query: ({ reservation }) => ({
        url: "/api/bookings",
        method: "POST",
        body: reservation,
      }),
    }),

    //get reservations.
    getReservations: build.query({
      query: ({ resource, date }) =>
        `/bookings?resource=${resource}&date=${date}`,
      providesTags: ["Reservations"],
    }),

    //delete reservation.
    deleteReservation: build.mutation({
      query: (id) => ({
        url: `/api/Bookings/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Reservations", "TimeSlots"],
    }),
  }),
});

export const { useGetTimeSlotsQuery, useCreateReservationMutation } = api;
