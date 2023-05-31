const email1 = document.getElementById("exampleInputEmail1");
const name = document.getElementById("name");



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

function validateInputs1 (){
  if(!validateEmail1() || !validateName()){
    return false;
  }else{
    return true;
  }
}

