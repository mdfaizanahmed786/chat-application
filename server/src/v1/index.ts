// require("dotenv").config();
// import dotenv in es6
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import channelRoutes from "./routes/channelRoutes.js";

import userRoutes from "./routes/userRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";
import uploadMedia from "./routes/uploadMedia.js";

const PORT = 5000 || process.env.PORT;
const app = express();
import mongoose from "mongoose";

// defining all middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
//defining all routes
app.use("/api/v1",channelRoutes );
app.use("/api/v1", userRoutes);
app.use("/api/v1", messagesRoutes)
app.use("/api/v1", uploadMedia);




// Connection to the database


mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((e: any)=> console.log(e));
