const router = require("express").Router();
const Workout = require("../models/workout");

router.get("/workouts", (req, res) => {
  Workout.find({}, null, { sort: { day: 1 } })
    .then((dbWorkOut) => {
      res.json(dbWorkOut);
    })
    .catch((err) => {
      res.json(err);
    });
  console.log("GET WORKOUT WORKING");
});

router.post("/workouts", ({ body }, res) => {
  Workout.create({ body })
    .then((dbWorkOut) => {
      res.json(dbWorkOut);
    })
    .catch(({ err }) => {
      console.log(err);
    });
  console.log("POST WORKOUT  WORKING");
});

router.put("/workouts/:id", ({ params, body }, res) => {
  console.log("Parameters: ", body, params);

  Workout.findByIdAndUpdate(
    { _id: params.id },
    { $push: { exercises: body } },
    { new: true }
  )
    .then((dbWorkOut) => {
      res.json(dbWorkOut);
    })
    .catch((err) => {
      res.json(err);
    });
  console.log("PUT WORKOUT ");
});

router.get("/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .sort({ day: -1 })
    .limit(7)
    .then((dbWorkOut) => {
      res.json(dbWorkOut);
    })
    .catch((err) => {
      res.json(err);
    });
  console.log("GET WORKOUT RANGE WORKING");
});

module.exports = router;
