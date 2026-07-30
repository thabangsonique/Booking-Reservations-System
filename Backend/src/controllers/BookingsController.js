import { allTimeSlots, bookings } from "../data/bookings.js";

//creating a reservation.
export const createReservation = (req, res) => {
  const { name, email, resource, date, time } = req.body;

  //check if booking exists.
  const existingBooking = bookings.find(
    (booking) =>
      booking.resource === resource &&
      booking.date === date &&
      booking.time === time,
  );

  if (existingBooking) {
    return res.json({ message: "This time slot is already booked!" });
  }

  const newBooking = {
    id: bookings.length + 1,
    name,
    email,
    resource,
    date,
    time,
  };

  bookings.push(newBooking);
  res.json(newBooking);
};

//GET request- fetch reservations usding resource and date.
export const getReservations = (req, res) => {
  const { resource, date } = req.params;

  //fetch matching from the data.
  const reservations = bookings.filter(
    (booking) => booking.resource === resource && booking.date === date,
  );

  if (!reservations) {
    return res.status(404).json({
      message: "No reservations found for this table on this date!",
    });
  }
  res.json(reservations);
};

//delete reservation.
export const deleteReservation = (req, res) => {
  const id = Number(req.params.id);

  //check if reservation exists using the index.
  const index = bookings.findIndex((booking) => booking.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Reservation not found!" });
  }

  //delete the reservation.
  bookings.splice(index, 1);

  res.status(200).json({ message: "Reservation was cancelled successfully!" });
};

//get available slots.
export const getTimeSlots = (req, res) => {
  const { resource, date } = req.query;

  //get reservation for this data.
  const bookedReservations = bookings.filter(
    (booking) => booking.resource === resource && booking.date === date,
  );

  //check times.
  const bookedTimes = bookedReservations.map((reservation) => reservation.time);

  //return available time to user.
  const availableTimes = allTimeSlots.filter((slot) => {
    return !bookedTimes.includes(slot);
  });

  res.json(availableTimes);
};
