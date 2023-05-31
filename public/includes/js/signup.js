const email1 = document.getElementById("emails");
const password1 = document.getElementById("passwords");
const name = document.getElementById("names");
const checkbox = document.getElementById("check1");

const setError = (element,message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = element => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateName(){
  let nameValue = document.getElementById("names").value;
  if(nameValue.trim()  === ""){
    setError(name, "Name is required");
    return false;
  }else if(nameValue.length < 3){
    setError(name, "Name must be at least 3 characters");
    return false;
  }else if(!nameValue.match(/^[A-Za-z]+$/)){
    setError(name, "Name should contain only letters");
    return false;
  }
  else{
    setSuccess(name);
    return true;
  }
}

function validateEmail2(){
  let email1Value = document.getElementById("emails").value;
  if(email1Value.trim() === ""){
    setError(email1, "Email is required");
    return false;
  }else if(!isValidEmail(email1Value)){
    setError(email1, "Provide a valid email address");
    return false;
  }else{
    setSuccess(email1);
    return true;
  }
}

function validatePassword2(){
  let password1Value = document.getElementById("passwords").value;
  if(password1Value.trim() === ""){
    setError(password1, "Password is required");
    return false;
  }else if(password1Value.length < 6){
    setError(password1, "Password must be at least 6 characters");
    return false;
  }else{
    setSuccess(password1);
    return true;
  }
}

function validateCheckBox(){
  if(!checkbox.checked){
    setError(checkbox, "Please agree to our terms & conditions if you want to continue");
    return false;
  }else{
    setSuccess(checkbox);
    return true;
  }
}

function validateInputs2 (){
  if(!validateName() || !validateEmail2() || !validatePassword2() || !validateCheckBox()){
    return false;
  }else{
    return true;
  }
}

