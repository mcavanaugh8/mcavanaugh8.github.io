const draftBoard = document.querySelector(".draftboard");
const boardTable = document.querySelector(".board-table");
const submitButton = document.querySelector(".validate-pick");

const intitialDraftOrder = [{
    team: "JACKSONVILLE",
    needs: [],
  },
  {
    team: "DETROIT",
    needs: [],
  },
  {
    team: "HOUSTON",
    needs: [],
  },
  {
    team: "NEW YORK JETS",
    needs: [],
  },
  {
    team: "NEW YORK GIANTS",
    needs: [],
  },
  {
    team: "CAROLINA",
    needs: [],
  },
  {
    team: "NEW YORK GIANTS",
    needs: [],
  },
  {
    team: "ATLANTA",
    needs: [],
  },
  {
    team: "SEATTLE",
    needs: [],
  },
  {
    team: "NEW YORK JETS",
    needs: [],
  },
  {
    team: "WASHINGTON",
    needs: [],
  },
  {
    team: "MINNESOTA",
    needs: [],
  },
  {
    team: "CLEVELAND",
    needs: [],
  },
  {
    team: "BALTIMORE",
    needs: [],
  },
  {
    team: "PHILADELPHIA",
    needs: [],
  },
  {
    team: "PHILADELPHIA",
    needs: [],
  },
  {
    team: "CHARGERS",
    needs: [],
  },
  {
    team: "NEW ORLEANS",
    needs: [],
  },
  {
    team: "PHILADELPHIA",
    needs: [],
  },
  {
    team: "PITTSBURGH",
    needs: [],
  },
  {
    team: "NEW ENGLAND",
    needs: [],
  },
  {
    team: "LAS VEGAS",
    needs: [],
  },
  {
    team: "ARIZONA",
    needs: [],
  },
  {
    team: "DALLAS",
    needs: [],
  },
  {
    team: "BUFFALO",
    needs: [],
  },
  {
    team: "TENNESSEE",
    needs: [],
  },
  {
    team: "TAMPA BAY",
    needs: [],
  },
  {
    team: "GREEN BAY",
    needs: [],
  },
  {
    team: "MIAMI",
    needs: [],
  },
  {
    team: "KANSAS CITY",
    needs: [],
  },
  {
    team: "LA RAMS",
    needs: [],
  },
  {
    team: "CINCINNATI",
    needs: [],
  },
];

let realDraftOrder = [...intitialDraftOrder];

const sourceMike = [
  "Trevor Lawrence",
  "Zach Wilson",
  "Trey Lance/Mac Jones",
  "Kyle Pitts",
  "Penei Sewell/Jamarr Chase",
  "Jamarr Chase/Penei Sewell",
  "Justin Fields/Jaylen Waddle",
  "Rashawn Slater",
  "Patrick Surtain II",
  "Jaycee Horn",
  "Jaylen Waddle",
  "Devonta Smith",
  "Christian Darrisaw",
  "Alijah Vera-Tucker",
  "Mac Jones",
  "Jeremiah Owusu-Koramoah",
  "Kwity Paye",
  "Jaelen Phillips",
  "Micah Parsons",
  "Teven Jenkins",
  "Caleb Farley",
  "Rashod Bateman",
  "Greg Newsome II",
  "Samuel Cosmi/Creed Humphrey",
  "Alex Leatherwood",
  "Christian Barmore",
  "Liam Eichenberg",
  "Asante Samuel Jr.",
  "Elijah Moore",
  "Travis Etienne",
  "Trevon Moehrig",
  "Levi Onwuzurike",
];

