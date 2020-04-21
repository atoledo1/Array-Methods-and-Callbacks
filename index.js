import { fifaData } from './fifa.js';
console.log(fifaData);


// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */

const teamsFinal2014 = fifaData.filter(function(team){

    return (team.Year===2014)&&(team.Stage==='Final');
  })
  console.log(teamsFinal2014 );

  console.log('Task 1: (a)');
  console.log("Home Team name for 2014 world cup final: "+ teamsFinal2014[0]["Home Team Name"]);


  console.log('Task 1: (b)');
  console.log(" Away Team name for 2014 world cup final: " + teamsFinal2014[0]["Away Team Name"]);

  
  console.log('Task 1: (c)');
  console.log("Home Team goals for 2014 world cup final is :" + teamsFinal2014[0]["Home Team Goals"]);

  console.log('Task 1: (d)');
  console.log("Away Team goals for 2014 world cup final: "+ teamsFinal2014[0]["Away Team Goals"]);

  console.log('Task 1: (e)');
  if(teamsFinal2014[0]["Home Team Goals"]>teamsFinal2014[0]["Away Team Goals"]){
  console.log("Winner of 2014 world cup final : "+ teamsFinal2014[0]["Home Team Name"]);
  }
  else{
    console.log("Winner of 2014 world cup final : "+ teamsFinal2014[0]["Away Team Name"]);
  }





/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {
    let finalsArray = [];
    data.forEach((game) => {
      if (game.Stage === "Final") {
        finalsArray.push(game);
      }
    });
    return finalsArray;
  }
  
  
  

/* Task 3: Impliment a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(callback) {
    let years = [];
    let newData = callback(fifaData);
    newData.forEach(function(item) {
        years.push(item.Year);
    })
    return years;
}





/* Task 5: Impliment a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(callback) {
    let winners = [];
  
    callback.forEach((game) => {
      winners.push(
        game["Home Team Goals"] > game["Away Team Goals"]
          ? game["Home Team Name"]
          : game["Away Team Name"]
      );
    });
  
    return winners;
  }
  


/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getAllWinners(cbYears, cbWinners) {

    const result=[];
 
    for(let i=0;i<cbYears.length;i++){

        result.push('In '+ cbYears[i] +' '+cbWinners[i]+' swon the world up!');
    };

     return result;
}

/* Task 7: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials, cbGetFinals) {
    const finals = cbGetFinals(data);
    const wins = finals.reduce(function(total, current) {
        const homeWins = (current["Home Team Goals"] > current["Away Team Goals"]);
        if ((homeWins && current["Home Team Initials"] === teamInitials) || !homeWins && current["Away Team Initials"] === teamInitials) {
            return total + 1;
        } else {
            return total;
        }
    }, 0)
    return wins;
}


/* Task 8: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data, callback) {
    const finals = callback(data);
    const names = [];
    const newData = [];
    let highestAverage = 0;
    const teamsWithHighest = [];
    finals.forEach(function (item) {
        if (!names.includes(item["Home Team Name"])) {
            names.push(item["Home Team Name"]);
        }
        if (!names.includes(item["Away Team Name"])) {
            names.push(item["Away Team Name"]);
        }
    })
    names.forEach(function (item) {
        newData.push({ country: item, appear: 0, score: 0 });
    })
    finals.forEach(function (item) {
        const homeName = item["Home Team Name"];
        const awayName = item["Away Team Name"];
        const homeScore = item["Home Team Goals"];
        const awayScore = item["Away Team Goals"];
        newData.forEach(function (item) {
            if (item.country === homeName) {
                item.appear += 1;
                item.score += homeScore;
            } else if (item.country === awayName) {
                item.appear += 1;
                item.score += awayScore;
            }
        })
    })
    newData.forEach(function (item) {
        const average = item.score / item.appear;
        item.average = average;
    })
    newData.forEach(function (item) {
        if (item.average > highestAverage) {
            highestAverage = item.average;
        }
    })
    newData.forEach(function (item) {
        if (item.average === highestAverage) {
            teamsWithHighest.push(item.country);
        }
    })
    console.log(newData);
    return teamsWithHighest;
}

/* Task 9: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data, callback) {
    const finals = callback(data);
    const names = [];
    console.log(finals);
    const newData = [];
    let highestAverage = 0;
    const teamsWithHighest = [];
    finals.forEach(function (item) {
        if (!names.includes(item["Home Team Name"])) {
            names.push(item["Home Team Name"]);
        }
        if (!names.includes(item["Away Team Name"])) {
            names.push(item["Away Team Name"]);
        }
    })
    names.forEach(function (item) {
        newData.push({ country: item, appear: 0, againstScore: 0 });
    })
    finals.forEach(function (item) {
        const homeName = item["Home Team Name"];
        const awayName = item["Away Team Name"];
        const homeScore = item["Home Team Goals"];
        const awayScore = item["Away Team Goals"];
        newData.forEach(function (item) {
            if (item.country === homeName) {
                item.appear += 1;
                item.againstScore += awayScore;
            } else if (item.country === awayName) {
                item.appear += 1;
                item.againstScore += homeScore;
            }
        })
    })
    newData.forEach(function (item) {
        const average = item.againstScore / item.appear;
        item.average = average;
    })
    newData.forEach(function (item) {
        if (item.average > highestAverage) {
            highestAverage = item.average;
        }
    })
    newData.forEach(function (item) {
        if (item.average === highestAverage) {
            teamsWithHighest.push(item.country);
        }
    })
    console.log(newData);
    return teamsWithHighest;
}


/* Task 10: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {
    const homeGoals = data.map(goals => goals["Home Team Goals"]);
    const homeAvg = homeGoals.reduce((total, item) => total + item, 0) / data.length;
    const awayGoals = data.map(goals => goals["Away Team Goals"]);
    const awayAvg = awayGoals.reduce((total, item) => total + item, 0) / data.length;
    return `Home: ${Number.parseFloat(homeAvg).toFixed(2)} | Away: ${Number.parseFloat(awayAvg).toFixed(2)}`;
}


/// STRETCH 🥅 //

/* Use the space below to work on any stretch goals of your chosing as listed in the README file. */