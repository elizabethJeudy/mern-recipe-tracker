import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// register route, request gets data from user making request to endpoint;
// response sends data make to user making api request
router.post("/register", async (req, res) => {
	const { username, password } = req.body;
	// waits for username match
	const user = await UserModel.findOne({ username });
	if (user) {
		return res.json({ message: "User already exists!" });
	}

	// bcrypt for password security
	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = new UserModel({ username, password: hashedPassword });
	await newUser.save();
	res.json({ message: "Congrats, you've successfully created your account!" });
});

// login route
router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	const user = await UserModel.findOne({ username });
	if (!user) {
		return res.json({ message: "Username or password is incorrect!" });
	}
	// password matches one in database
	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return res.json({ message: "Username or password is incorrect!" });
	}

	// if correct; secret verifies authentication
	const token = jwt.sign({ id: user._id }, "secret");
	res.json({ token, userID: user._id });
});

export { router as userRouter };
