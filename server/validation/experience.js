const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};
  let currentDate = new Date();
  
  data.title = !isEmpty(data.title) ? data.title: '';
  data.company = !isEmpty(data.company) ? data.company: '';
  data.from = !isEmpty(data.from) ? data.from: '';

  if(Validator.isEmpty(data.title)){
    errors.title = 'Title is required';
  }
  if(Validator.isEmpty(data.company)){
    errors.company = 'Company is required';
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