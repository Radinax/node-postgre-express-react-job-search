const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/Gig");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// @route  GET /gigs
// @desc   Get all gigs available
// @access Public
router.get("/", (req, res) => {
  Gig.findAll()
    .then((gigs) => {
      res.json(gigs);
    })
    .catch((err) => console.log(err));
});

// @route  POST /gigs/add
// @desc   Add a gig
// @access Public
router.post("/add", (req, res) => {
  let { title, tecnologies, budget, description, contactEmail } = req.body;
  console.log("REQ", req);
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
    res.json({
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
      .then((gig) =>
        res.json({
          title,
          description,
          tecnologies,
          budget,
          contactEmail,
        })
      )
      .catch((err) => console.log(err));
  }
});

// @route  GET /gigs/search
// @desc   Search for Gigs
// @access Public
router.get("/search", (req, res) => {
  let { term } = req.query;

  term = term.toLowerCase();

  Gig.findAll({ where: { tecnologies: { [Op.like]: "%" + term + "%" } } })
    .then((gigs) => res.json(gigs))
    .catch((err) => console.log(err));
});

module.exports = router;
