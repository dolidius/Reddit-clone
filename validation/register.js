const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegister(data) {
    let errors = {};

    data.login = !isEmpty(data.login) ? data.login : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    data.email = !isEmpty(data.email) ? data.email : '';

    // login
    if(!validator.isLength(data.login, { min: 4, max: 30 })){
        errors.login = "Login must be between 4 and 30 characters";
    }
    
    if(validator.isEmpty(data.login)){
        errors.login = "Login field is required";
    }

    // email
    if(!validator.isEmail(data.email)){
        errors.email = "Invalid email";
    }

    if(validator.isEmpty(data.email)){
        errors.email = "Email field is required";
    }

    // password
    if(data.password !== data.password2){
        errors.password2 = "Passwords must match";
    }

    if(!validator.isLength(data.password, { min: 4, max: 30 })){
        errors.password = "Password must be between 4 and 30 characters";
    }

    if(validator.isEmpty(data.password)){
        errors.password = "Password field is required";
    }

    if(validator.isEmpty(data.password2)){
        errors.password2 = "Password repeat field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
    
}