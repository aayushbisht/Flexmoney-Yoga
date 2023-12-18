const router = require("express").Router();
const { User } = require("../models/user");

router.post("/pay", async (req, res) => {
  try {
    // Simulate storing the selected timeslot for the user
    // Replace this with your actual logic to store the timeslot
    const userId = req.user._id; // Assuming you use authentication middleware to attach the user to the request
    const selectedTimeslot = req.body.selectedTimeslot;

    // Update the user document with the selected timeslot
    await User.findByIdAndUpdate(userId, { selectedTimeslot });

    res.status(200).send({ message: "Payment successful" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
