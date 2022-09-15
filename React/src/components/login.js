import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { change, remove } from "../redux/messageSlice";
import Message from "./message";
import Header from "./header";
import Footer from "./footer";
import validateLoginForm from "../script/validateLoginForm";

function Login() {
	document.title = "Login"
	const cookies = new Cookies();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [user, setUser] = useState({
		email: "",
		password: ""
	});

	useEffect(() => {
		if (cookies.get("token")) {
			dispatch(change("You are logged in."))
			navigate("/landing")
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleChange = e => {
		const { name, value } = e.target;
		setUser({
			...user,
			[name]: value
		})
	}

	const login = event => {
		event.preventDefault();
		const { email, password } = user;
		if (email && password) {
			let validation = validateLoginForm(email);
			if (validation !== true) {
				dispatch(change(validation))
			}
			else {
				axios.post("http://localhost:5000/login", { user })
					.then(res => {
					if (res.data.message === "Invalid credentials") {
							dispatch(change("Email and password do not match."))
						}
						else if (res.data.message === "No user found") {
							dispatch(change("No user found."))
						}
						else {
							dispatch(remove())
							const cookies = new Cookies();
							cookies.set("token", res.data.userToken)
							navigate("/landing")
						}
					})
			}
		}
		else {
			alert("Invalid input")
		}
	}

	return (
		<div id="login">
			<Header />
			<form id="loginForm" onSubmit={login}>
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

export default Login;