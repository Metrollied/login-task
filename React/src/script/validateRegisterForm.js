import passwordValidator from "password-validator";

var schema = new passwordValidator();

schema
.is().min(8)
.is().max(100)
.has().symbols(1)
.has().uppercase()
.has().lowercase()
.has().digits(1)
.has().not().spaces();


function validateRegisterForm (name, email, password) {
	let regexName = /^[a-zA-Z\s]+$/;
	let regexEmail = /^\S+@\S+\.\S+$/
	if (regexName.test(name) === false) {
		return "Please enter a valid name."
	}
	else if (regexEmail.test(email) === false) {
		return "Please enter a valid email."
	}
	else if (!(schema.validate(password))) {
		return "Password must be at least 8 characters using upper and lowercase letters, as well as one number and one symbol."
	}
	else return true
}

export default validateRegisterForm;