const sourceCarney = [
  "Trevor Lawrence",
  "Zach Wilson",
  "Trey Lance/Mac Jones",
  "Kyle Pitts",
  "Jamarr Chase/Penei Sewell",
  "Jaylen Waddle",
  "Penei Sewell",
  "Rashawn Slater",
  "Justin Fields",
  "Patrick Surtain II",
  "Devonta Smith",
  "Jaycee Horn/Justin Fields",
  "Kwity Paye/Rashawn Slater",
  "Alijah Vera-Tucker",
  "Mac Jones",
  "Caleb Farley",
  "Micah Parsons",
  "Zaven Collins",
  "Jeremiah Owusu-Koramoah",
  "Christian Darrisaw",
  "Jaelan Phillips",
  "Elijah Moore",
  "Greg Newsome II/Travis Etienne",
  "Najee Harris",
  "Teven Jenkins",
  "Jamin Davis",
  "Jayson Oweh",
  "Tyson Campbell",
  "Landon Dickerson",
  "Travis Etienne",
  "Liam Eichenberg",
  "Joe Tryon",
];

const sourceAndrew = [
  "Trevor Lawrence",
  "Zach Wilson",
  "Mac Jones",
  "Kyle Pitts",
  "Jamarr Chase/Penei Sewell",
  "Jaylen Waddle/Jamarr Chase",
  "Penei Sewell/Rashawn Slater",
  "Patrick Surtain II/Justin Fields",
  "Justin Fields/Trey Lance",
  "Jaycee Horn",
  "Devonta Smith",
  "Micah Parsons",
  "Rashawn Slater",
  "Alijah Vera-Tucker",
  "Trey Lance",
  "Zaven Collins",
  "Christian Darrisaw",
  "Kwity Paye",
  "Jeremiah Owusu-Koramoah",
  "Teven Jenkins",
  "Caleb Farley",
  "Kadarius Toney",
  "Greg Newsome II",
  "Najee Harris",
  "Jaelan Phillips",
  "Zaven Collins",
  "Azeez Ojulari",
  "Asante Samuel Jr.",
  "Jamin Davis",
  "Aaron Robinson",
  "Rashod Bateman",
  "Gregory Rousseau",
];

function addAllRounds() {
  for (let i = 0; i <= 31; i++) {
    let newRow = boardTable.insertRow(i + 1);
    for (let j = 0; j < 6; j++) {
      let newCell = newRow.insertCell();
      newCell.classList.add("text-center");
      switch (j) {
        case 1:
          newCell.textContent = intitialDraftOrder[i].team;
          newCell.classList.add("team");
          newCell.classList.add("text-center");
          formatTeamCells(newCell);
          break;
        case 2:
          newCell.textContent = sourceMike[i];
          break;
        case 3:
          newCell.textContent = sourceCarney[i];
          break;
        case 4:
          newCell.textContent = sourceAndrew[i];
          break;
        case 5:
          newCell.innerHTML =
            '<input class="form-control form-control-sm" type="text" placeholder="Player Name">';
          const pickText = newCell.querySelector("input");
          pickText.classList.add("actual-pick");
          break;
      }
    }
    newRow.cells[0].textContent = i + 1;
  }
}

