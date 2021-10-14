"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      break;
      default:
        alert ("invalid input");
    // app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to find people with 'single', 'multiple' criteria? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "single":
      // TODO: get person's info
      let key = promptFor("What is the person's info?", chars);
      let person_list = searchByProperty(people, key);
      alert("You have found " + person_list.length + " people.");
      app(people);
      break;
    case "multiple":
      let query = promptFor("Please input the search Query", chars);
      let query_result = searchByQuery(people, query);
      alert("You have found " + query_result.length + " people.");
      app(people);
      break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.find(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

function searchByProperty(people, key) {
  let value = promptFor("What is the person's " + key + "?", chars);

  let foundPerson = people.filter(function(person){
    if(person[key] === value){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

function searchByQuery(people, query) {
  // parse query
  let list = query.split(",");

  let query_list = [];
  for(var i = 0; i < list.length; i++)
  {
    let item = list[i].split("=");
    let key = item[0].trim();
    let value = item[1].trim();

    query_list.push({key: key, value: value});
  }
 
  let foundPerson = people.filter(function(person){
    let matched = true;
    for(var i = 0; i < query_list.length; i++)
    {
      let item = query_list[i];
      if( person[item['key']] != item['value'])
      {
        matched = false;
        break;
      }      
    }

    return matched;
  })

  console.log("Multiple Search Result", foundPerson);
  // TODO: find the person using the name they entered
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input

function promptFor(question, valid){
  do{
    var response = prompt(question).trim()
  } while(!response || !valid(response));
  return response;
}          

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
