const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};
  console.log(data);
  
  data.school = !isEmpty(data.school) ? data.school: '';

  if(Validator.isEmpty(data.school)){
    errors.school = 'School is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
  
}