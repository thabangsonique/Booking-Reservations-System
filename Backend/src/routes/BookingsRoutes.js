import { Router } from "express";
import { createReservation } from "../controllers/BookingsController.js";
import { getReservations } from "../controllers/BookingsController.js";

const router = Router();

router.post("/bookings", createReservation);
router.get("/bookings/:date/:resource", getReservations);

export default router;
