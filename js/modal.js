
/* DOM ELEMENTS
----------------------------------------------------------------------*/
const blockForm = document.querySelector(".frmSignUp");
const blockCongrats = document.querySelector(".b-congrats");
const btnSignUp1 = document.getElementById("signUp1");
const btnSignUp2 = document.getElementById("signUp2");
const icoClose = document.getElementById("close");
const btnClose = document.getElementById("closeCongrats");
const signForm = document.getElementById("reserve");
const fields = document.querySelectorAll("input");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const eMail = document.getElementById("eMail");
const birthDate = document.getElementById("birthDate");
const numGame = document.getElementById("numGame");
const location1 = document.getElementById("location1");
const locations = document.getElementsByName("location");
const condition = document.getElementById("checkbox1");

/* VARIABLES
----------------------------------------------------------------------*/
let fieldsValues = [];
let mailReg = new RegExp(/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i);
let isStrReg = new RegExp(/[0-9]/g);
let val_firstName = firstName.value;
let val_lastName = lastName.value;
let val_eMail = eMail.value;
let val_birthDate = birthDate.value;
let val_numGame = numGame.value;
let val_location = "";
let nbclick = 0;
let valid_bDate = true;
 
/* EVENTS CALLS
----------------------------------------------------------------------*/

btnSignUp1.addEventListener("click",launchForm);   // launch the formulary btn 1
btnSignUp2.addEventListener("click",launchForm);   // launch the formulary btn 2
icoClose.addEventListener("click", closeForm);    // Close the formulary without submit
btnClose.addEventListener("click", closeForm);    // Close the congrats window after submit

/**
 * For each input field
 * if the user fill each field manually //
 *  * fill the fieldValues table with
 *  - id
 *  - value
 * Linked with the validForm() function
 */
fields.forEach((field) => { 
  field.addEventListener("blur",() => {
    fieldsValues.push(new Array(field.id, field.value));
  });  
});
//console.log(fieldsValues);

/**
 * fill the "val_location" 
 * with the location radio button value clicked
 */
locations.forEach((location) => {
  location.addEventListener("click", () => {
    val_location = location.value;
  });
});

/**
 * change the attribute checked false
 * when the element is clicked
 */
condition.addEventListener("click", () => {
  nbclick ++;
  if ((nbclick % 2) == 1) {
    condition.setAttribute("checked","false");
  }
  else {    
    condition.setAttribute("checked","true");
  } 
  
});

/* Formulary submission*/
signForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if(validateForm()){    
    firstName.nextElementSibling.innerHTML = "";
    lastName.nextElementSibling.innerHTML = "";
    eMail.nextElementSibling.innerHTML = "";
    birthDate.nextElementSibling.innerHTML = "";
    numGame.nextElementSibling.innerHTML = "";

    blockForm.style.display = "none";
    blockCongrats.style.display = "block";
     // e.target.submit();

  } 
});
 

/* FUNCTIONS
----------------------------------------------------------------------*/
/**
 * Navigation function
 * Change the menu according to the device  => hamburger or not
 */ 
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
/** End navigation function --------------------------------------- */

/**
 * Open form function
 * modify the display style of the formulary to open it
 * add attribute to the condition checkbox => force checked to "true"
 * delete old values and old error message if user click on close's button
 */
function launchForm() {   
  blockForm.style.display = "block";
  condition.setAttribute("checked","true");
  signForm.reset();
  /**
   * fields.forEach((field) => { 
    if ((field.type != "radio") || (!field.type == "checkbox")) {
      field.value = "";
    }  
    firstName.nextElementSibling.innerHTML ="";
    lastName.nextElementSibling.innerHTML = "";
    eMail.nextElementSibling.innerHTML = "";
    birthDate.nextElementSibling.innerHTML = "";
    numGame.nextElementSibling.innerHTML = "";
    location1.previousElementSibling.innerHTML = "";
    condition.previousElementSibling.innerHTML = "";    
  });*/
}
/** End open form function --------------------------------------- */

/**
 * Closing function
 * modify the display style of the formulary to close it
 */
function closeForm() {
  blockForm.style.display = "none";  
  blockCongrats.style.display = "none";
  location.reload();
}
/** End closing form function --------------------------------------- */

/** 
 * validation function
 * verification about :
 *  - number of characters
 *  - valid email
 *  - valid birthDate
 *  - number of game < 99
 *  - required fields like location and user conditions check
 * 
 * local variable : valid => boolean
 * Step 1 : browse the fieldsValues table to fill the differents "val_" variables by checking the id ([n][0]) to get the value ([n][1])
 *          if the user have an automatic entry, fill the differents "val_" whith the field value.
 * Step 2 : special verification. If invalid => valid = false + special error message
 * Step 3 : return valid
 */ 
