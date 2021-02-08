
/* DOM Elements
----------------------------------------------------------------------*/
const blockForm = document.querySelector(".frmSignUp");
const btnSignUp = document.getElementById("signUp");
const icoClose = document.getElementById("close");
const signForm = document.getElementById("reserve");
const fields = document.querySelectorAll("input");

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let eMail = document.getElementById("eMail");
let numGame = document.getElementById("numGame");
let coche_condition = document.getElementById("checkbox1");

let val_firstName = firstName.value;
let val_lastName = lastName.value;
let val_eMail = eMail.value;
let val_numGame = numGame.value;

/* Variables
----------------------------------------------------------------------*/
let fieldsValues = [];
let mailReg = new RegExp(/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i);

/* EventListner
----------------------------------------------------------------------*/

btnSignUp.addEventListener("click",launchForm);                    // launch the formulary
icoClose.addEventListener("click", closeForm);                    // Close the formulary without submit

fields.forEach((field) => {
  field.addEventListener("blur",()=> {
    let val_field = field.value;
    if (((field.id == "firstName") || (field.id == "lastName")) && (val_field.length < 2)) {
      field.nextElementSibling.innerHTML = "Veuillez saisir au minimum 2 caractères.";
      field.nextElementSibling.setAttribute("data-error-visible",true);
    }
    if ((field.id == "eMail") && (!mailReg.test(val_field)))  {
      field.nextElementSibling.innerHTML = "Veuillez entrer une adresse email valide.";
      field.nextElementSibling.setAttribute("data-error-visible",true);
    }            
    if ((field.id == "numGame") && (val_field > 99 ))  {
      field.nextElementSibling.innerHTML = "Veuillez entrer un nombre entre 0 et 99.";
      field.nextElementSibling.setAttribute("data-error-visible",true);
    }          

    fieldsValues.push(new Array(field.name, field.value));
  });
});

console.log(coche_condition);
/*
coche_condition.addEventListener("click", verifCond);
function verifCond(){
  if (coche_condition.getAttribute("checked"))
}
*/
/* Formulary submission*/
signForm.addEventListener("submit", (e) => {
  let valid = true;
  e.preventDefault();
  
  if(validateForm()){    
    firstName.nextElementSibling.innerHTML = "";
    lastName.nextElementSibling.innerHTML = "";
    eMail.nextElementSibling.innerHTML = "";
    numGame.nextElementSibling.innerHTML = "";
    console.log("on envoie ! tutti va bene");
     // e.target.submit();
  } 
});

  
/* Functions
----------------------------------------------------------------------*/

// Change the menu according to the device ( hamburger )
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Make the formulary block visible
function launchForm() {   
  blockForm.style.display = "block";
  coche_condition.setAttribute("checked",true);
}


// Make the formulary block not visible
function closeForm() {
  blockForm.style.display = "none";
}



// Validate all fields, with a special error message
function validateForm() {
  let valid = true;
  for(let i=0; i < fieldsValues.length; i++) {
    switch (fieldsValues[i][0]) {
      case "firstName": val_firstName = fieldsValues[i][1];
      case "lastName": val_lastName = fieldsValues[i][1];
      case "eMail": val_eMail = fieldsValues[i][1];
      case "numGame": val_numGame = fieldsValues[i][1];
    }
  }
  
  if (val_firstName.length < 2) {
    firstName.nextElementSibling.innerHTML = "Veuillez saisir au minimum 2 caractères.";
    //fName.nextElementSibling.setAttribute("data-error-visible",true);
    valid = false;
  } 
  if (val_lastName.length < 2) {
    lastName.nextElementSibling.innerHTML = "Veuillez saisir au minimum 2 caractères.";
    valid = false;
  } 
  if ((val_eMail.length == 0) || (!mailReg.test(val_eMail)))  {
    eMail.nextElementSibling.innerHTML = "Veuillez entrer une adresse email valide.";
    valid = false;
  }
  if ((val_numGame.length > 0) && (val_numGame > 99 ))  {
    numGame.nextElementSibling.innerHTML = "Veuillez entrer un nombre entre 0 et 99.";
    valid = false;
  } 
  if (coche_condition.getAttribute("checked")== "false")  {
    coche_condition.setAttribute("checked", true);
  }


  console.log(coche_condition);
  return valid;
}