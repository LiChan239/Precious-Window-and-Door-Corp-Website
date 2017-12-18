/*
      Project: Create a website for Precious Window & Door Dorp.
      
      This is the JavaScript for request form on Precious Window & Door Corp. Website 

      Author: Li
      Date:   12/13/2017

      Filename: script.js
 */
 
 "use strict";
 
 /* global variables */
 // create a new object from the Date class
var dateObject = new Date(); 
 // set a flag for valid form
var formValidity = true;
  
 /* Validate the customer name, phone number and email address*/
  function validateUserInfo() {
	var warningDiv = document.getElementById("errorMessage");
	var userElement = document.getElementById("user");
	var phoneElement = document.getElementById("phone");
	var emailElement = document.getElementById("email");
	var phoneNumFormat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
	var emailFormat = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;
		
	try {
		// reset styles to valid state and clear error message
		userElement.style.background = "";
		phoneElement.style.background = "";
		emailElement.style.background = "";
		warningDiv.style.display = "none";
		
		// require customer name, valid phone number and valid email address
		if (userElement.value === ""){
			throw "Please enter your name.";
			} else if (/.{2,}/.test(userElement.value) === false){
				throw "Your name must be at least 2 characters long";
				} else if (phoneElement.value === ""){
					throw "Please enter your phone number.";
					} else if (phoneNumFormat.test(phoneElement.value) === false) {
							throw "Please provide a valid phone number" 
							} else if (emailElement.value === "") {
								throw "Please enter your email.";
								} else if (emailFormat.test(emailElement.value) === false) {
								throw "Please provide a valid email address";
								}	
	}
	
	// display error message
	catch(msg) {
		warningDiv.innerHTML = msg;
		warningDiv.style.display = "block";
		warningDiv.style.color = "red";
		if ((userElement.value === "") || (/.{2,}/.test(userElement.value) === false)){
			userElement.style.background = "#d9ff66";
			} else if ((phoneElement.value === "") || (phoneNumFormat.test(phoneElement.value) === false)){
				phoneElement.style.background = "#d9ff66";
			} else if ((emailElement.value === "") || (emailFormat.test(emailElement.value) === false)){
				emailElement.style.background = "#d9ff66";
			}
		formValidity = false;
	}
} 

/* validate subscription checkbox - if customer checks for subscription, they must provide valid email address */
function validateEmailDeals () {
	var warningDiv = document.getElementById("errorMessage");
	var emailElement = document.getElementById("email");
	var emailBox = document.getElementById("remember")
			
	try {		
		if (emailBox.checked && emailElement.value === ""){
			// email deals checkbox is checked, email address must be provided.
			throw "Please enter your email for your subscription";
		} else {
			warningDiv.style.display = "none";
			emailElement.style.background = "white";
		}
		// validate the email address provided
		validateUserInfo();
	}
	
	// display error message
	catch(msg) {
		warningDiv.innerHTML = msg;
		warningDiv.style.display = "block";
		warningDiv.style.color = "red";
		emailElement.style.background = "#d9ff66";
		formValidity = false;
	}
}

/* Get the current date, generate the calendar and populate the dates on the day cells in the calendar table */
function displayCalendar(whichMonth) {
	var date;
	var dateToday = new Date();
	var dayOfWeek;
	var daysInMonth;
	var dateCells;
	var captionValue;
	var month;
	var year;
	var monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	
	if (whichMonth === -1) {
		dateObject.setMonth(dateObject.getMonth() - 1);
	} else if (whichMonth === 1) {
		dateObject.setMonth(dateObject.getMonth() + 1);
	} 
	
	// Get the current month
	month = dateObject.getMonth();
	year = dateObject.getFullYear();
	dateObject.setDate(1);
	dayOfWeek = dateObject.getDay();
	captionValue = monthArray[month] + " " + year;
	document.querySelector("#cal table caption").innerHTML = captionValue;
	
	// Determine correct dates for the particular month
	if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
		daysInMonth = 31;
	} else if (month === 1) {
		if (year % 4 === 0) { // test the leap year
			if (year % 100 === 0) {
				// test the leap year ending in 00 and being divisible by 400
				if (year % 400 === 0) {
					daysInMonth = 29;
				} else {
					daysInMonth = 28;
				}
			} else {
				daysInMonth = 29;
			}
		} else {
			daysInMonth = 28;
		}
	} else {
		// set 30 days for Apr, Jun, Sep, Nov
		daysInMonth = 30; 
	}
	
	dateCells = document.getElementsByTagName("td");
	for (var i = 0; i < dateCells.length; i++) {
		// clear the existing table dates
		dateCells[i].innerHTML = "";
		dateCells[i].className = "";
	}
	
	for (var i = dayOfWeek; i < daysInMonth + dayOfWeek; i++){
		// add dates to the day cells in the calendar table
		dateCells[i].innerHTML = dateObject.getDate();
		dateCells[i].className = "date";
		if (dateToday < dateObject) {
			dateCells[i].className = "futuredate";
		}
		date = dateObject.getDate() + 1;
		dateObject.setDate(date);
	}
	// reset month to month shown
	dateObject.setMonth(dateObject.getMonth() -1);
	
	// display calendar if it's not alreday shown
	document.getElementById("cal").style.display = "block";
}

