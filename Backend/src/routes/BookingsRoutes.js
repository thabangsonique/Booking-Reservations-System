import { Router } from "express";
import {
  createReservation,
  deleteReservation,
  getReservations,
  getTimeSlots,
} from "../controllers/BookingsController.js";

const router = Router();

router.post("/bookings", createReservation);
router.get("/bookings/:date/:resource", getReservations);
router.get("/slots", getTimeSlots);
router.delete("/bookings/:id", deleteReservation);

export default router;