function formatTeamCells(teamCell) {
  switch (teamCell.textContent) {
    case "JACKSONVILLE":
      teamCell.style.backgroundColor = "#45818e";
      teamCell.style.color = "#f1c232";
      teamCell.style.fontWeight = "bolder";
      break;
    case "NEW YORK JETS":
      teamCell.style.backgroundColor = "#38761d";
      teamCell.style.color = "#fff";
      teamCell.style.fontWeight = "bolder";
      break;
    case "SAN FRANCISCO":
      teamCell.style.backgroundColor = "#ff0000";
      teamCell.style.color = "#ffd966";
      teamCell.style.fontWeight = "bolder";
      break;
    case "ATLANTA":
      teamCell.style.backgroundColor = "#000000";
      teamCell.style.color = "#a71930";
      teamCell.style.fontWeight = "bolder";
      break;
    case "CINCINNATI":
      teamCell.style.backgroundColor = "#ff6e07";
      teamCell.style.color = "#000000";
      teamCell.style.fontWeight = "bolder";
      break;
    case "MIAMI":
      teamCell.style.backgroundColor = "#00ffff";
      teamCell.style.color = "#ff6e07";
      teamCell.style.fontWeight = "bolder";
      break;
    case "DETROIT":
      teamCell.style.backgroundColor = "#3d85c6";
      teamCell.style.color = "#efefef";
      teamCell.style.fontWeight = "bolder";
      break;
    case "CAROLINA":
      teamCell.style.backgroundColor = "#23b8ff";
      teamCell.style.color = "#000000";
      teamCell.style.fontWeight = "bolder";
      break;
    case "DENVER":
      teamCell.style.backgroundColor = "#ff8b07";
      teamCell.style.color = "#002b62";
      teamCell.style.fontWeight = "bolder";
      break;
    case "DALLAS":
      teamCell.style.backgroundColor = "#FFF";
      teamCell.style.color = "#042f6a";
      teamCell.style.fontWeight = "bolder";
      break;
    case "NEW YORK GIANTS":
      teamCell.style.backgroundColor = "#1155cc";
      teamCell.style.color = "#FFF";
      teamCell.style.fontWeight = "bolder";
      break;
    case "PHILADELPHIA":
      teamCell.style.backgroundColor = "#274e13";
      teamCell.style.color = "#FFF";
      teamCell.style.fontWeight = "bolder";
      break;
    case "LOS ANGELES CHARGERS":
      teamCell.style.backgroundColor = "#11a1ff";
      teamCell.style.color = "#f1c232";
      teamCell.style.fontWeight = "bolder";
      break;
    case "MINNESOTA":
      teamCell.style.backgroundColor = "#351c75";
      teamCell.style.color = "#ffff00";
      teamCell.style.fontWeight = "bolder";
      break;
    case "NEW ENGLAND":
      teamCell.style.backgroundColor = "#000d4d";
      teamCell.style.color = "#ff0000";
      teamCell.style.fontWeight = "bolder";
      break;
    case "ARIZONA":
      teamCell.style.backgroundColor = "#cc0000";
      teamCell.style.color = "#FFF";
      teamCell.style.fontWeight = "bolder";
      break;
    case "LAS VEGAS":
      teamCell.style.backgroundColor = "#000000";
      teamCell.style.color = "#d9d9d9";
      teamCell.style.fontWeight = "bolder";
      break;
    case "WASHINGTON":
      teamCell.style.backgroundColor = "#990000";
      teamCell.style.color = "#f1c232";
      teamCell.style.fontWeight = "bolder";
      break;
    case "CHICAGO":
      teamCell.style.backgroundColor = "#072253";
      teamCell.style.color = "#ff6e07";
      teamCell.style.fontWeight = "bolder";
      break;
    case "INDIANAPOLIS":
      teamCell.style.backgroundColor = "#001685";
      teamCell.style.color = "#FFF";
      teamCell.style.fontWeight = "bolder";
      break;
    case "TENNESSEE":
      teamCell.style.backgroundColor = "#6fa8dc";
      teamCell.style.color = "#073763";
      teamCell.style.fontWeight = "bolder";
      break;
    case "PITTSBURGH":
      teamCell.style.backgroundColor = "#000000";
      teamCell.style.color = "#ffff00";
      teamCell.style.fontWeight = "bolder";
      break;
    case "CLEVELAND":
      teamCell.style.backgroundColor = "#6c3803";
      teamCell.style.color = "#ff6e07";
      teamCell.style.fontWeight = "bolder";
      break;
    case "BALTIMORE":
      teamCell.style.backgroundColor = "#2d1764";
      teamCell.style.color = "#FFF";
      teamCell.style.fontWeight = "bolder";
      break;
    case "NEW ORLEANS":
      teamCell.style.backgroundColor = "#000000";
      teamCell.style.color = "#d5b11b";
      teamCell.style.fontWeight = "bolder";
      break;
    case "GREEN BAY":
      teamCell.style.backgroundColor = "#274e13";
      teamCell.style.color = "#ffff00";
      teamCell.style.fontWeight = "bolder";
      break;
    case "BUFFALO":
      teamCell.style.backgroundColor = "#1155cc";
      teamCell.style.color = "#ff0000";
      teamCell.style.fontWeight = "bolder";
      break;
    case "TAMPA BAY":
      teamCell.style.backgroundColor = "#cc4125";
      teamCell.style.color = "#FFF";
      teamCell.style.fontWeight = "bolder";
      break;
  }
}

