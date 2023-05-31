const email1 = document.getElementById("exampleInputEmail1");
const name = document.getElementById("name");
const lastname = document.getElementById("lastname");
const phone = document.getElementById("phone");
const address = document.getElementById("address");





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

function validateEmail1(){
  let email1Value = document.getElementById("exampleInputEmail1").value;
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

function validateName(){
  let nameValue = document.getElementById("name").value;
  if(nameValue.trim() === ""){
    setError(name, "Name is required");
    return false;
  }else if(nameValue.length < 3){
    setError(name, "Name must be at least 3 characters");
    return false;
  }else{
    setSuccess(name);
    return true;
  }
}

function validateLastName(){
  let lastNameValue = document.getElementById("lastname").value;
  if(lastNameValue.trim() === ""){
    setError(lastname, "Last name is required");
    return false;
  }else if(lastNameValue.length < 3){
    setError(lastname, "Last name must be at least 3 characters");
    return false;
  }else{
    setSuccess(lastname);
    return true;
  }
}

function validatePhone(){
  let phoneValue = document.getElementById("phone").value;
  if(phoneValue.trim() === ""){
    setError(phone, "Phone number is required");
    return false;
  }else if(!phoneValue.match(/^[0-9]+$/)){
    setError(phone, "Phone should only contain numbers");
    return false;
  }
  else if(phoneValue.length <= 8){
    setError(phone, "Phone should have at least 9 numbers");
    return false;
  }
  else{
    setSuccess(phone);
    return true;
  }
}

function validateAddress(){
  let addressValue = document.getElementById("address").value;
  if(addressValue.trim() === ""){
    setError(address, "Address is required");
    return false;
  }else{
    setSuccess(address);
    return true;
  }
}


function validateInputs1 (){
  if(!validateEmail1() || !validateName() || !validateLastName() || !validatePhone() || !validateAddress()){
    return false;
  }else{
    return true;
  }
}

