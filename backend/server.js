const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/User");
const dotenv = require("dotenv");
dotenv.config();
const DATABASE_URL = process.env.DB_URL;
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8000;
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb" + err));
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res
        .status(400)
        .json({ message: "Email address is not connected to an account" });
    } else {
      if (foundUser.password !== password) {
        return res.status(400).json({ message: "Invalid credentials" });
      } else {
        return res
          .status(200)
          .json({ message: "login successful", user: foundUser });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, upiId, phone } = req.body;
    const newuser = new User({
      name,
      email,
      password,
      upiId,
      phone,
      posts: [],
      picturePath: "",
    });
    await newuser.save();
    return res.status(200).json({ message: "Registration sucessful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
