const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/Gig");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Get gig list
router.get("/", (req, res) =>
  Gig.findAll()
    .then((gigs) => {
      res.render("gigs", {
        gigs,
      });
    })
    .catch((err) => console.log(err))
);

// Display add gig form
router.get("/add", (req, res) => {
  res.render("add");
});

// Add a gig
router.post("/add", (req, res) => {
  let { title, tecnologies, budget, description, contactEmail } = req.body;
  let errors = [];

  // Validate Fields
  if (!title) {
    errors.push({ text: "Please add a title" });
  }
  if (!tecnologies) {
    errors.push({ text: "Please add some techonologies" });
  }
  if (!description) {
    errors.push({ text: "Please add a tdescription" });
  }
  if (!contactEmail) {
    errors.push({ text: "Please add a contact email" });
  }

  // Check for errors
  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      tecnologies,
      budget,
      description,
      contactEmail,
    });
  } else {
    if (!budget) {
      budget = "Unknown";
    } else {
      budget = `$${budget}`;
    }

    // Make lowercase and remove space after comma
    tecnologies = tecnologies.toLowerCase().replace(/, /g, ",");

    // Insert into table
    Gig.create({
      title,
      description,
      tecnologies,
      budget,
      contactEmail,
    })
      .then((gig) => res.redirect("/gigs"))
      .catch((err) => console.log(err));
  }
});

// Search for gigs
router.get("/search", (req, res) => {
  let { term } = req.query;

  term = term.toLowerCase();

  Gig.findAll({ where: { tecnologies: { [Op.like]: "%" + term + "%" } } })
    .then((gigs) => res.render("gigs", { gigs }))
    .catch((err) => console.log(err));
});

module.exports = router;
