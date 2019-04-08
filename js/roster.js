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

    // Database query for players name from Players collection,
    // where their boolean "starting" value is true, meaning they start the match
  db.collection("players").where("starting", "==", true)
  .get()
  .then(function(querySnapshot) {
      // This loop creates a li element and appends the players name, increases the name's font size and 
      // appends the name to the Starters list
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          var listItem = document.createElement("li");
          var player = document.createTextNode(doc.id);
          listItem.style.fontSize = "25px";
          listItem.appendChild(player);
          document.getElementById("starters").appendChild(listItem);
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });

// Database query for players name from Players collection,
// where their boolean "starting" value is false, meaning they come off the bench
db.collection("players").where("starting", "==", false)
    .get()
    .then(function(querySnapshot) {
        // This loop creates a li element and appends the players name, increases the name's font size and 
        // appends the name to the Reserves list
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var listItem = document.createElement("li");
            var player = document.createTextNode(doc.id);
            listItem.style.fontSize = "25px";
            listItem.appendChild(player);
            document.getElementById("reserves").appendChild(listItem);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

