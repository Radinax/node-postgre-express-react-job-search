const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

// Routes
const gigs = require("./routes/gigs");

// Database
const db = require("./config/database");

// Connect DB
db.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error: ", err));

const app = express();

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
app.options("*", cors());

/// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Gig routes
app.use("/gigs", gigs);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