function validateForm() {

  let valid = true;
  let valReg_firstName, valReg_lastName;
  for(let i=0; i < fieldsValues.length; i++) {

    // Step 1 --------------------------------------------------
    // with the fieldValues table ------------------------------
    if (fieldsValues[i][0] == "firstName") {val_firstName = fieldsValues[i][1];}
    if (fieldsValues[i][0] == "lastName") {val_lastName = fieldsValues[i][1];}    
    if (fieldsValues[i][0] == "eMail") {val_eMail = fieldsValues[i][1];}
    if (fieldsValues[i][0] == "birthDate") {val_birthDate = fieldsValues[i][1];}
    if (fieldsValues[i][0] == "numGame") {val_numGame = fieldsValues[i][1];}
  }
  

  // with the field value ------------------------------
  if (val_firstName == "") { val_firstName = firstName.value;}
  if (val_lastName == "") { val_lastName = lastName.value;}
  if (val_eMail == "") { val_eMail = eMail.value;}
  if (val_birthDate == "") { val_birthDate = birthDate.value;}

  // check if there are numbers on first and last name ------------------------
  if (val_firstName.match(isStrReg) == null) { 
    valReg_firstName = 0;
  } else {valReg_firstName = val_firstName.match(isStrReg).length; }
  if (val_lastName.match(isStrReg) == null) { 
    valReg_lastName = 0;
  } else {valReg_lastName = val_lastName.match(isStrReg).length; }

  // check if birthdate is valid ---------------------------------------
  if(val_birthDate !="") {
    let splitBDate = val_birthDate.split("-");
    let yearNow = new Date();
    let maxAge = 65;
    if (parseInt(splitBDate[0]) >= yearNow.getFullYear()) { 
      valid_bDate = false;
    } else if (parseInt(splitBDate[0]) < (yearNow.getFullYear()- maxAge)) {
      valid_bDate = false;
    }
    else {
      valid_bDate = true;
    }
  }
  

  // Step 2 --------------------------------------------------

  if ((val_firstName.length < 2) || (valReg_firstName > 0 ))  {
    firstName.nextElementSibling.innerHTML = "Veuillez saisir au minimum 2 caractères / pas de chiffres.";
    firstName.className = "field--error";
    valid = false;
  } else {
    firstName.nextElementSibling.innerHTML = "";
    firstName.classList.remove("field--error");
  }

  if ((val_lastName.length < 2) || (valReg_lastName > 0 )) {
    lastName.nextElementSibling.innerHTML = "Veuillez saisir au minimum 2 caractères / pas de chiffres.";
    lastName.className = "field--error";
    valid = false;
  } else {
    lastName.nextElementSibling.innerHTML = "";
    lastName.classList.remove("field--error");
  }

  if ((val_eMail=="") || (!mailReg.test(val_eMail)))  {
    eMail.nextElementSibling.innerHTML = "Veuillez entrer une adresse email valide.";
    eMail.className = "field--error";
    valid = false;
  } else {
    eMail.nextElementSibling.innerHTML = "";
    eMail.classList.remove("field--error");
  }
  if ((val_birthDate=="") || (valid_bDate == false))  {
    birthDate.nextElementSibling.innerHTML = "Veuillez entrer une date de naissance / année invalide.";
    birthDate.className = "field--error";
    valid = false;
  } else {
    birthDate.nextElementSibling.innerHTML = "";
    birthDate.classList.remove("field--error");
  }

  if ((val_numGame.length > 0) && (val_numGame > 99 ))  {
    numGame.nextElementSibling.innerHTML = "Veuillez entrer un nombre entre 0 et 99.";    
    numGame.className = "field--error";
    valid = false;
  } else {
    numGame.nextElementSibling.innerHTML = "";
    numGame.classList.remove("field--error");
  }

  if (val_location == "")  {
    location1.previousElementSibling.innerHTML = "Veuillez sélectionner une ville.<br>";
    valid = false;
  }  else {
    location1.previousElementSibling.innerHTML = "";
  }  

  if (condition.getAttribute("checked")== "false")  {
    condition.previousElementSibling.innerHTML = "Veuillez accepter les conditions d'utilisation";
    valid = false;
  } else {
    condition.previousElementSibling.innerHTML = "";
  }  
  
  // Step 3 --------------------------------------------------  
  return valid;

}
/** End validation form function --------------------------------------- */

