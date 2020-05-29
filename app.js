const express = require("express");
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

// Database
const db = require("./config/database");

// Test DB
db.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error: ", err));

const app = express();

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

/// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Index route
app.get("/", (req, res) =>
  res.render("index", {
    layouts: "landing",
  })
);

// Gig routes
app.use("/gigs", require("./routes/gigs"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
