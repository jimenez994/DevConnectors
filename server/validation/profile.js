const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.professionalStatus = !isEmpty(data.professionalStatus) ? data.professionalStatus: '';
  data.skills = !isEmpty(data.skills) ? data.skills: '';

  if(!Validator.isLength(data.username, { min: 6, max: 30 })){
    errors.username = "Username must be between 6 and 30 characters"
  }

  if(Validator.isEmpty(data.username)){
    errors.username = "Username is require"
  }

  if(Validator.isEmpty(data.professionalStatus)){
    errors.professionalStatus = "Status is require"
  }
  if(!isEmpty(data.website)){
    if(!Validator.isURL(data.website)){
      errors.website = "Not a valid URL"
    }
  }
  if(isEmpty(data.skills)){
    errors.skills = "Skills is required"
  }

  if(!isEmpty(data.social.youtube)){
    if(!Validator.isURL(data.social.youtube)){
      errors.youtube = "Not a valid URL"
    }
  }
  if(!isEmpty(data.social.twitter)){
    if(!Validator.isURL(data.social.twitter)){
      errors.twitter = "Not a valid URL"
    }
  }
  if(!isEmpty(data.social.facebook)){
    if(!Validator.isURL(data.social.facebook)){
      errors.facebook = "Not a valid URL"
    }
  }
  if(!isEmpty(data.social.linkedin)){
    if(!Validator.isURL(data.social.linkedin)){
      errors.linkedin = "Not a valid URL"
    }
  }
  if(!isEmpty(data.social.instagram)){
    if(!Validator.isURL(data.social.instagram)){
      errors.instagram = "Not a valid URL"
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}