function validatePicks() {
  /**
   * On button press, create DRAFT object. Should contain list of each pick slot with "team" and "player" keys. Also create playerDraft objects for MIKE, CARNEY, and ANDREW
   * Should also check if TRADE has been made by seeing if .new-team class exists in row index 1. If so, assign value of input to textContent of cell; then change value in draftOrder array
   */

  const audio = new Audio("draft_sound.mp3");
  audio.play();

  for (let i = 1; i < boardTable.rows.length; i++) {
    if (
      boardTable.rows[i].cells[5].querySelector(".actual-pick") &&
      boardTable.rows[i].cells[5].querySelector(".actual-pick").value !== ""
    ) {
      const pick =
        boardTable.rows[i].cells[5].querySelector(".actual-pick").value;
      boardTable.rows[i].cells[5].innerHTML = "";
      boardTable.rows[i].cells[5].textContent = pick;
      boardTable.rows[i].cells[5].classList.add("pick-final");
    }

    if (
      boardTable.rows[i].cells[1].querySelector(".new-team") &&
      boardTable.rows[i].cells[1].querySelector(".new-team").value !== ""
    ) {
      const newTeam =
        boardTable.rows[i].cells[1].querySelector(".new-team").value;
      boardTable.rows[i].cells[1].innerHTML = "";
      boardTable.rows[i].cells[1].textContent = newTeam;
      boardTable.rows[i].cells[1].classList.add("team");

      realDraftOrder[i - 1] = newTeam;
      formatTeamCells(boardTable.rows[i].cells[1]);
    }
  }

  createDraftObjects();
}

function createDraftObjects() {
  const mikeScore = document.querySelector(".mike-score");
  const carneyScore = document.querySelector(".carney-score");
  const andrewScore = document.querySelector(".andrew-score");

  let mikeDraftObj = {};
  let carneyDraftObj = {};
  let andrewDraftObj = {};
  let draftObj = {};

  for (let i = 1; i < boardTable.rows.length; i++) {
    draftObj[i] = {
      draftPosition: i,
      team: realDraftOrder[i - 1],
      player: boardTable.rows[i].cells[5].textContent,
    };

    if (boardTable.rows[i].cells[2].textContent.includes("/")) {
      const picksArr = boardTable.rows[i].cells[2].textContent.split("/");
      mikeDraftObj[i] = {
        team: intitialDraftOrder[i - 1],
        player: picksArr[0],
        altPlayer: picksArr[1],
      };
    } else {
      mikeDraftObj[i] = {
        team: intitialDraftOrder[i - 1],
        player: boardTable.rows[i].cells[2].textContent,
        altPlayer: "",
      };
    }

    if (boardTable.rows[i].cells[3].textContent.includes("/")) {
      const picksArr = boardTable.rows[i].cells[3].textContent.split("/");
      carneyDraftObj[i] = {
        team: intitialDraftOrder[i - 1],
        player: picksArr[0],
        altPlayer: picksArr[1],
      };
    } else {
      carneyDraftObj[i] = {
        team: intitialDraftOrder[i - 1],
        player: boardTable.rows[i].cells[3].textContent,
        altPlayer: "",
      };
    }

    if (boardTable.rows[i].cells[4].textContent.includes("/")) {
      const picksArr = boardTable.rows[i].cells[4].textContent.split("/");
      andrewDraftObj[i] = {
        team: intitialDraftOrder[i - 1],
        player: picksArr[0],
        altPlayer: picksArr[1],
      };
    } else {
      andrewDraftObj[i] = {
        team: intitialDraftOrder[i - 1],
        player: boardTable.rows[i].cells[4].textContent,
        altPlayer: "",
      };
    }
  }

  calculatePoints(draftObj, mikeDraftObj, mikeScore, 2, 0);
  calculatePoints(draftObj, carneyDraftObj, carneyScore, 3, 1);
  calculatePoints(draftObj, andrewDraftObj, andrewScore, 4, 2);
}

