import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import user from "./models/user.js";

const { hash, compare } = bcryptjs;
const { sign } = jsonwebtoken;
const User = user;

//Should be in .env
const TOKEN_KEY = "xIkeHpIseP"
const MONGODB_CONNECT = "mongodb+srv://login-admin:MWsGB18epMER42ao@cluster0.9q6vz8r.mongodb.net/?retryWrites=true&w=majority"

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//Set up mongoose connection
var mongoDB = MONGODB_CONNECT;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(5000, () => {
	console.log("Server running on port 5000")
});

//Controllers

app.get("/register", async (req, res) => {
	res.sendStatus(404);
})

app.post("/register", async (req, res) => {
	try {
		const { name, email, password } = req.body.user;
		let previousUser = await User.findOne({ email: email })

		if (previousUser) {
			res.send({ message: "That email is already taken." })
		}
		else {
			let encryptedPassword = await hash(password, 10);
			let user = await User.create(
				{
					name: name,
					email: email,
					password: encryptedPassword
				})
			const token = sign(
				{ user_id: user._id, email },
				TOKEN_KEY,
			)
			user.token = token;
			user.save(err => {
				if (err) {
					res.send(err)
				}
				else {
					res.status(201).send();
				}
			})
		}
	}
	catch (err) {
		console.log(err)
	}
});

app.get("/login", async (res, req) => {
	res.sendStatus(404);
})

app.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body.user;
		const user = await User.findOne({ email });
		if (user === null) {
			res.send({ message: "No user found" })
		}
		else if (user && (await compare(password, user.password))) {
			const userToken = user.token;
			res.status(200).json({ userToken });
		}
		else if (!(await compare(password, user.password))) {
			res.send({ message: "Invalid credentials" })
		}
		else if (user === null) {
			res.send({ message: "Invalid credentials" })
		}
		else res.sendStatus(500);
	}
	catch (err) {
		console.log(err);
	}

})

app.get("/user/:token", async (req, res) => {
	try {
		const token = req.params.token;
		const user = await User.findOne({ token });
		if (user !== null) {
			const userName = user.name;
			const userEmail = user.email;
			res.json({ userName, userEmail })
		}
		else {
			res.send({ Message: "Token not valid." })
		}
	}
	catch (err) {
		console.log(err)
	}
});

app.post("/user", async (req, res) => {
	res.sendStatus(404)
})
