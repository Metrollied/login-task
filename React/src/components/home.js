
import Footer from "./footer";
import Header from "./header";
import Loginicon from "../images/loginicon";
import Registericon from "../images/registericon";

function Home() {
	document.title = "Login App"
	return (
		<div id="home">
			<Header />
			<h1>Welcome to Login App</h1>
			<div id="homeContainer">
				<a className="homeLink" href="/login">
					<Loginicon className="icon" />
					<p>Login</p>
				</a>
				<a className="homeLink" href="/register">
					<Registericon className="icon" />
					<p>Register</p>
				</a>
			</div>
			<Footer />
		</div>
	)
}

export default Home;