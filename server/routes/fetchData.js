const router = require("express").Router();
const { User } = require("../models/user");

router.get("/", async (req, res) => {
	try {
		console.log("lmao");
	  // Extract user ID from the authenticated request
	  const userId = req.user._id;
  
	  // Fetch user information including the selected slot
	  const user = await User.findById(userId);
      console.log(user);
  
	  if (!user) {
		return res.status(404).send({ message: "User not found" });
	  }
  
	  res.status(200).send(user);
	} catch (error) {
	  console.error(error);
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });

  module.exports = router;
