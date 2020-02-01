const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Input error message

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error"; //we need to overwrite the full class list rather than just add error class
  const small = formControl.querySelector("small");
  small.innerText = message;
}
// Input success

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success"; //again need to overwrite in case ot already has error class
}
// Check if email is valid

function checkEmail(input) {
  const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regexEmail.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

// CHeck if passwords match

function checkPasswordsMatch(input0, input1) {
  if (input0.value !== input1.value) {
    showError(input1, "Passwords do not match");
  }
}

// Check required fields(takes array of fields you want to be required for field to be processed)

function checkRequired(inputArray) {
  inputArray.forEach(function(input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// check if user input is of appropriate length

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be at most ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Generating custom error messages for each field instead of just printing a default message
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// EVENT LISTENERS

form.addEventListener("submit", function(e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});

// TODO: Radio buttons, checkboxes, textarea, and other types of input
