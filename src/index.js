var gender = document.getElementById("gender");
var region = document.getElementById("region");
var amount = document.getElementById("amount");
var tbody = document.getElementById("tblbody");
var btnsend = document.getElementById("btnsend");
var btnsql = document.getElementById("btnsql");
var SQLTextA = document.getElementById("sql");
var collectedData;

var url = "http://uinames.com/api/?";

btnsend.addEventListener("click", function() {
  fetch(getUrl())
    .then(res => res.json())
    .then(persons => {
      //console.log(persons);
      collectedData = persons;
      var p = persons.map(person => {
        return (
          "<tr>" +
          "<td>" +
          person.name +
          "</td>" +
          "<td>" +
          person.surname +
          "</td>" +
          "<td>" +
          person.gender +
          "</td>" +
          "</tr>"
        );
      });
      tbody.innerHTML = p.join("");
    })
    .catch(error => alert(error));
});

btnsql.addEventListener("click", createSQL);

//Could have used .concat(), but assignment operators are several times faster in JS
function getUrl() {
  var correctUrl = url;
  if (amount.value > 0) {
    correctUrl += "amount=" + amount.value + "&";
  }
  if (gender.value != "both") {
    correctUrl += "gender=" + gender.value + "&";
  }
  if (region.value != "All") {
    correctUrl += "region=" + region.value;
  }
  return correctUrl;
}

function createSQL() {
  var SQL = collectedData.map(element => {
    return `INSERT INTO name (name,surname,gender) VALUES ('${element.name}','${
      element.surname
    }','${element.gender}');`;
  });
  SQLTextA.innerHTML = SQL.join("\n");
}

function errorCheck(response) {
  if (response.status === 200) {
    return response.json();
  } else {
    alert(response.status);
  }
}
