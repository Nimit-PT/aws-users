import "reflect-metadata";
import express from "express";
import cors from "cors";
import { initializeDatabase } from "./config/database";

import router from "./routes/user.route";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: ["http://localhost:3000", "ec2-3-219-73-233.compute-1.amazonaws.com"],
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);
// Middleware
// app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).send("success");
});
// Routes
app.use("/user", router);

// Start server
const startServer = async () => {
  await initializeDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
