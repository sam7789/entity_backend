const express = require("express");

const router = express.Router();
const Course = require("../model/course.model");

router.get("/", async (req, res) => {
  let page = req.query.page || 1;
  let limit = req.query.limit || 5;
  let skip = (page - 1) * limit;
  let rating = req.query.rating || 0;
  let sortBy = req.query.sortBy || {};
  let order = req.query.order || "asc";
  try {
    let orderBy = 1;
    if (req.query.order === "desc") {
      orderBy = -1;
    }
    let sort = {};
    if (sortBy) {
      sort = { [sortBy]: orderBy };
    }
    let ratingFilter = {};
    if (rating) {
      ratingFilter = { rating: { $lte: rating } };
    }
    let courses = await Course.find(ratingFilter)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .lean()
      .exec();

    let total = await Course.countDocuments(ratingFilter).exec();
    res.status(200).send({ courses: courses, total: total });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
