const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLogin(data) {
    let errors = {};

    data.login = !isEmpty(data.login) ? data.login : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // login
    if(!validator.isLength(data.login, { min: 4, max: 30 })){
        errors.login = "Login must be between 4 and 30 characters";
    }

    if(validator.isEmpty(data.login)){
        errors.login = "Login field is required";
    }
    

    //password
    if(validator.isEmpty(data.password)){
        errors.password = "Password field is required";
    }
    
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
    
}