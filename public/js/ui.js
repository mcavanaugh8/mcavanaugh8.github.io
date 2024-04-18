class UI {
  constructor(draftOrder) {
    this.numberOfPlayers = 0;
    this.hasActivePlayer = false;

    this.validateButton = document.querySelector('.validate-pick');
    this.draftBoard = document.querySelector('.draftboard');
    this.boardTable = document.querySelector('.board-table');
    this.teamList = document.querySelector('#team-list');

    if (this.validateButton) {
      this.mode = 'live';
      this.validateButton.disabled = true;
    } else {
      this.mode = 'mock';
    }

    this.participantObjects = [];
    this.actualPicks = [];
    this.intitialDraftOrder = draftOrder;
    this.updatedDraftOrder = [];
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
    // prospects.forEach((prospect, index) => {
    //   // prospect.imageLink = prospectsHeadshots[index].replace(
    //   //   /f_png,q_85,h_47,w_47,c_fill,g_face:center,f_auto/g,
    //   //   'f_auto,q_85'
    //   // );

    //   prospectsRAS.forEach((prospectRAS, index) => {
    //     if (prospect.name === prospectRAS.name) {
    //       if (prospectRAS.score !== 'N/A') {
    //         prospect['RAS'] = Number(prospectRAS.score);
    //       } else {
    //         prospect['RAS'] = prospectRAS.score;
    //       }
    //     }
    //   });
    // });
  }

  resetDraft() {
    this.hasActivePlayer = false;
    this.numberOfPlayers = 0;
    this.participantObjects = [];

    this.resetLocalStorage('participants');
    this.resetLocalStorage('draft-results');
    this.resetLocalStorage('updated-draft-order');
    this.addAllRounds(true);

    let trTop = document.getElementById('scoreboard-table-row-top'),
      trBottom = document.getElementById('scoreboard-table-row-score');

    trTop.innerHTML = ``;
    trBottom.innerHTML = ``;
    if (this.mode === 'live') {
      this.disableButton();
    }

    if (document.getElementById('submitDraft')) {
      document.getElementById('submitDraft').parentNode.remove();
      location.reload();
    }
  }

  addToLocalStorage(name, src) {
    localStorage.setItem(name, JSON.stringify(src));
  }

  getFromLocalStorage(name) {
    let obj;

    if (localStorage.getItem(name) === null) {
      obj = [];
    } else {
      obj = JSON.parse(localStorage.getItem(name));
    }
    // console.log(obj, typeof obj);
    return obj;
  }

  // addFromLocalStorageToPage() {
  //   /**load each participant & their picks */
  //   const participants = this.getFromLocalStorage('participants');
  //   const draftPicks = this.getFromLocalStorage('draft-results');

  //   participants.forEach((participant, index) => {
  //     this.participantObjects.push(participant);
  //     this.addPlayers(participant.name, false, false, true, participant.picks);
  //     // console.log(participant.name, participant.picks);
  //   });

  //   /** load actual draft selections */

  //   if (draftPicks !== null && Object.keys(draftPicks).length === 32) {
  //     const teamList = document.querySelector('#team-list');

  //     for (let i = 0; i < teamList.querySelectorAll('li').length; i++) {
  //       if (draftPicks[i] !== undefined) {
  //         const currRow = teamList.querySelectorAll('li')[i]

  //         if (draftPicks[i].player !== '') {
  //           currRow.querySelector('.actual-pick').value = draftPicks[i].player.replace(/.+?\s/, '');
  //         }
  //       }
  //     }
  //   }

  //   this.addPlayerCards();
  //   this.validatePicks();
  //   this.createDraftObjects();
  // }

  resetLocalStorage(name) {
    localStorage.removeItem(name);
  }

  formatTeamCells(teamCell) {
    switch (teamCell.textContent) {
      case 'JACKSONVILLE':
        teamCell.style.backgroundColor = '#45818e';
        teamCell.style.color = '#f1c232';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'NEW YORK JETS':
        teamCell.style.backgroundColor = '#38761d';
        teamCell.style.color = '#fff';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'SAN FRANCISCO':
        teamCell.style.backgroundColor = '#ff0000';
        teamCell.style.color = '#ffd966';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'ATLANTA':
        teamCell.style.backgroundColor = '#000000';
        teamCell.style.color = '#a71930';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'CINCINNATI':
        teamCell.style.backgroundColor = '#ff6e07';
        teamCell.style.color = '#000000';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'MIAMI':
        teamCell.style.backgroundColor = '#00ffff';
        teamCell.style.color = '#ff6e07';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'DETROIT':
        teamCell.style.backgroundColor = '#3d85c6';
        teamCell.style.color = '#efefef';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'CAROLINA':
        teamCell.style.backgroundColor = '#23b8ff';
        teamCell.style.color = '#000000';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'DENVER':
        teamCell.style.backgroundColor = '#ff8b07';
        teamCell.style.color = '#002b62';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'DALLAS':
        teamCell.style.backgroundColor = '#FFF';
        teamCell.style.color = '#042f6a';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'NEW YORK GIANTS':
        teamCell.style.backgroundColor = '#1155cc';
        teamCell.style.color = '#FFF';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'PHILADELPHIA':
        teamCell.style.backgroundColor = '#274e13';
        teamCell.style.color = '#FFF';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'LOS ANGELES CHARGERS':
        teamCell.style.backgroundColor = '#11a1ff';
        teamCell.style.color = '#f1c232';
        teamCell.style.fontWeight = 'bolder';
        teamCell.style.fontSize = '0.9rem';
        break;
      case 'MINNESOTA':
        teamCell.style.backgroundColor = '#351c75';
        teamCell.style.color = '#ffff00';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'NEW ENGLAND':
        teamCell.style.backgroundColor = '#000d4d';
        teamCell.style.color = '#ff0000';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'ARIZONA':
        teamCell.style.backgroundColor = '#cc0000';
        teamCell.style.color = '#FFF';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'LAS VEGAS':
        teamCell.style.backgroundColor = '#000000';
        teamCell.style.color = '#d9d9d9';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'WASHINGTON':
        teamCell.style.backgroundColor = '#990000';
        teamCell.style.color = '#f1c232';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'CHICAGO':
        teamCell.style.backgroundColor = '#072253';
        teamCell.style.color = '#ff6e07';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'INDIANAPOLIS':
        teamCell.style.backgroundColor = '#001685';
        teamCell.style.color = '#FFF';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'TENNESSEE':
        teamCell.style.backgroundColor = '#6fa8dc';
        teamCell.style.color = '#073763';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'PITTSBURGH':
        teamCell.style.backgroundColor = '#000000';
        teamCell.style.color = '#ffff00';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'CLEVELAND':
        teamCell.style.backgroundColor = '#6c3803';
        teamCell.style.color = '#ff6e07';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'BALTIMORE':
        teamCell.style.backgroundColor = '#2d1764';
        teamCell.style.color = '#FFF';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'NEW ORLEANS':
        teamCell.style.backgroundColor = '#000000';
        teamCell.style.color = '#d5b11b';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'GREEN BAY':
        teamCell.style.backgroundColor = '#274e13';
        teamCell.style.color = '#ffff00';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'BUFFALO':
        teamCell.style.backgroundColor = '#1155cc';
        teamCell.style.color = '#ff0000';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'HOUSTON':
        teamCell.style.backgroundColor = 'rgba(4,47,106,1)';
        teamCell.style.color = '#ff0000';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'KANSAS CITY':
        teamCell.style.backgroundColor = '#ff0000';
        teamCell.style.color = '#FFF';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'LOS ANGELES RAMS':
        teamCell.style.backgroundColor = 'rgba(7,55,99,1)';
        teamCell.style.color = '#d5b11b';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'TAMPA BAY':
        teamCell.style.backgroundColor = 'rgba(204,65,37,1)';
        teamCell.style.color = '#FFF';
        teamCell.style.fontWeight = 'bolder';
        break;
      case 'SEATTLE':
        teamCell.style.backgroundColor = 'rgba(0,34,68,1)';
        teamCell.style.color = 'rgba(105,190,40,1)';
        teamCell.style.fontWeight = 'bolder';
        break;
    }
  }

  createDraftObjects() {
    const players = this.getFromLocalStorage('participants');
    const teamCells = document.querySelectorAll('.team');
    const teams = this.teamList.querySelectorAll('li');
    
    let draftObj = {};

    for (let i = 0; i < teams.length; i++) {
      let pickName;

      if (teams[i].querySelector('.real-draft-selection').querySelector('div') !== null) {
        pickName = teams[i].querySelector('.prospect-name').textContent.replace(/\n|\s{2,}/g, '').replace(/^.*?\s/, '');
      } else {
        pickName = '';
      }

      draftObj[i] = {
        draftPosition: i,
        team: teamCells[i].textContent,
        player: pickName
      };

      this.updatedDraftOrder[i] = teamCells[i].textContent;
      this.updatedDraftOrder[i] = teamCells[i].textContent;
    }

    if (players.length > 0) {
      players.forEach((player, index) => {
        let playerDraftObj = {};

        for (let i = 0; i < player.picks.length; i++) {
          let currentPick = player.picks[i]
          // console.log(currentPick)
          playerDraftObj[i] = {
            team: currentPick.team,
            player: currentPick.player,
            altPlayer: currentPick.altPlayer,
          };

          // console.log(playerDraftObj);
        }

        const scoreboardContent = document.querySelector('#scoreboard-content');
        if (scoreboardContent) {
          // scoreboardContent.innerHTML = '';
  
          let playerScoreDiv = scoreboardContent.querySelectorAll('.player-score');
          // console.log(draftObj)
          this.calculatePoints(draftObj, playerDraftObj, playerScoreDiv[index], index, index);
        }

      });
    } else {
      for (let i = 0; i < teams.length; i++) {
        let pickName;

        if (teams[i].querySelector('.real-draft-selection').querySelector('div') !== null) {
          pickName = teams[i].querySelector('.prospect-name').textContent.replace(/\n|\s{2,}/g, '').replace(/^.*?\s/, '');
        } else {
          pickName = '';
        }

        draftObj[i] = {
          draftPosition: i,
          team: teamCells[i].textContent,
          player: pickName
        };
        this.updatedDraftOrder[i] = teamCells[i].textContent;
      }
    }


    // console.log(`DRAFT OBJECT (${Object.keys(draftObj).length}):`, draftObj);
    this.addToLocalStorage('draft-results', draftObj);
    // console.log(this.participantObjects, this.actualPicks);
  }

  addAllRounds(reset) {
    const participants = this.getFromLocalStorage('participants');
    const draftResults = this.getFromLocalStorage('draft-results');

    if (reset) {
      this.teamList.innerHTML = '';
      this.addTeamPick(this.intitialDraftOrder);
    } else {
      if (!this.teamList) {
        this.teamList = document.querySelector('#team-list');
      }

      /** create draft board, regardless of participants picks */
      if (this.teamList.querySelectorAll('li').length == 0) {
        console.log('create initial board')
        this.addTeamPick(this.intitialDraftOrder);
      }

      if (Object.keys(draftResults).length > 0) {
        this.addTeamPick(draftResults);
      } else {
        this.addTeamPick(this.intitialDraftOrder);
      }
    }

    /** loop through participants and procedurally add their selections to the draft board */
    const scoreboardContent = document.querySelector('#scoreboard-content');
    if (scoreboardContent) {
      scoreboardContent.innerHTML = '';
    }

    participants.forEach((participant, index) => {
      const teams = this.teamList.querySelectorAll('li');
      for (var i = 0; i < teams.length; i++) {
        // console.log(participant)
        // console.log(participant.picks)
        // console.log(participant.picks[i])
        // console.log(i)
        // console.log(teams[i])
        let currRow = teams[i];
        if (participant.picks[i].altPlayer !== '' && participant.picks[i].altPlayer !== undefined) {
          currRow.querySelector('.player-pick').innerHTML += `<p class="player-name single-line text-center"> <sup>${index + 1}</sup> ${participant.picks[i].player}/${participant.picks[i].altPlayer}</p>`;
        } else {
          currRow.querySelector('.player-pick').innerHTML += `<p class="player-name single-line text-center"> <sup>${index + 1}</sup> ${participant.picks[i].player}</p>`;
        }
      }

      if (scoreboardContent) {
        let newPlayerRow = document.createElement('p');
        newPlayerRow.id = participant.name.toLowerCase().replace(/\s/g, '-');
        newPlayerRow.innerHTML = ` <sup>${index + 1}</sup> ${participant.name}: <span class="player-score">${participant.score}</span> points`;
        scoreboardContent.appendChild(newPlayerRow);
      }

      // this.calculatePoints(draftResults, participant.picks, newPlayerRow.querySelector('.player-score'), index);
    })

  }

  addTeamPick(order) {
    this.teamList.innerHTML = '';
    // console.log(order)
    for (let key in order) {
      let pick = order[key];
      // console.log(pick)
      let team = pick.team.team ? pick.team.team : pick.team;

      const listItem = document.createElement('li');
      listItem.className = 'list-group-item draggable';
      listItem.setAttribute('draggable', 'true');
      if (this.mode === 'live') {
      listItem.innerHTML = `
        <div class="row">
          <div class="col-md-1 d-flex align-items-center justify-content-center">${Number(key) + 1}</div>
          <div class="col-md-2 team d-flex align-items-center justify-content-center">${team}</div>
          <div class="col-md-2 player-pick d-flex flex-column justify-content-center">
          </div>
          <div class="col-md-7 real-draft-selection">
            <input list="player-list" class="form-control form-control-sm actual-pick" type="text" placeholder="Player Name">
          </div>
        </div>`;
      } else {
        listItem.innerHTML = `
          <div class="row">
            <div class="col-md-1 d-flex align-items-center justify-content-center">${Number(key) + 1}</div>
            <div class="col-md-2 team d-flex align-items-center justify-content-center">${team}</div>
            <div class="col-md-9 real-draft-selection">
              <input list="player-list" class="form-control form-control-sm actual-pick" type="text" placeholder="Player Name">
            </div>
          </div>`;

      }

      this.teamList.appendChild(listItem);

      if (pick.player !== undefined) {
        this.addSinglePlayerCard(pick.player, listItem.querySelector('.real-draft-selection'));
      }

      this.formatTeamCells(listItem.querySelector('.team'));
    }
  }

  addPlayers(name, file, altFile, onReload, participantPicks) {

    if (!file) {
      alert('You must add a file containing your picks!');
    } else {
      const scope = this;
      this.numberOfPlayers++;

      if (this.hasActivePlayer === false) {
        this.hasActivePlayer = true;
        this.enableButton();
      }

      const scoreboardContent = document.querySelector('#scoreboard-content');

      let newPlayerRow = document.createElement('p');
      newPlayerRow.id = name.toLowerCase().replace(/\s/g, '-');
      newPlayerRow.innerHTML = `${name}: <span class="player-score">0</span> points`;
      scoreboardContent.appendChild(newPlayerRow);

      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = function (event) {
        // console.log(event.target.result);
        const picksArr =
          event.target.result.split('\r\n').length > 1 ?
            event.target.result.split('\r\n') :
            event.target.result.split('\n');

        const picksArrClean = picksArr.map((item) => {
          return item.replace(/(^)(\s.+?)(\w)/g, '$1$3');
        });

        let obj = {
          name: name,
          picks: [],
          altPicks: [],
          score: 0,
        };

        for (var p = 1; p < picksArrClean.length; p++) {
          let pick = picksArrClean[p].split(/\t/);

          if (p > 32) {
            obj.altPicks.push(pick[1]);
          } else {
            if (pick[3] !== '') {
              obj.picks.push({ team: pick[1], player: pick[2], altPlayer: pick[3] });
            } else {
              obj.picks.push({ team: pick[1], player: pick[2], altPlayer: '' });
            }            
          }
        }

        scope.participantObjects.push(obj);

        let allParticipants = scope.getFromLocalStorage('participants');
        allParticipants.push(obj);
        scope.addToLocalStorage('participants', allParticipants);
        console.log(scope.getFromLocalStorage("participants"));
        console.log(picksArrClean);
        scope.addAllRounds();
      };
    }
  }

  addSinglePlayerCard(name, element) {
    prospects.forEach((prospect, index) => {
      if (prospect.name == name) {
        let popoutString = `
          <div class=\"container player-card-container\">
            <div class="row player-card-row">
              <div class="col-md-4 my-auto pick-name">
              <p class="prospect-info-para prospect-name">${prospect.position} ${prospect.name}</p>
              <p class="prospect-info-para">
                  <img class="prospect-school-image" src=\"${prospect.teamLogoUrl}\" alt=\"\">  
                </p>
              </div>
              <div class="col-md-4 prospect-image align-to-bottom">
                <img class="prospect-info-image" src=\"${prospect.image}\" alt=\"\">
              </div>
              <div class="col-md-4 my-auto pick-info">
                <p class="prospect-info-para"><b>Height:</b> ${prospect.weight}</p>
                <p class="prospect-info-para"><b>Weight:</b> ${prospect.height}</p>
                <p class="prospect-info-para"><b>40 Time:</b> ${prospect.fortyYd}</p>
                <p class="prospect-info-para"><b>Grade:</b> ${prospect.rating}</p>
                <p class="prospect-info-para"><b>RAS:</b> ${prospect.RAS}</p>
              </div>
            </div>
          </div>
          `;

        element.innerHTML = popoutString;
      }
    });
  }

  addPlayerCards() {
    const teamList = this.draftBoard.querySelector('#team-list');
    const teams = teamList.querySelectorAll('li');

    for (let i = 0; i < teams.length; i++) {
      const pick = teams[i].querySelector('.actual-pick');

      if (pick && pick.textContent !== null && pick.textContent !== '') {
        const selection = pick.textContent;

        prospects.forEach((prospect, index) => {
          if (prospect.name == selection) {
            let popoutString = `
          <div class=\"container player-card-container\">
            <div class="row player-card-row">
              <div class="col-md-4 my-auto pick-name">
              <p class="prospect-info-para prospect-name">${prospect.position} ${prospect.name}</p>
              <p class="prospect-info-para">
                  <img class="prospect-school-image" src=\"${prospect.teamLogoUrl}\" alt=\"\">  
                </p>
              </div>
              <div class="col-md-4 prospect-image align-to-bottom">
                <img class="prospect-info-image" src=\"${prospect.image}\" alt=\"\">
              </div>
              <div class="col-md-4 my-auto pick-info">
                <p class="prospect-info-para"><b>Height:</b> ${prospect.weight}</p>
                <p class="prospect-info-para"><b>Weight:</b> ${prospect.height}</p>
                <p class="prospect-info-para"><b>40 Time:</b> ${prospect.fortyYd}</p>
                <p class="prospect-info-para"><b>Grade:</b> ${prospect.rating}</p>
                <p class="prospect-info-para"><b>RAS:</b> ${prospect.RAS}</p>
              </div>
            </div>
          </div>
          `;
            pick.parentElement.innerHTML = popoutString;
          }
        });
        // console.log(this.boardTable.rows[i].cells[c].innerHTML);
      }
    }
  }

  validatePicks() {
    /**
     * On button press, create DRAFT object. Should contain list of each pick slot with "team" and "player" keys. Also create playerDraft objects for all players
     * Should also check if TRADE has been made by seeing if .new-team class exists in row index 1. If so, assign value of input to textContent of cell; then change value in draftOrder array
     */

    const teams = this.draftBoard.querySelector('#team-list').querySelectorAll('li');

    teams.forEach(item => {
      if (item.querySelector('.actual-pick') && item.querySelector('.actual-pick').value !== '') {
        const pick = item.querySelector('.actual-pick').value;
        item.querySelector('.actual-pick').innerHTML = pick;
        item.classList.add('pick-final');
      }
    })

    this.addPlayerCards();
    this.createDraftObjects();
  }

  calculatePoints(draftObj, personDraftObject, score, index, altsIndex) {
    const draftPicks = this.getFromLocalStorage('draft-results');
    const participants = this.getFromLocalStorage('participants');
    const teams = this.draftBoard.querySelector('#team-list').querySelectorAll('li');
    score.textContent = '0';

    console.log('calculating points...')

    for (var j in draftObj) {
      /**
       *  - +1 if PLAYER is correct at draft position predicted by player
       *  - +1 if PLAYER/TEAM combo is correct
       *  - +1 if FIRST ROUND IS CORRECT
       *  - +1 if TEAM is selecting at the spot predicted by player (should this be a setting?)
       * add formatting to cells
       */
      // console.log(`j: ${j}`, draftObj[j].player, personDraftObject[j].player);

      // check if PLAYER (or altPlayer) is correct
      if (draftObj[j].player !== '') {
        console.log(draftObj[j].player, personDraftObject[j])
        if (teams[j].querySelectorAll('.player-name')[index].querySelectorAll('i').length > 0) {
          teams[j].querySelectorAll('.player-name')[index].querySelectorAll('i').forEach(item => item.remove());
        }

        if (personDraftObject[j].team === draftObj[j].team) {
          score.textContent = Number(score.textContent) + 0.5;          
        }

        if (personDraftObject[j].player !== undefined && draftObj[j].player === personDraftObject[j].player) {
          score.textContent = Number(score.textContent) + 1;
          // console.log(teams[j].querySelectorAll('.player-name')[index])
          teams[j].querySelectorAll('.player-name')[index].innerHTML = `<i class="fa-solid fa-star" style="color: green; font-size: 1.5rem;"></i>` + teams[j].querySelectorAll('.player-name')[index].innerHTML
        } else if (draftObj[j].player === personDraftObject[j].altPlayer) {
          // console.log(teams[j].querySelectorAll('.player-name')[index])
          score.textContent = Number(score.textContent) + 0.5;
          teams[j].querySelectorAll('.player-name')[index].innerHTML = `<i class="fa-solid fa-star-half" style="color: green; font-size: 1.5rem;"></i>` + teams[j].querySelectorAll('.player-name')[index].innerHTML
        } else {
          // console.log(teams[j].querySelectorAll('.player-name')[index])
          teams[j].querySelectorAll('.player-name')[index].innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: red; font-size: 1.5rem;"></i>` + teams[j].querySelectorAll('.player-name')[index].innerHTML
        }
      }

      // check if FIRST ROUND is correct, including alternate picks

      let firstRoundersArr = [];
      let altFirstRounders = [];

      for (var x in personDraftObject) {
        firstRoundersArr.push(personDraftObject[x].player);
        altFirstRounders.push(personDraftObject[x].altPlayer);
      }

      if (draftObj[j].player !== '') {
        if (firstRoundersArr.includes(draftObj[j].player)) {
          score.textContent = Number(score.textContent) + 1;
        }
        // else if (altsTable && altFirstRounders.includes(draftObj[j].player)) {
        //   score.textContent = Number(score.textContent) + 0.5;
        // }
      }

      // check if PLAYER/TEAM combo is correct

      for (var z in personDraftObject) {
        if (draftObj[j].player !== '') {
          if (
            (draftObj[j].team.team || draftObj[j].team) ===
            personDraftObject[z].team.team
          ) {
            if (draftObj[j].player === personDraftObject[z].player) {
              score.textContent = Number(score.textContent) + 1;
            } else if (draftObj[j].player === personDraftObject[z].altPlayer) {
              score.textContent = Number(score.textContent) + 0.5;
            }
          }
        }
      }
    }

    let numPicksCounter = 0;

    for (let x in draftPicks) {
      draftPicks[x].player !== '' ? numPicksCounter++ : false;
    }

    const scores = document.querySelectorAll('.player-score');
    scores.forEach((score, index) => {
      participants[index].score = Number(score.textContent);
    });

    if (!this.teamList) {
      this.teamList = document.querySelector('#team-list');
    }

    for (let i = 0; i < this.teamList.querySelectorAll('li').length; i++) {
      let currRow = this.teamList.querySelectorAll('li')[i];
      let pickName;

      if (currRow.querySelector('.pick-name') !== null) {
        pickName = currRow.querySelector('.pick-name').textContent
          .replace(/^.+?\s/, '')
          .replace(/\n|\s{2,}/g, '')
      } else {
        pickName = '';
      }

      this.updatedDraftOrder.push(pickName)
    }

    this.addToLocalStorage('updated-draft-order', this.updatedDraftOrder);
    // this.addToLocalStorage('participants', this.participantObjects)
  }

  createPlayerDataList() {
    const players = this.getProspectNames();

    let dataList = `
    <datalist id="player-list">`;
    players.forEach((player) => (dataList += `<option value="${player}">`));
    dataList += `</datalist>`;
    return dataList;
  }

  addAltPicksTable() {
    const altTableDiv = document.querySelector('.alternates');
    altTableDiv.innerHTML = `
    <table class="table table-dark table-bordered table-alternates text-center">
      <thead id="table-alternates-head">
        <tr class="text-center">
          <th colspan="3">Alternate First Rounders</th>
        </tr>
        <tr class="text-center alternates-names"></tr>
      </thead>
    </table>`;

    const altTable = document.querySelector('.table-alternates');
    const altTableHead = document.getElementById('table-alternates-head');

    const headRowNames = document.querySelector('.alternates-names');
    const tableBody = document.createElement('tbody');
    altTable.appendChild(tableBody);

    for (let i = 0; i < 5; i++) {
      const tr = document.createElement('tr');
      tableBody.appendChild(tr);

      this.participantObjects.forEach((participant, index) => {
        if (i === 0) {
          const newTD = document.createElement('td');
          newTD.scope = 'col-3';
          newTD.textContent = participant.name;

          headRowNames.appendChild(newTD);
        }

        const pick = document.createElement('td');
        pick.textContent = participant.altPicks[i];
        tr.appendChild(pick);

      });

    }
  }

  abbreviateTeamName(team) {
    let newStr = '';
    switch (team) {
      case 'JACKSONVILLE':
        newStr =  'JAX';
        break;
      case 'NEW YORK JETS':
        newStr =  'NYJ';
        break;
      case 'SAN FRANCISCO':
        newStr =  'SF';
        break;
      case 'ATLANTA':
        newStr =  'ATL';
        break;
      case 'CINCINNATI':
        newStr =  'CIN';
        break;
      case 'MIAMI':
        newStr =  'MIA';
        break;
      case 'DETROIT':
        newStr =  'DET';
        break;
      case 'CAROLINA':
        newStr =  'CAR';
        break;
      case 'DENVER':
        newStr =  'DEN';
        break;
      case 'DALLAS':
        newStr =  'DAL';
        break;
      case 'NEW YORK GIANTS':
        newStr =  'NYG';
        break;
      case 'PHILADELPHIA':
        newStr =  'PHI';
        break;
      case 'LOS ANGELES CHARGERS':
        newStr =  'LAC';
        break;
      case 'MINNESOTA':
        newStr =  'MIN';
        break;
      case 'NEW ENGLAND':
        newStr =  'NE';
        break;
      case 'ARIZONA':
        newStr =  'ARI';
        break;
      case 'LAS VEGAS':
        newStr =  'LV';
        break;
      case 'WASHINGTON':
        newStr =  'WAS';
        break;
      case 'CHICAGO':
        newStr =  'CHI';
        break;
      case 'INDIANAPOLIS':
        newStr =  'IND';
        break;
      case 'TENNESSEE':
        newStr =  'TEN';
        break;
      case 'PITTSBURGH':
        newStr =  'PIT';
        break;
      case 'CLEVELAND':
        newStr =  'CLE';
        break;
      case 'BALTIMORE':
        newStr =  'BAL';
        break;
      case 'NEW ORLEANS':
        newStr =  'NO';
        break;
      case 'GREEN BAY':
        newStr =  'GB';
        break;
      case 'BUFFALO':
        newStr =  'BUF';
        break;
      case 'HOUSTON':
        newStr =  'HOU';
        break;
      case 'KANSAS CITY':
        newStr =  'KC';
        break;
      case 'LOS ANGELES RAMS':
        newStr =  'LAR';
        break;
      case 'TAMPA BAY':
        newStr =  'TB';
        break;
      case 'SEATTLE':
        newStr =  'SEA';
        break;
    }
  
    return newStr;
  }
}
