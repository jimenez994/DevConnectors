const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {
    social: {}
  };

  data.username = !isEmpty(data.username) ? data.username : '';
  data.professionalStatus = !isEmpty(data.professionalStatus) ? data.professionalStatus: '';
  errors.skills = !isEmpty(data.skills) ? data.skills: '';

  if(!Validator.isLength(data.username, { min: 6, max: 30 })){
    errors.username = "Username must be between 6 and 30 characters"
  }

  if(Validator.isEmpty(data.username)){
    errors.username = "Username is require"
  }

  if(Validator.isEmpty(data.professionalStatus)){
    errors.professionalStatus = "Status is require"
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
  if(!Validator.isEmpty(data.social.linkedin)){
    if(!Validator.isURL(data.social.linkedin)){
      errors.social.linkedin = "Not a valid URL"
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