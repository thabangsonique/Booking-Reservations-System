import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Navbar from "../component/Navbar";
import background from "../../public/wine.png";
import { useDispatch, useSelector } from "react-redux";
import {
  updateReservation,
  modalOpen,
  modalClose,
  resetReservation,
} from "../features/BookingSlice";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import Footer from "../component/Footer";
import { id } from "date-fns/locale";
import {
  useGetTimeSlotsQuery,
  useCreateReservationMutation,
} from "../features/api";
import ExistingReservations from "../component/ExistingReservations";
import { useEffect } from "react";

const tables = [
  "Table 1",
  "Table 2",
  "Table 3",
  "Table 4",
  "Table 5",
  "Table 6",
];

//temporary
const timeslots = [
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
];

export default function Reserve() {
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedSlot, setSelectedSlot] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [
    createReservation,
    { isLoading: isCreatingReservation, isSuccess, isError, reset },
  ] = useCreateReservationMutation();

  //fetch the available timeslots form the backend.
  //grab data from the state
  const reservation = useSelector((state) => state.reservation);

  useEffect(() => {
    localStorage.setItem("reservation", JSON.stringify(reservation));
  }, [reservation]);
  //use data to fetch backend slots withn api.
  const {
    data: availableSlots = [],
    error,
    isLoading,
  } = useGetTimeSlotsQuery(
    {
      resource: reservation.resource,
      date: reservation.date,
    },
    { skip: !reservation.resource || !reservation.date },
  );
  console.log({ reservation, availableSlots, error, isLoading });

  // submit the reservation to the backend
  const handleReservation = async (e) => {
    e.preventDefault();
    const bookingData = {
      name: reservation.name,
      email: reservation.email,
      resource: reservation.resource,
      date: reservation.date,
      time: reservation.time,
    };

    try {
      const result = await createReservation({
        reservation: bookingData,
      }).unwrap();
    } catch (error) {
      console.error("Failed to  create booking:", error);
    }
  };

  //closing the modal form.
  const handleCloseModal = () => {
    reset();
    dispatch(modalClose());
    dispatch(resetReservation());
    setSelectedDate(null);
    setSelectedSlot(null);
    setIsSelected(null);
  };

  return (
    <div className="relative h-screen bg-tertiary">
      <div className={`${modalOpen ? null : "sticky top-0 bg-tertiary z-50"}`}>
        <Navbar />
      </div>
      {/* contents */}
      <div className="px-24 pb-11.5 ">
        {/* heading text */}
        <div className="text-center md:mx-auto mt-11.5  md:w-[651px]">
          <h1 className="md:text-[48px] text-3xl">Secure Your Experience</h1>
          <p className="mt-4 font-manrope">
            Select your preferred dining environment, date, and time. Each table
            at L'Essence offers a unique perspective of our culinary artistry.
          </p>
        </div>

        {/* VIEW ALL RESERVATIONS */}
        <div>
          <ExistingReservations reservation={reservation} dispatch={dispatch} />
        </div>

        {/* table + reservation details */}
        <div className="grid xl:grid-cols-2 gap-20 mt-[64px]">
          {/* left-side */}
          <div>
            <h3 className="text-[24px] font-regular">1. Select Your Table</h3>

            {/* choose table section */}
            <div className="rounded-xl py-10 md:py-0 px-10 md:px-10 w-[400px] md:w-[600px] bg-gray-400/30 mt-5 border border-secondary -mx-20 md:mx-0">
              {/* table selection */}
              <div className="xl:px-20 xl:py-10 md:px-10 md:py-5 ">
                <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:gap-10 md:gap-10 xl:mt-20 md:mt-5">
                  {tables.map((table, idx) => (
                    <button
                      onClick={() => {
                        console.log("clicked", table);
                        setIsSelected(table);
                        dispatch(updateReservation({ resource: table }));
                      }}
                      key={idx}
                      className={`rounded-full btn-hover text-black py-2 px- md:py-5 md:px-5 transition-all duration-300 ${isSelected === table ? "bg-primary text-white" : "border border-secondary"}`}
                    >
                      {table}
                    </button>
                  ))}
                </div>

                {/* table availability */}
                <div className="flex gap-10 mt-10 xl:mt-[110px] md:mt-10">
                  <div className="flex space-x-3">
                    <div className="bg-primary h-5 w-5 rounded" />
                    <p className="font-manrope">Selected</p>
                  </div>
                  <div className="flex space-x-3">
                    <div className="border border-secondary h-5 w-5 rounded" />
                    <p className="font-manrope">Available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* date selection */}
            <div className="mt-12 -ml-15 md:ml-0">
              <h3 className="text-[24px] font-regular">2. Select Date</h3>
              {/* calendar */}
              <div className="mt-10 bg-gray-400/10 p-8 rounded-xl border border-secondary">
                {" "}
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    if (date) {
                      dispatch(
                        updateReservation({ date: format(date, "yyyy-MM-dd") }),
                      );
                    }
                  }}
                  classNames={{
                    months: "flex justify-center",
                    caption: "flex justify-center relative mb-4",
                    caption_label:
                      "uppercase tracking-wide text-sm font-semibold text-gray-800",
                    nav: "absolute  top-0 left-0 right-0 flex justify-between",
                    selected:
                      "bg-[#3D0D0D] rounded text-white hover:bg-[#3D0D0D]",
                    today: "border rounded border-[#3D0D0D]",
                    button_next:
                      "text-primary hover:bg-primary/10 rounded-full p-2",
                    button_previous:
                      "text-primary hover:bg-primary/10 rounded-full p-2",
                  }}
                />
              </div>
            </div>
          </div>

          {/* RESERVATION DETAILS */}
          {/* right-side */}
          <div className="bg-gray-400/30 rounded-xl p-[32px] border border-secondary -ml-15 md:ml-0">
            <h3 className="text-[24px] font-regular">Reservation Details</h3>

            {/* timeslots */}
            <div className="mt-7.75">
              <p className="font-manrope">Available Time Slots</p>

              {/* slots */}
              <div className=" flex grid grid-cols-3 gap-5 mt-4">
                {/* RENDAR TIMESLOTS FORM THE BACKEND */}
                {availableSlots.map((slot, idx) => (
                  <div
                    onClick={() => {
                      setSelectedSlot(slot);
                      dispatch(updateReservation({ time: slot }));
                    }}
                    key={idx}
                    className={`border border-secondary text-center py-3 px-3 btn-hover transition-all ${selectedSlot === slot ? "bg-primary text-white" : "text-black"}`}
                  >
                    {slot}
                  </div>
                ))}
              </div>

              {/* line divider */}
              <div className="w-full h-[2px] bg-secondary/40 mt-10" />

              {/* reservation details */}
              <div className="mt-10 text-primary space-y-4">
                <div className="flex justify-between">
                  <p>Table</p>
                  <p>{reservation.resource}</p>
                </div>
                <div className="flex justify-between">
                  {" "}
                  <p>Date</p>
                  <p>{reservation.date}</p>
                </div>
                <div className="flex justify-between">
                  {" "}
                  <p>Time</p>
                  <p>{reservation.time}</p>
                </div>
              </div>

              {/* reservation button */}
              <button
                onClick={() => dispatch(modalOpen())}
                className="mt-10 text-center w-full bg-primary text-white py-8 btn-hover"
              >
                Reserv Table
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL OPEN */}
      {reservation.isModalOpen ? (
        <div className="fixed inset-0 z -[100] flex items-center justify-center bg-black/40 ">
          {/* card form*/}
          <div className="relative flex flex-col items-center justify-center w-[512px] h-[900px] overflow-hidden overflow-y-auto modal-scrollbar-hidden rounded-lg px-8  pb-20 bg-tertiary">
            {/* close button */}
            <div
              onClick={() => handleCloseModal()}
              className="absolute flex items-center justify-center top-5 right-5 rounded-full bg-primary text-white shrink-0 h-5 w-5 text-sm font-manrope hover:scale-110 hover:shadow-lg hover:cursor-pointer transition-all duration-300"
            >
              X
            </div>
            {/* image */}
            <div className="mx-auto">
              {" "}
              <img
                src="/modal.png"
                alt="modal resturant image"
                className="h-50 w-50 object-cover"
              />
            </div>
            {/* complete reservation text(absolute) */}
            <div className="text-center">
              <h1>Complete Your Reservation</h1>
              <p>Confirm your details for Monday, Nov 11 at 19:30</p>
            </div>

            {/* Form content */}
            <form
              onSubmit={handleReservation}
              className="  w-full items-start mt-8 space-y-10"
            >
              <div className="flex flex-col space-y-6 border-b border-secondary pb-5">
                <label
                  htmlFor="fullName"
                  className="uppercase text-secondary font-manrope font-bold"
                >
                  full name
                </label>
                <input
                  id="fullName"
                  value={reservation.name}
                  onChange={(e) =>
                    dispatch(updateReservation({ name: e.target.value }))
                  }
                  type="text"
                  placeholder="E.g. Julian Devereaux"
                  className=" text-black focus:outline-none"
                />
              </div>

              {/* email address */}
              <div className="flex flex-col space-y-6 border-b border-secondary pb-5">
                <label
                  htmlFor="fullName"
                  className="uppercase text-secondary font-manrope font-bold"
                >
                  email address
                </label>
                <input
                  id="fullName"
                  value={reservation.email}
                  onChange={(e) =>
                    dispatch(updateReservation({ email: e.target.value }))
                  }
                  type="text"
                  placeholder="E.g. Julian Devereaux"
                  className="text-black focus:outline-none"
                />
              </div>

              {/* checkbox */}
              <div className="flex gap-4">
                {/* box */}
                <button
                  type="button"
                  onClick={() => setIsChecked((prev) => !prev)}
                  className={`h-5 w-5 shrink-0 rounded border border-secondary ${isChecked ? "bg-secondary" : ""}`}
                ></button>
                <p className="text-[12px] font-medium">
                  Sign me up for the L'Essence Privé newsletter to receive
                  exclusive invitations and seasonal menu previews.
                </p>
              </div>

              {/* confirm button - submitting the form*/}
              <button
                type="submit"
                disabled={isCreatingReservation || isSuccess}
                className="uppercase primary-btn btn-hover w-full text-white font-manrope tracking-widest"
              >
                {isLoading
                  ? "confirming your booking..."
                  : isSuccess
                    ? "Booking Successful!"
                    : "confirm booking"}
              </button>
            </form>

            {/* error text */}
            {isError ? (
              <P className="text-red-500 mt-10">
                failed to confirm booking. Please try again later!
              </P>
            ) : null}

            {/* //check icon */}

            {isSuccess ? (
              <div className="mt-8 flex flex-col items-center justify-center">
                {" "}
                <CheckCircle2 className="text-green-700" />
                <div className="mt-10 space-y-4">
                  <h2 className="text-primary text-xl">Your Reservation:</h2>
                  <p>Full Name: {reservation.name}</p>
                  <p>Email: {reservation.email}</p>
                  <p>Table: {reservation.resource}</p>
                  <p>Date: {reservation.date}</p>
                  <p>Time: {reservation.time}</p>
                </div>
              </div>
            ) : null}

            {/* Reservation informatiion */}
          </div>
        </div>
      ) : null}
      {/* FOOTER */}
      <div>
        <Footer />
      </div>
    </div>
  );
}
