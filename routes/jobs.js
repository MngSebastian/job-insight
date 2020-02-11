const express = require("express");
const router = express.Router();
const axios = require("axios");
const Job = require("../models/Job");

router.get("/search", (req, res, next) => {
  axios
    .get(
      `https://api.adzuna.com/v1/api/jobs/${req.query.location}/search/1?app_id=${process.env.ADZUNA_API_ID}&app_key=${process.env.ADZUNA_API_KEY}&results_per_page=20&what=${req.query.jobTitle}`
    )
    .then(response => {
      res.render("all-jobs.hbs", {
        allJobs: response.data.results,
        location: req.query.location
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:id", (req, res, next) => {
  axios
    .get(
      `https://api.adzuna.com/v1/api/jobs/${req.query.location}/search/1?app_id=${process.env.ADZUNA_API_ID}&app_key=${process.env.ADZUNA_API_KEY}&results_per_page=20&what=${req.params.id}`
    )
    .then(response => {
      let location = response.data.results[0].location.area;
      let singleLoc = location[location.length - 1];
      console.log(response.data.results[0].redirect_url);
      console.log(response.data.results[0].redirect_url);

      console.log(response.data.results[0].redirect_url);

      // res.send(response.data.results[0]);
      res.render("./single-job.hbs", {
        jobData: response.data.results[0],
        location: singleLoc
      });
    });
});

// router.get("/", (req, res) => {
//   res.render("all-jobs.hbs");
// });

module.exports = router;
