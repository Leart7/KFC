
let numri = 1;


let number = document.getElementsByClassName("number");

let plus = document.getElementsByClassName("plus");

let minusContent = document.getElementsByClassName("minuscontent");

let numbers = new Array(plus.length);


for(let i=0; i<plus.length; i++){
  numbers[i] = 1;
  plus[i].onclick = function(){
    for(let j=0; j<number.length; j++){
      if(numbers[i] <= 0){
        minusContent[i].style.color = "#6c757d";
      }else{
        minusContent[i].style.color = "#d9534f";
      }
      
      numbers[i]++;
      number[i].value = numbers[i];
      break;
    }    
  }
}

let minus = document.getElementsByClassName("minus");
for(let i=0; i<minus.length; i++){
  numbers[i] = 1;
  minus[i].onclick = function(){
    for(let j=0; j<number.length; j++){
    if(numbers[i] == 1){
      minusContent[i].style.color = "#6c757d";
      numbers[i] = numbers[i];
    }else{
      minusContent[i].style.color = "#d9534f";
      numbers[i]--;
      number[i].value = numbers[i];
      break;
    }
  }
  }
}

vleraSasise = document.getElementById("vlerasasise").value;
orderDiv = document.getElementById("order");
foto = document.getElementById("foto");
emptyorder = document.getElementById("emptyorder");
totalPrice = document.getElementById("totalcheckout").value;
checkoutBtn = document.getElementById("checkout");


if(vleraSasise > 0){
  orderDiv.style.display = "block";
  foto.style.display = "none";
  emptyorder.style.display = "none";
  if(totalPrice < 5){
    checkoutBtn.style.visibility = "hidden";
  }else{
    checkoutBtn.style.display = "visible";
  }
}else{
  orderDiv.style.display = "none";
  emptyorder.style.display = "block";
  foto.style.display = "block";
}


let numbertwo = document.getElementsByClassName("numbertwo");
let plustwo = document.getElementsByClassName("plustwo");
let minustwo = document.getElementsByClassName("minustwo");
let minusContenttwo = document.getElementsByClassName("minuscontenttwo");
let numberstwo = new Array(plustwo.length);

for(let i=0; i<plustwo.length; i++){
  numberstwo[i] = numbertwo[i].value;
  plustwo[i].onclick = function(){
    for(let j=0; j<numbertwo.length; j++){
      if(numberstwo[i] == 1){
        minusContenttwo[i].style.color = "#6c757d";
      }else{
        minusContenttwo[i].style.color = "#d9534f";
      }
      numberstwo[i]++;
      numbertwo[i].value = numberstwo[i];
      break;
    }    
  }
}

for(let i=0; i<minustwo.length; i++){
  numberstwo[i] = numbertwo[i].value;
  minustwo[i].onclick = function(){
    for(let j=0; j<numbertwo.length; j++){
    if(numberstwo[i] == 1){
      minusContenttwo[i].style.color = "#6c757d";
      numberstwo[i] = numberstwo[i];
    }else{
      minusContenttwo[i].style.color = "#d9534f";
      numberstwo[i]--;
      numbertwo[i].value = numberstwo[i];
      break;
    }
  }
  }
}

let testi = document.getElementById("testi");

testi.style.backgroundColor = "red";

