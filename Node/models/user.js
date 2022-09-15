import mongoose from "mongoose";

var Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	token: String
})

export default mongoose.model("user", userSchema);