const express = require("express");
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

// Routes
const gigs = require("./routes/gigs");

// Database
const db = require("./config/database");

// Test DB
db.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error: ", err));

const app = express();

// Handlebars
/*
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");
*/

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
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

// Index route
/*
app.get("/", (req, res) =>
  res.render("index", {
    layouts: "landing",
  })
);
*/

// Gig routes
app.use("/gigs", gigs);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
