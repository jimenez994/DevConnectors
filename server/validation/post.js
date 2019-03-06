const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text: '';

  if(Validator.isEmpty(data.text)){
    errors.text = "Post cannot be empty"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}