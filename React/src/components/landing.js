import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Message from "./message";
import { useDispatch } from "react-redux";
import { change } from "../redux/messageSlice";
import Header from "./header";
import Footer from "./footer";



function Landing() {
	document.title = "User Details";
	const cookies = new Cookies();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [user, setUser] = useState({
		name: "",
		email: ""
	})
	const logout = () => {
		cookies.remove("token");
		dispatch(change("Logged out."))
		navigate("/login")
	}

	useEffect(() => {
		const cookies = new Cookies();
		if (!(cookies.get("token"))) {
			dispatch(change("You are not logged in."))
			navigate("/login")
		}
		else {
			let token = cookies.get("token");
			axios.get("http://localhost:5000/user/" + token
			)
				.then(res => {
					if (res.data.userName) {
						const name = res.data.userName;
						const email = res.data.userEmail;
						setUser({
							name: name,
							email: email
						})
					}
					else {
						dispatch(change("You have been logged out."))
						cookies.remove("token");
						navigate("/login")
					}

				})
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div id="landing">
			<Header />
			<div id="landingContainer">
				<h2>Your Name: {user.name}</h2>
				<h2>Your Email: {user.email}</h2>
				<Message />
				<button className="logoutButton" onClick={logout}>Logout</button>
			</div>
			<Footer />
		</div>
	)
}

export default Landing;