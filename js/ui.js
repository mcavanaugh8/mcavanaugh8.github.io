class UI {
  constructor() {
    this.numberOfPlayers = 0;
    this.hasActivePlayer = false;

    this.validateButton = document.querySelector(".validate-pick");
    this.draftBoard = document.querySelector(".draftboard");
    this.boardTable = document.querySelector(".board-table");

    this.validateButton.disabled = true;
  }

  disableButton() {
    this.validateButton.disabled = true;
  }

  enableButton() {
    this.validateButton.disabled = false;
  }

  checkNumberOfPlayers() {
    return this.numberOfPlayers;
  }

  getProspectNames() {
    let prospectNames = [];
    prospects.forEach((prospect) => prospectNames.push(prospect.name));
    return prospectNames.sort();
  }

  addImageLinksToPlayerObject() {
    prospects.forEach((prospect, index) => {
      prospect.imageLink = prospectsHeadshots[index];
    });
  }

  formatTeamCells(teamCell) {
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
      case "HOUSTON":
        teamCell.style.backgroundColor = "rgba(4,47,106,1)";
        teamCell.style.color = "#ff0000";
        teamCell.style.fontWeight = "bolder";
        break;
      case "KANSAS CITY":
        teamCell.style.backgroundColor = "#ff0000";
        teamCell.style.color = "#FFF";
        teamCell.style.fontWeight = "bolder";
        break;
      case "LA RAMS":
        teamCell.style.backgroundColor = "rgba(7,55,99,1)";
        teamCell.style.color = "#d5b11b";
        teamCell.style.fontWeight = "bolder";
        break;
      case "TAMPA BAY":
        teamCell.style.backgroundColor = "rgba(204,65,37,1)";
        teamCell.style.color = "#FFF";
        teamCell.style.fontWeight = "bolder";
        break;
      case "SEATTLE":
        teamCell.style.backgroundColor = "rgba(0,34,68,1)";
        teamCell.style.color = "rgba(105,190,40,1)";
        teamCell.style.fontWeight = "bolder";
        break;
    }
  }

  createDraftObjects() {
    const players = document.querySelectorAll(".player-score");
    let draftObj = {};

    players.forEach((player, index) => {
      let playerDraftObj = {};
      let pickName;

      for (let i = 1; i < this.boardTable.rows.length; i++) {
        let lastCell = this.boardTable.rows[i].cells.length - 1;
        if (index === 0) {
          if (
            this.boardTable.rows[i].cells[lastCell].querySelector("a") !== null
          ) {
            pickName =
              this.boardTable.rows[i].cells[lastCell].querySelector(
                "a"
              ).textContent;
          }

          draftObj[i] = {
            draftPosition: i,
            team: realDraftOrder[i - 1],
            player: pickName,
          };
        }

        if (
          this.boardTable.rows[i].cells[index + 2].textContent.includes("/")
        ) {
          const picksArr =
            this.boardTable.rows[i].cells[index + 2].textContent.split("/");
          playerDraftObj[i] = {
            team: intitialDraftOrder[i - 1],
            player: picksArr[0],
            altPlayer: picksArr[1],
          };
        } else {
          playerDraftObj[i] = {
            team: intitialDraftOrder[i - 1],
            player: this.boardTable.rows[i].cells[index + 2].textContent,
            altPlayer: "",
          };
        }
        // console.log(playerDraftObj);
      }
      this.calculatePoints(draftObj, playerDraftObj, player, index + 2, index);
    });
  }

  addAllRounds(playerPicks, playerName) {
    if (this.hasActivePlayer === false) {
      for (let i = 0; i <= 31; i++) {
        let newRow = this.boardTable.insertRow(i + 1);
        if (i === 0) {
          let th1 = document.createElement("th");
          th1.scope = "col";
          th1.innerHTML = "#";
          this.boardTable.rows[0].appendChild(th1);

          let th2 = document.createElement("th");
          th2.scope = "col";
          th2.innerHTML = "Team";
          this.boardTable.rows[0].appendChild(th2);

          let th3 = document.createElement("th");
          th3.scope = "col";
          th3.innerHTML = "Actual";
          this.boardTable.rows[0].appendChild(th3);
        }
        for (let j = 0; j < 3; j++) {
          let newCell = newRow.insertCell();
          newCell.classList.add("text-center");
          switch (j) {
            case 0:
              break;
            case 1:
              newCell.textContent = intitialDraftOrder[i].team;
              newCell.classList.add("team");
              newCell.classList.add("text-center");
              this.formatTeamCells(newCell);
              break;
            case 2:
              newCell.innerHTML =
                '<input class="form-control form-control-sm" type="text" placeholder="Player Name">';
              const pickText = newCell.querySelector("input");
              pickText.classList.add("actual-pick");
              //   let str = "";
              //   str += `
              // <ul id="playerList" class="hidden">`;

              //   prospects.forEach((player, index, arr) => {
              //     str += `<li class="player-li">${player.name}</li>`;
              //   });
              //   str += "</ul>";
              //   newCell.innerHTML += str;
              break;
          }
        }
        newRow.cells[0].textContent = i + 1;
      }
    } else {
      for (let i = 0; i < this.boardTable.rows.length; i++) {
        let currRow = this.boardTable.rows[i];

        if (i === 0) {
          let th = document.createElement("th");
          th.scope = "col";
          th.innerHTML = playerName;
          currRow.insertBefore(
            th,
            currRow.children[currRow.children.length - 1]
          );
        } else {
          let newCell = currRow.insertCell(this.numberOfPlayers + 1);
          newCell.classList.add("text-center");
          newCell.textContent = playerPicks[i - 1];
        }
      }
    }
  }

  addPlayers(name, file) {
    if (!file) {
      alert("You must add a file containing your picks!");
    } else {
      const scope = this;
      this.numberOfPlayers++;

      if (this.hasActivePlayer === false) {
        this.hasActivePlayer = true;
        this.enableButton();
      }

      let trTop = document.getElementById("scoreboard-table-row-top"),
        trBottom = document.getElementById("scoreboard-table-row-score");
      let thTop = document.createElement("th"),
        thBottom = document.createElement("th");

      thTop.innerHTML = name;
      thTop.scope = "col";
      thBottom.innerHTML = "0";
      thBottom.classList.add("player-score");

      trTop.appendChild(thTop);
      trBottom.appendChild(thBottom);

      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (event) {
        const picksArr = event.target.result.split("\r\n");
        const picksArrClean = picksArr.map((item) => {
          return item.replace(/(^)(\s.+?)(\w)/g, "$1$3");
        });

        scope.addAllRounds(picksArrClean, name);
      };
    }

    /**
     * <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
     */
  }

  addPlayerCards() {
    for (let i = 1; i < this.boardTable.rows.length; i++) {
      for (let c = 0; c < this.boardTable.rows[i].cells.length; c++) {
        console.log(this.boardTable.rows[i].cells[c].classList);
        if (this.boardTable.rows[i].cells[c].textContent !== "") {
          const selection = this.boardTable.rows[i].cells[c].textContent;

          prospects.forEach((prospect, index) => {
            if (prospect.name == selection) {
              let popoutString = `
              <div class=\"container\">
                <div>
                 <img src=\"${prospect.imageLink}\" alt=\"\">
                </div>
                <div>
                    <p>Position: ${prospect.position}</p>
                    <p>School: ${prospect.school}</p>
                    <p>NFL.com Grade: ${prospect.grade}</p>
                </div>
              </div>
              `;
              this.boardTable.rows[i].cells[c].innerHTML = `
              <a tabindex="0"
              class="btn btn-lg btn-primary" 
              role="button" 
              data-html="true" 
              data-toggle="popover" 
              data-trigger="focus" 
              title="<b>${prospect.name}</b>" 
              data-content="${popoutString} ${prospect.name}</a>`;
            }
          });
        }
      }
    }
  }

  validatePicks() {
    /**
     * On button press, create DRAFT object. Should contain list of each pick slot with "team" and "player" keys. Also create playerDraft objects for all players
     * Should also check if TRADE has been made by seeing if .new-team class exists in row index 1. If so, assign value of input to textContent of cell; then change value in draftOrder array
     */

    for (let i = 1; i < this.boardTable.rows.length; i++) {
      var lastRow = this.boardTable.rows[i].cells.length - 1;
      if (
        this.boardTable.rows[i].cells[lastRow].querySelector(".actual-pick") &&
        this.boardTable.rows[i].cells[lastRow].querySelector(".actual-pick")
          .value !== ""
      ) {
        const pick =
          this.boardTable.rows[i].cells[lastRow].querySelector(
            ".actual-pick"
          ).value;
        this.boardTable.rows[i].cells[lastRow].innerHTML = pick;
        this.boardTable.rows[i].cells[lastRow].classList.add("pick-final");
      }

      if (
        this.boardTable.rows[i].cells[1].querySelector(".new-team") &&
        this.boardTable.rows[i].cells[1].querySelector(".new-team").value !== ""
      ) {
        const newTeam =
          this.boardTable.rows[i].cells[1].querySelector(".new-team").value;
        this.boardTable.rows[i].cells[1].innerHTML = "";
        this.boardTable.rows[i].cells[1].textContent = newTeam;
        this.boardTable.rows[i].cells[1].classList.add("team");

        realDraftOrder[i - 1] = newTeam;
        this.formatTeamCells(this.boardTable.rows[i].cells[1]);
      }
    }

    this.createDraftObjects();
    this.addPlayerCards();
  }

  calculatePoints(draftObj, personDraftObject, score, index, altsIndex) {
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
          this.boardTable.rows[j].cells[index].style.backgroundColor = "green";
        } else if (draftObj[j].player === personDraftObject[j].altPlayer) {
          score.textContent = Number(score.textContent) + 0.5;
          this.boardTable.rows[j].cells[index].style.backgroundColor = "navy";
        } else {
          this.boardTable.rows[j].cells[index].style.backgroundColor =
            "#212529";
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
            draftObj[j].player ===
            altsTable.rows[r].cells[altsIndex].textContent
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
              //   console.log(draftObj[j], personDraftObject[z]);
              score.textContent = Number(score.textContent) + 0.5;
            }
          }
        }
      }
    }
  }
}