/* Validate the date for appointment */
function selectDate(event) {
	if (event === undefined) { 
		event = window.event; // for older browsers
	}
	var callerElement = event.target || event.srcElement;
	if (callerElement.innerHTML === "") {
		// if date is not selected, keep the pop-up calendar open 
		document.getElementById("cal").style.display = "block";
		return false;
	}
	dateObject.setDate(callerElement.innerHTML);
	var fullDateToday = new Date();
	var dateToday = Date.UTC(fullDateToday.getFullYear(), fullDateToday.getMonth(), fullDateToday.getDate());
	var selectedDate = Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());
	
	if (selectedDate <= dateToday) {
		document.getElementById("cal").style.display = "block";
		return false;
	}
	// if date is selected, close the pop-up calendar
	document.getElementById("apptDate").value = dateObject.toLocaleDateString();
	hideCalendar ();
}	

/* Close the pop-up calendar */
function hideCalendar() {
	document.getElementById("cal").style.display = "none";
}
	
/* Display last month */	
function prevMo() {
	displayCalendar(-1);
}

/* Display next month */
function nextMo() {
	displayCalendar(1);
}

/* Validate form data */
function validateForm(evt) {
	if (evt.preventDefault){
		evt.preventDefault(); // prevent form from submitting
	} else {
		evt.returnValue = false; // prevent form from submitting in IE8 or older
	}
	formValidity = true; // reset form data for revalidation
	
	validateUserInfo();
	validateEmailDeals();
	
	// submit valid form
	if (formValidity === true) {
		document.getElementById("errorMessage").innerHTML = "";
		document.getElementById("errorMessage").style.display = "none";
		document.getElementsByTagName("form")[0].submit();
	} 
}

//* create event listeners */
function createEventListeners() {
	
	// display pop-up calendar
	var dateField = document.getElementById("apptDate");
	if (dateField.addEventListener) {
		dateField.addEventListener("click", displayCalendar, false);
	} else if (dateField.attachEvent) {
		dateField.attachEvent("onclick", displayCalendar);
	}
	
	// select appointment date
	var dateCells = document.getElementsByTagName("td");
	if (dateCells[0].addEventListener) {
		for (var i = 0; i < dateCells.length; i++) {
			dateCells[i].addEventListener("click", selectDate, false);
		} 
	} else if (dateCells[0].attachEvent) {
		for (var i = 0; i < dateCells.length; i++) {
			dateCells[i].attachEvent("onclick", selectDate);
		}
	}
	
	// close the pop-up calendar
	$("#close").click(hideCalendar);
	
	// display calendar for "previous" and "next" buttons on calendar widget
	$("#prev").click(prevMo);
	$("#next").click(nextMo);
	
	// validate request form data
	var form = document.getElementsByTagName("form")[0];
	if (form.addEventListener) {
		form.addEventListener("submit", validateForm, false);
	} else if (form.attachEvent) {
		form.attachEvent("onsubmit", validateForm);
	}
}

function setUpPage() {
	createEventListeners ();
}

/* run setup function when page finished loading */
if (window.addEventListener) {
	window.addEventListener("load", setUpPage, false);
}
	else if (window.attachEvent) {
		window.attachEvent("onload", setUpPage);
}
