var config = {
    apiKey: "<API KEY>",
    authDomain: "<AUTH DOMAIN>",
    databaseURL: "<DATABASE URL>",
    projectId: "<PROJECT ID>",
    storageBucket: "<STORAGE BUCKET>",
    messagingSenderId: "<MESSAGING SENDER ID>"
  };
 var app = firebase.initializeApp(config);
 var db = firebase.firestore(app);
 //settings
 const settings = { /* your settings... */
	timestampsInSnapshots: true
 };
 db.settings(settings);
 
 
 
 //fa variables
 var year1, year2, year3, year4, year5, arrayFa = [];
 //euro variables
 var year, arrayEuro = [];
 //primer league variables
 var year1pl, year2pl, year3pl, year4pl, plArray = [];
 
 
 document.addEventListener("DOMContentLoaded", function() {
	//buttons
	var faBtn = document.getElementById("fa");
	var plBtn = document.getElementById("pl");
	var uefaBtn = document.getElementById("uefa");
	var reset = document.getElementById("reset");
 
	reset.addEventListener("click",function(){
		removeElement("faUL");
		removeElement("plUL");
		removeElement("uefaUL");
	});

	// When user clicks button for when Mancity won the FA Cup, data from Titles collection -> fa documents
	// is pushed onto an array to be transformed into an HTMl list (see createList function)
	faBtn.addEventListener("click", function() {
	   db.collection("titles").doc("fa")
		  .get().then(function(doc) {
			 year1 = doc.data().year1;
			 year2 = doc.data().year2;
			 year3 = doc.data().year3;
			 year4 = doc.data().year4;
			 year5 = doc.data().year5;
 
			 arrayFa.push(year1, year2, year3, year4, year5);
 
			// Takes the array of years and transforms the data into a HTML list
			 createList(arrayFa, "faUL");

			// Will display the list created for 5 seconds before collapsing
			 setTimeout(function(){
				removeElement("faUL");
			},5000)
			faBtn.disabled = false;
		  });
 
	});

	// When user clicks button for when Mancity won the Primer League, data from Titles collection -> pl documents
	// is pushed onto an array to be transformed into an HTMl list (see createList function)
	plBtn.addEventListener("click", function() {
	   db.collection("titles").doc("primerleague")
		  .get()
		  .then(function(doc) {
			 year1pl = doc.data().year1;
			 year2pl = doc.data().year2;
			 year3pl = doc.data().year3;
			 year4pl = doc.data().year4;
 
			 plArray.push(year1pl, year2pl, year3pl, year4pl);

 			// Takes the array of years and transforms the data into a HTML list
			 createList(plArray, "plUL");

			 // Will display the list created for 5 seconds before collapsing
			 setTimeout(function(){
				removeElement("plUL");
			},5000)
			plBtn.disabled = false;
		  });
	});

	// When user clicks button for when Mancity won the UEFA Champions League, data from Titles collection -> uefa documents
	// is pushed onto an array to be transformed into an HTMl list (see createList function)
	uefaBtn.addEventListener("click", function() {
	   db.collection("titles").doc("uefa")
		  .get()
		  .then(function(doc) {
			 year = doc.data().year;
			 arrayEuro.push(year);

			// Takes the array of years and transforms the data into a HTML list
			 createList(arrayEuro, "uefaUL", uefaBtn);

			// Will display the list created for 5 seconds before collapsing
			 setTimeout(function(){
				 removeElement("uefaUL");
			 },5000)
			 uefaBtn.disabled = false;
		  });
	})

 });
 function removeElement(elementID){
	var element = document.getElementById(elementID);
	element.parentNode.removeChild(element);
 }

/* Function: createList(array,dest,button)
   params: array - input data to be processed. dest - the parent unordered list element. button - not used
 */
 function createList(array, dest, button) {
	// Loops through the data array, creates a li element and appends the stat to the new HTML element
	for (var i = 0; i < array.length; i++) {
	   var listItem = document.createElement("li");
	   var textNode = document.createTextNode(array[i]);
	   listItem.appendChild(textNode);
	   document.getElementById(dest).appendChild(listItem);
	}
	array.length = 0;
 }

 