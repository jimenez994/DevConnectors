const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.profecionalStatus = !isEmpty(data.profecionalStatus) ? data.profecionalStatus: '';
  errors.skills = !isEmpty(data.skills) ? data.skills: '';

  if(!Validator.isLength(data.username, { min: 6, max: 30 })){
    errors.username = "Username must be between 6 and 30 characters"
  }

  if(Validator.isEmpty(data.username)){
    errors.username = "Username is required"
  }

  if(Validator.isEmpty(data.profecionalStatus)){
    errors.profecionalStatus = "Status is required"
  }

  if(Validator.isEmpty(data.skills)){
    errors.skills = "Skills is required"
  }

  if(!Validator.isEmpty(data.social.youtube)){
    if(!Validator.isURL(data.social.youtube)){
      errors.social.youtube = "Not a valid URL"
    }
  }
  if(!Validator.isEmpty(data.social.twitter)){
    if(!Validator.isURL(data.social.twitter)){
      errors.social.twitter = "Not a valid URL"
    }
  }
  if(!Validator.isEmpty(data.social.facebook)){
    if(!Validator.isURL(data.social.facebook)){
      errors.social.facebook = "Not a valid URL"
    }
  }
  if(!Validator.isEmpty(data.social.linkein)){
    if(!Validator.isURL(data.social.linkein)){
      errors.social.linkein = "Not a valid URL"
    }
  }
  if(!Validator.isEmpty(data.social.instagram)){
    if(!Validator.isURL(data.social.instagram)){
      errors.social.instagram = "Not a valid URL"
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}