import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";

// generates api
const app = express();

// middleware
app.use(express.json()); // converts frontend data to json
app.use(cors()); // helps with frontend errors

app.use("/auth", userRouter);

mongoose.connect(
	"mongodb+srv://lizzy:wVkBElAoPdsMcu1k@recipes.yinr1jx.mongodb.net/recipes?retryWrites=true&w=majority"
); // generates connection to server

app.listen(3001, () => console.log("Server started")); // tells api to start
