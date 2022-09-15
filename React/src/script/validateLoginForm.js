function validateLoginForm (email) {
	let regexEmail = /^\S+@\S+\.\S+$/
	if (regexEmail.test(email) === false) {
		return "Please enter a valid email."
	}
	else return true
}

export default validateLoginForm;