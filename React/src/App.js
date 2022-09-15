import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Login from './components/login';
import Landing from './components/landing';
import Register from './components/register';


function App() {
	
	return (
		<Router>
			<div className="App">
					<Routes id="container">
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/Register" element={<Register />} />
						<Route path="/landing" element={<Landing /> }/>
					</Routes>
			</div>
		</Router>
	);
}

export default App;
