import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import {
  useGetReservationsQuery,
  useDeleteReservationMutation,
} from "../features/api";
import { format } from "date-fns";

const tables = [
  "Table 1",
  "Table 2",
  "Table 3",
  "Table 4",
  "Table 5",
  "Table 6",
];

export default function ExistingReservations({ dispatch }) {
  const [selectedTable, setSelectedTable] = useState();
  const [selectReservedDate, setSelectReservedDate] = useState();
  const [deleteReservation] = useDeleteReservationMutation();
  const formatedDate = selectReservedDate
    ? format(selectReservedDate, "yyyy-MM-dd")
    : "";

  const {
    data: bookings = [],
    isLoading,
    error,
  } = useGetReservationsQuery(
    {
      resource: selectedTable,
      date: formatedDate,
    },
    {
      skip: !selectedTable || !formatedDate,
    },
  );

  console.log(
    `FETCHING RESERVATIONS selected: ${formatedDate}, ${selectedTable} `,
  );

  console.log("RESERVATIONS:", bookings);

  // HANDLE DELET RESERVATION
  const handleDelete = async (id) => {
    try {
      await deleteReservation(id).unwrap();
    } catch (error) {
      console.error("Failed to delete reservation:", err);
    }
  };
  return (
    <div className="mt-10 rounded-xl -mx-20 md:mx-0 md:w-[800px] p-5 bg-gray-400/30 border border-secondary space-y-10">
      <h1 className="text-2xl mt-8">View Your Current Reservations</h1>

      {/* date and table selection */}
      <div>
        <h2 className="text-2xl mb-10">Date</h2>
        <DayPicker
          mode="single"
          selected={selectReservedDate}
          onSelect={(date) => {
            setSelectReservedDate(date);
          }}
          classNames={{
            months: "flex justify-center",
            caption: "flex justify-center relative mb-4",
            caption_label:
              "uppercase tracking-wide text-sm font-semibold text-gray-800",
            nav: "absolute  top-0 left-0 right-0 flex justify-between",
            selected: "bg-[#3D0D0D] rounded text-white hover:bg-[#3D0D0D]",
            today: "border rounded border-[#3D0D0D]",
            button_next: "text-primary hover:bg-primary/10 rounded-full p-2",
            button_previous:
              "text-primary hover:bg-primary/10 rounded-full p-2",
          }}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-2xl">Select a table</label>
        <select
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
          className="bg-tertiary border border-secondary p-2 rounded-2xl mt-5"
        >
          <option value="">Select a table</option>
          {tables.map((table, idx) => (
            <option key={idx}>{table}</option>
          ))}
        </select>
      </div>

      {/* RESERVATIONS DISPLAY */}
      <div>
        {selectedTable &&
          formatedDate &&
          !isLoading &&
          bookings.length === 0 && (
            <p className="text-xl">
              {" "}
              No Reservations Found For The Selected Date And Table!
            </p>
          )}

        {/* loading state */}
        {isLoading && <p className="text-xl">Loading Reservations...</p>}

        {/* errors */}
        {error && (
          <p className="text-red-700">
            Failed to load reservations. Please try again!
          </p>
        )}
      </div>

      {bookings.map((booking, idx) => (
        <div className="text-xl mb-10 border-b border-secondary/30 pb-5">
          <h1 className="mb-3 font-bold">
            Full Name:<span className="font-light"> {booking.name}</span>
          </h1>
          <h1 className="mb-3 font-bold">
            email:<span className="font-light"> {booking.email}</span>
          </h1>
          <h1 className="mb-3 font-bold">
            resource:<span className="font-light"> {booking.resource}</span>
          </h1>
          <h1 className="mb-3 font-bold">
            date: <span className="font-light">{booking.date}</span>
          </h1>
          <h1 className="mb-3 font-bold">
            time: <span className="font-light">{booking.time}</span>
          </h1>

          <button
            onClick={() => handleDelete(booking.id)}
            className="primary-btn btn-hover text-white"
          >
            Cancel Reservation
          </button>
        </div>
      ))}
    </div>
  );
}
