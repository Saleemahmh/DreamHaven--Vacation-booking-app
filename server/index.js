const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/auth");
const listingRoutes = require("./routes/listing");
const bookingRoutes = require("./routes/booking.js");
const userRoutes = require("./routes/user.js");
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/*Routes */

app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);
/* Moongoose setup */

const PORT = 5000;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "dreamhavendb",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port : ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
