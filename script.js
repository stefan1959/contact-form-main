const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const message = document.getElementById("message");
const submitButton = document.getElementById("submit");
const consent = document.getElementById("consent");
const messageSent = document.getElementById("message-sent");
const radioButtons = document.querySelectorAll('input[name="query"]');
const checkboxError = document.getElementById("checkbox-error");
const consentError = document.getElementById("consent-error");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  checkInput(firstName);
  checkInput(lastName);
  checkInput(message);
  checkInput(consent);
  checkInput(email);
  if (email.value) {
    valid(email.value) ? removeEmailError(email) : displayEmailError(email);
  }

  let buttonStatus = checkRadioButtons();
  if (!buttonStatus) {
    checkboxError.style.visibility = "visible";
  } else if (buttonStatus) {
    checkboxError.style.visibility = "hidden";
  }
  if (checkErrorVisible()) {
    messageSent.style.visibility = "visible";
    messageSent.style.opacity = "1";
  } else {
    messageSent.style.visibility = "hidden";
  }
});

function checkInput(ele) {
  if (
    (ele.type !== "checkbox" && !ele.value) ||
    (ele.type == "checkbox" && !ele.checked)
  ) {
    displayError(ele);
  } else {
    removeError(ele);
  }
}

function displayError(ele) {
  let z = null;
  console.log(ele);
  z = ele.parentNode.children;
  if (ele.type == "checkbox") {
    z = ele.parentNode.parentNode.children;
  }

  for (let i of z) {
    if (i.classList.contains("input-error")) {
      i.style.visibility = "visible";
    }
  }
}
function removeError(ele) {
  let z = null;

  z = ele.parentNode.children;
  if (ele.type == "checkbox") {
    z = ele.parentNode.parentNode.children;
  }

  for (let i of z) {
    if (i.classList.contains("input-error")) {
      i.style.visibility = "hidden";
    }
  }
}

function displayEmailError(ele) {
  let z = ele.parentNode.children;
  for (let i of z) {
    if (i.classList.contains("input-error")) {
      i.style.visibility = "visible";
      i.innerHTML = "Please enter a valid email address";
    }
  }
}
function removeEmailError(ele) {
  let z = ele.parentNode.children;
  for (let i of z) {
    if (i.classList.contains("input-error")) {
      i.style.visibility = "hidden";
      i.innerHTML = "This field is required";
    }
  }
}

function checkRadioButtons() {
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      return true;
    }
  }
  return false;
}

function valid(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function checkErrorVisible() {
  let matches = document.querySelectorAll(".input-error");
  for (let i of matches) {
    if (i.style.visibility == "visible") {
      return false;
    }
  }
  return true;
}
