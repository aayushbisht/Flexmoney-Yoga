require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payment");
const authMiddleware = require("./routes/authMiddleware"); 
const fetchData = require("./routes/fetchData"); 

connection();

app.use(express.json());
app.use(cors());

// routes
app.use("/api/payment", authMiddleware,paymentRoutes); 
app.use("/api/users",userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/fetch",authMiddleware, fetchData);



const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