function calculatePoints(draftObj, personDraftObject, score, index, altsIndex) {
  score.textContent = "0";

  for (var j in draftObj) {
    /**
     * calculate score for Mike
     *  - +1 if PLAYER is correct
     *  - +1 if PLAYER/TEAM combo is correct
     *  - +1 if FIRST ROUND IS CORRECT
     * add formatting to cells
     */

    // check if PLAYER (or altPlayer) is correct
    if (draftObj[j].player !== "") {
      if (draftObj[j].player === personDraftObject[j].player) {
        score.textContent = Number(score.textContent) + 1;
        boardTable.rows[j].cells[index].style.backgroundColor = "green";
      } else if (draftObj[j].player === personDraftObject[j].altPlayer) {
        score.textContent = Number(score.textContent) + 0.5;
        boardTable.rows[j].cells[index].style.backgroundColor = "navy";
      } else {
        boardTable.rows[j].cells[index].style.backgroundColor = "#212529";
      }
    }

    // check if FIRST ROUND is correct, including alternate picks

    let firstRoundersArr = [];
    let altFirstRounders = [];

    for (var x in personDraftObject) {
      firstRoundersArr.push(personDraftObject[x].player);
      altFirstRounders.push(personDraftObject[x].altPlayer);
    }

    const altsTable = document.querySelector(".table-alternates");

    for (let r = 1; r < altsTable.rows.length; r++) {
      if (draftObj[j].player !== "") {
        if (
          draftObj[j].player === altsTable.rows[r].cells[altsIndex].textContent
        ) {
          altsTable.rows[r].cells[altsIndex].style.backgroundColor = "green";
          score.textContent = Number(score.textContent) + 0.5;
        }
      }
    }

    if (draftObj[j].player !== "") {
      if (firstRoundersArr.includes(draftObj[j].player)) {
        score.textContent = Number(score.textContent) + 1;
      } else if (altFirstRounders.includes(draftObj[j].player)) {
        score.textContent = Number(score.textContent) + 0.5;
      }
    }

    // check if PLAYER/TEAM combo is correct

    for (var z in personDraftObject) {
      if (draftObj[j].player !== "") {
        if (draftObj[j].team === personDraftObject[z].team) {
          if (draftObj[j].player === personDraftObject[z].player) {
            score.textContent = Number(score.textContent) + 1;
          } else if (draftObj[j].player === personDraftObject[z].altPlayer) {
            console.log(draftObj[j], personDraftObject[z]);
            score.textContent = Number(score.textContent) + 0.5;
          }
        }
      }
    }
  }
}

addAllRounds();

submitButton.addEventListener("click", validatePicks);
document.addEventListener("dblclick", (event) => {
  if (event.target.classList.contains("pick-final")) {
    event.target.innerHTML =
      '<input class="form-control form-control-sm" type="text" placeholder="Player Name">';

    event.target.classList.remove("pick-final");
    const pickText = event.target.querySelector("input");
    pickText.classList.add("actual-pick");
  }

  /**
   * add editing of team name  for trades
   */

  if (event.target.classList.contains("team")) {
    event.target.innerHTML =
      '<input class="form-control form-control-sm" type="text" placeholder="Team Name">';
    const teamText = event.target.querySelector("input");
    teamText.classList.add("new-team");
  }
});