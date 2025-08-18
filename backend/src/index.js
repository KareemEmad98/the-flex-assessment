import express from "express";
import cors from "cors";
import morgan from "morgan";
import reviewsRouter from "./routes/reviews.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/reviews", reviewsRouter);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
}

export default app; // for Supertest
