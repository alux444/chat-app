const validate = (req, res, next) => {
  const formData = req.body;
  const errors = {};

  // Validate username
  if (!formData.username) {
    errors.username = "Username required";
  } else if (formData.username.length < 6) {
    errors.username = "Username too short";
  } else if (formData.username.length > 20) {
    errors.username = "Username too long!";
  }

  // Validate password
  if (!formData.password) {
    errors.password = "Password required";
  } else if (formData.password.length < 6) {
    errors.password = "Password too short";
  } else if (formData.password.length > 30) {
    errors.password = "Password too long!";
  }

  if (Object.keys(errors).length > 0) {
    res.status(422).send(errors);
    console.log(errors);
  } else {
    console.log("Form is valid");
    next();
    // Continue with further processing if the form is valid
  }
};

export default validate;
