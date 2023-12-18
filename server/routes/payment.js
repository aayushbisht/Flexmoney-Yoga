const router = require("express").Router();
const { User } = require("../models/user");

router.post("/", async (req, res) => {
    try {
      console.log("jello");
      const userId = req.user._id;
  
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: { selectedSlot: req.body.selectedSlot } },
        { new: true }
      );  
  
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }  
      res.status(200).send({ message: "Payment successful", user });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  module.exports = router;

