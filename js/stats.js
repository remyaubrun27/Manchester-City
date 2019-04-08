// Information to connect to Google Firebase Firestore NoSQL database
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
  var goals,gpm,ontarget,shots;//attacking stats
  var cs,bs,conceded,saves;//defenseive stats
  var rc,yc,off,fouls;//discipline stats
  var notableGoals,notableAssists, notablePasses;
  var array=[];

   // Basic database settings
    const settings = { /* your settings... */
	    timestampsInSnapshots: true
    };
    db.settings(settings);

  // Database query for Attacking documents in Stats collection  
  db.collection("stats").doc("attacking").get()
  .then(function(doc){
    goals ="Goals: "+doc.data().goals; //Goals
    gpm ="Goals Per Minute: "+doc.data().gpm;// Goals per Match
    ontarget = "Shots On Target: "+doc.data().ontarget;// Shots on Goal
    shots = "Shots: "+doc.data().shots;// Shots taken

    // Data is organized into an array
    array.push(goals,gpm,ontarget,shots);
    
    // Data from Stats collection -> Attacking documents is processed into an function
    // which creates HTML elements to represent the data (see function below)
    populateList(array,"attack");
 });

  // Database query for Defense documents in Stats collection  
  db.collection("stats").doc("defense").get()
  .then(function(doc){
    cs ="Clean Sheets: "+doc.data().cleansheets;// Cleansheets, or no goals allowed
    bs ="Blocked Shots: "+doc.data().blockedshots;// Shots blocked
    conceded = "Goals Conceded: "+doc.data().conceded;// Goals conceded
    saves = "Saves: "+doc.data().saves;// Keeper saves

    // Data is organized into an array
    array.push(cs,bs,conceded,saves);

    // Data from Stats collection -> Defense documents is processed into an function
    // which creates HTML elements to represent the data (see function below)
    populateList(array,"defense");
  });

  // Database query for Dicipline (fouls, red/yellow cards, offsides) documents in Stats collection  
  db.collection("stats").doc("disciplines").get()
  .then(function(doc){
    yc ="Yellow Cards: "+doc.data().yellow;// Yellow Cards
    rc ="Red Cards: "+doc.data().red;// Red Cards
    fouls = "Goals Conceded: "+doc.data().fouls;// Fouls
    off = "Offsides: "+doc.data().offsides;// Offsides
    
    // Data is organized into an array
    array.push(yc,rc,fouls,off);

    // Data from Stats collection -> Discipline documents is processed into an function
    // which creates HTML elements to represent the data (see function below)
    populateList(array,"discipline");
  });
  
  /* Function: populateList(array, reference)
     params: array - input data array. reference - what the input data represents 
     purpose: This function generates a list from the input data. For every piece of data in the input data array,
     a HTML li tag is created with the stat appended.
  */
  function populateList(array, reference){
    // Loops through the data array, creates a li element and appends the stat to the new HTML element
    for(var i = 0;i<array.length;i++){
      var listItem = document.createElement("li");
      var stat = document.createTextNode(array[i]);
      listItem.appendChild(stat);
      document.getElementById(reference).appendChild(listItem);
    }
    array.length = 0;
  }

  // Database query for "Notable" stats. Notable are the three major stats and the corresponding player
  // who exceeds in that stat category.
  db.collection("stats").doc("notable")
  .get()
  .then(function(doc){
    var array = [];
    notableGoals = "Sergio Aguero: "+doc.data().goals;// Sergio Aguero, most goals scored
    notableAssists = "Kevin DeBruyne: "+doc.data().assists;// Kevin DeBruyne, most assists
    notablePasses = "Nicolás Otamendi: "+doc.data().passes;// Nicolas Otamendi, most passes
    
    // Data is organized into an array
    array.push(notableGoals,notableAssists,notablePasses);

    // Data from Stats colection -> Notable documents is processed into function
    // generating a list from data array
    populateNotableStats(array);
  })
  
  /* Function: populateNotableStats(array)
     params: array - array of input data
     purpose: This function generates a list from the input data. For every piece of data in the input data array,
     a HTML li tag is created with the stat appended.  
  */
  function populateNotableStats(array){
    var refArray = ["notableGoals","notableAssists","notablePasses"];
    // Loops through the data array, creates a span element and appends the stat to the new HTML element
    for(var i = 0; i<array.length;i++){
      var listItem = document.createElement("span");
      var stat = document.createTextNode(array[i]);
      listItem.appendChild(stat);
      document.getElementById(refArray[i].toString()).appendChild(listItem);
    }

    
  }