const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};
  let currentDate = new Date();
  
  data.school = !isEmpty(data.school) ? data.school: '';
  data.degree = !isEmpty(data.degree) ? data.degree: '';
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy: '';
  data.from = !isEmpty(data.from) ? data.from: '';

  if(Validator.isEmpty(data.school)){
    errors.school = 'School is required';
  }
  if(Validator.isEmpty(data.degree)){
    errors.degree = 'Degree is required';
  }
  if(Validator.isEmpty(data.fieldOfStudy)){
    errors.fieldOfStudy = "Field study is required";
  }
  if(Validator.isEmpty(data.from)){
    errors.from = "Starting data is required"
  }
  if(!data.current){
    if(data.from > data.to || data.from === data.to){
      errors.from = "Starting date must be before ending date"
    }
  }
  if(!data.from > currentDate){
    errors.from = "Starting date must be before current date"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }

}