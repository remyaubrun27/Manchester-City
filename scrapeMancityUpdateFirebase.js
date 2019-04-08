var argv = require('minimist')(process.argv.slice(2));
var request = require('request');
const cheerio = require("cheerio");

/* node ./scrapeMancityUpdateFirebase.js -x 3 -y 4 -n5 -abc --beep=boop foo bar b */

/* node ./scrapeMancityUpdateFirebase.js -v -- /html/body/div[1]/div[4]/div/div/section[2]/ul/li[*]/a/div[2]/div/h3  https://www.mancity.com/teams/first-team 

section[2] Keepers

section[3] Defence

section[4] Midfield
*/
/*************************** Works below. just add func parameter
 */
// var func = argv._[0]; //Will determine whether to show names or name and countries
// var xpath = "li[className='squad-listing--person show']/a/div[2]/div/h3";
// var players = [];
// var url = "https://www.mancity.com/teams/first-team";

// var xpath2 = "li[className='squad-listing--person show']/a/div[2]/div/p/picture";
// var countries = [];

// request(url, function(error, response, body) {
//     console.log("Got " + response.statusCode + " status");
//     console.log("Got " + body.length + " bytes");

//     console.log();
//     const $ = cheerio.load(body);
//     // Bottom lines create reference to place on webpage
//     var squadListings = $(".squad-listing--person-name");//reference for h3 tag with name
//     var countryListings = $(".squad-listing--person-country");//reference to p tag. one of its children is an img


//     $(squadListings).each(function(i, element) {
//         players[i] = $(this).text();
//     })

//     if (func == "players") {
//         for (var x in players) {
//             console.log("Player " + x + ": " + players[x]);
//         }
//     } else if (func == "countries") {
//         $(countryListings).each(function(i, element) {
//             countries[i] = $(this).text();
//         })
//         for (var y in countries) {
//             console.log("Player " + players[y] + " POB: " + countries[y]);
//         }
//     }


//  })
/*************************** */

/*
    TESTING OUT STATS PAGE (had to go to premier league website, not mancity.com)
*/
//var xpath = argv._[0];
//var url = argv._[0];
//var xpath = "//*[@id='mainContent']/div[2]/div/div/div/div[0]/span/span";
//var year = "?se="+argv._[0];
//var url = "https://www.premierleague.com/clubs/11/Manchester-City/stats";
var arg = argv._[0];
var stats = [];
var blockStatsArr = [];
var attacking = [];
var defense = [];
var statsHeroArr = [];
var titleArr=[];
request("https://www.premierleague.com/clubs/11/Manchester-City/stats", function(err, res, body) {
    console.log("Response code: " + res.statusCode);
    console.log("Body length: " + body.length);
    console.log("\n---------------------\n");
    const $ = cheerio.load(body);

    var topStats = $(".topStatList").children(); //Major stats, found in table towards navigation bar
    var blockStats = $('.statsListBlock').children(); //Stats that are organized in tables. This shows all tables, regardless of type of stat
    var attackingStats = $('.normalStat').slice(0, 8); //returns the first 8 elements with class normalStats
    var defenseStats = $('.normalStat').slice(13, 26);//returns elements 13-26, or all stats within defense table
    var statsHero = $('.statsHero');
    var heroTitle = $('.statsTitle').children();


    if (arg == "major") {
        $(topStats).each(function(i, element) {
            // console.log($(this).text());
            stats[i] = $(this).text();
        })
        for (var x in stats) {
            console.log("Stat type: " + stats[x]);
        }
    } else if (arg == "block") {
        $(blockStats).each(function(i, element) {
            console.log($(this).text());
            blockStatsArr[i] = $(this).text();
        })
        for (x in blockStatsArr) {
            console.log("Stat type: " + blockStatsArr[x]);
        }
    } else if (arg == "attacking") {
        $(attackingStats).each(function(i, el) {
            attacking[i] = $(this).text();
        })
        for (x in attacking) {
            console.log("Attacking Stat type: " + attacking[x]);
        }
    } else if (arg == "defense"){
        $(defenseStats).each(function(i, el) {
            defense[i] = $(this).text();
        })
    for (x in defense) {
        console.log("Defensive stat: " + defense[x]);
    }
}else if(arg=="hero"){
    $(statsHero).each(function(i,el){
        statsHeroArr[i]=$(this).text();
    })
    $(heroTitle).each(function(i,el){
        titleArr[i] = $(this).text();
    })
    for(x in statsHeroArr){
        console.log(titleArr[x]+" hero is: "+ statsHeroArr[x]);
    }
}

});

console.dir(argv)