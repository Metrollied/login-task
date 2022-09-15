import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Message from "./message";
import { useDispatch } from "react-redux";
import { change, remove } from "../redux/messageSlice";
import Header from "./header";
import Footer from "./footer";
import validateRegisterForm from "../script/validateRegisterForm";
import Cookies from "universal-cookie";


function Register() {
	document.title = "Register";
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: ""
	});


	const handleChange = e => {
		const { name, value } = e.target;
		setUser({
			...user,
			[name]: value
		})
	}


	const register = async (event) => {
		event.preventDefault();
		const { name, email, password } = user;

		if (name && email && password) {
			let validation = validateRegisterForm(name, email, password);
			if (validation !== true) {
				dispatch(remove())
				dispatch(change(validation))
			}
			else {
				axios.post("http://localhost:5000/register", { user })
					.then(res => {
						if (res.data.message === "That email is already taken.") {
							dispatch(change("Whoops! That email is already taken. Try logging in instead."))
						}
						else if (res.status === 201) {
							const cookies = new Cookies();
							cookies.remove("token");
							dispatch(change("Account created! Please enter your email and password to log in."))
							navigate("/login")
						}
					})
			}
		}
		else {
			dispatch(change("Please enter a name, email, and password."))
		}
	}

	return (
		<div id="register">
			<Header />
			<form id="registerForm" onSubmit={register}>
				<div className="formGroup">
					<label htmlFor="name">Your Name:</label>
					<input type="text" id="name" name="name" placeholder="Name" value={user.name} onChange={handleChange} />
				</div>
				<div className="formGroup">
					<label htmlFor="email">Email:</label>
					<input type="email" id="email" name="email" placeholder="Email@address.com" value={user.email} onChange={handleChange} />
				</div>
				<div className="formGroup">
					<label htmlFor="password">Password:</label>
					<input type="password" id="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
				</div>
				<Message />
				<input className="submitButton" type="submit" value="Submit" />
			</form>

			<Footer />
		</div>
	)
}

export default Register;