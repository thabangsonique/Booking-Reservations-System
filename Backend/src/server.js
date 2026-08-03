import BookingsRoutes from "./routes/BookingsRoutes.js";
import express from "express";
import cors from "cors";

const app = express();

//json reader middleware
app.use(express.json());
app.use(cors());

const port = 3001;

//ROUTES.
app.use("/api", BookingsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
