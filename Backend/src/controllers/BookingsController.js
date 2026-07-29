import { bookings } from "../data/bookings.js";

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
    return res.json({
      message: "No reservations found for this table on this date!",
    });
  }
  res.json(reservations);
};
