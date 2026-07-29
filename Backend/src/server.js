import BookingsRoutes from "./routes/BookingsRoutes.js";
import express from "express";

const app = express();

//json reader middleware
app.use(express.json());

const port = 3001;

//ROUTES.
app.use("/api", BookingsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
