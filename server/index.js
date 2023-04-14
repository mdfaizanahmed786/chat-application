require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const PORT = 5000 || process.env.PORT;
const app = express();
const mongoose = require("mongoose");

// defining all middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//defining all routes
app.use("/api/v1", require("./src/v1/routes/channelRoutes"));
app.use("/api/v1", require("./src/v1/routes/userRoutes"));
app.use("/api/v1", require("./src/v1/routes/messagesRoutes"));
app.use("/api/v1", require("./src/v1/routes/uploadMedia"));

// Connection to the database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
